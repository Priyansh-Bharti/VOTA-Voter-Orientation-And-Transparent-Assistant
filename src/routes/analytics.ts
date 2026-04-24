import { BigQuery } from '@google-cloud/bigquery';
import { Router } from 'express';
import { z } from 'zod';

import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const bigquery = new BigQuery();

const EventSchema = z.object({
  type: z.string(),
  countryCode: z.string().length(2),
  timestamp: z.string().datetime(),
  metadata: z.record(z.unknown()),
});

router.post('/', asyncHandler(async (req, res) => {
  const event = EventSchema.parse(req.body);

  if (process.env.BIGQUERY_DATASET) {
    await bigquery
      .dataset(process.env.BIGQUERY_DATASET)
      .table('events')
      .insert([event]);
  }

  res.status(202).json({ status: 'Accepted' });
}));

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const analyticsRoutes = router;
