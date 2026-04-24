import { TranslationServiceClient } from '@google-cloud/translate';
import { Router } from 'express';
import { z } from 'zod';

import { AppError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const translate = new TranslationServiceClient();

const TranslateSchema = z.object({
  text: z.string().max(500),
  targetLang: z.enum(['en', 'hi', 'es', 'fr', 'ar', 'ta', 'de', 'pt', 'zh', 'bn']),
});

router.post('/', asyncHandler(async (req, res) => {
  const { text, targetLang } = TranslateSchema.parse(req.body);

  if (!process.env.GOOGLE_PROJECT_ID) {
    throw new AppError('Translation service misconfigured', 500);
  }

  const [response] = await translate.translateText({
    parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
    contents: [text],
    mimeType: 'text/plain',
    targetLanguageCode: targetLang,
  });

  const translation = response.translations?.[0]?.translatedText;
  res.json({ translation });
}));

export const translateRoutes = router;
