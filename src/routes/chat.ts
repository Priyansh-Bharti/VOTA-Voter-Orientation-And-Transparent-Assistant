import { Router } from 'express';
import { z } from 'zod';

import { aiEngine } from '../engines/aiEngine.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { logger } from '../utils/logger.js';

const router = Router();

const ChatSchema = z.object({
  question: z.string().min(1).max(500),
  context: z.string().optional(),
});

router.post('/', asyncHandler(async (req, res) => {
  const { question, context } = ChatSchema.parse(req.body);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = aiEngine.answerQuestion(question, context || 'General election info');
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    logger.error('Chat SSE stream failed', error as Error);
    res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`);
    res.end();
  }
}));

export const chatRoutes = router;
