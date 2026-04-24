import { Router } from 'express';
import { z } from 'zod';

import { decisionEngine } from '../engines/decisionEngine.js';
import { electionEngine } from '../engines/electionEngine.js';
import { AppError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

const CountryCodeSchema = z.object({
  countryCode: z.string().length(2),
});

const EligibilitySchema = z.object({
  countryCode: z.string().length(2),
  age: z.number().min(0).max(120),
  isCitizen: z.boolean(),
  isRegistered: z.boolean(),
});

router.get('/timeline/:countryCode', asyncHandler(async (req, res) => {
  const { countryCode } = CountryCodeSchema.parse(req.params);
  const timeline = electionEngine.getTimelineSteps(countryCode);
  if (!timeline.length) throw new AppError('Country data not found', 404);
  res.json(timeline);
}));

router.get('/phase/:countryCode', asyncHandler(async (req, res) => {
  const { countryCode } = CountryCodeSchema.parse(req.params);
  const phase = electionEngine.computeCurrentPhase(countryCode, new Date());
  if (!phase) throw new AppError('No active phase found', 404);
  res.json(phase);
}));

router.post('/eligibility', asyncHandler(async (req, res) => {
  const {
    countryCode, age, isCitizen, isRegistered,
  } = EligibilitySchema.parse(req.body);
  const result = decisionEngine.checkEligibility(countryCode, age, isCitizen, isRegistered);
  res.json(result);
}));

export const electionRoutes = router;
