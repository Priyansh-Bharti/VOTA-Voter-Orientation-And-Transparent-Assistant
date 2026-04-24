import { Client } from '@googlemaps/google-maps-services-js';
import { Router } from 'express';
import { z } from 'zod';

import { AppError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const mapsClient = new Client({});

const NearbySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

router.get('/nearby', asyncHandler(async (req, res) => {
  const { lat, lng } = NearbySchema.parse(req.query);

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    throw new AppError('Maps service unavailable', 503);
  }

  const response = await mapsClient.placesNearby({
    params: {
      location: { lat, lng },
      radius: 5000,
      keyword: 'polling station',
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  const booths = response.data.results.slice(0, 5).map((r) => ({
    name: r.name,
    address: r.vicinity,
    location: r.geometry?.location,
  }));

  res.json({ booths });
}));

export const pollingRoutes = router;
