import { GoogleGenerativeAI } from '@google/generative-ai';

import { logger } from '../utils/logger.js';

/**
 * NARRATION ONLY — never makes decisions.
 * AIEngine: Gemini-powered narration for election context.
 */
export class AIEngine {
  private readonly genAI: GoogleGenerativeAI;

  private readonly systemPrompt = `You are a civic education assistant. 
  Answer only using the election context provided. Never invent rules, 
  dates, or legal requirements. If the context is insufficient, 
  state that you don't have that information.`;

  /**
   * @param apiKey Google AI API Key.
   */
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Narrates the current election phase to the user.
   * @param phaseTitle Title of the current phase.
   * @param description Official description of the phase.
   * @returns AsyncGenerator yielding chunks of the narration.
   * @example
   * for await (const chunk of engine.narratePhase('Voting', 'Polls are open')) { ... }
   */
  public async* narratePhase(
    phaseTitle: string,
    description: string,
  ): AsyncGenerator<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${this.systemPrompt}\n\nPhase: ${phaseTitle}\nContext: ${description}\n\nNarrate this phase concisely for a voter.`;

      const result = await model.generateContentStream(prompt);
      for await (const chunk of result.stream) {
        yield chunk.text();
      }
    } catch (error) {
      logger.error('AI Narration failed', error as Error);
      yield 'Narration unavailable.';
    }
  }

  /**
   * Answers a user question based on election context.
   * @param question The user's query.
   * @param context Official election data as context.
   * @returns AsyncGenerator yielding chunks of the answer.
   * @example
   * for await (const chunk of engine.answerQuestion('How to register?', '...')) { ... }
   */
  public async* answerQuestion(
    question: string,
    context: string,
  ): AsyncGenerator<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${this.systemPrompt}\n\nContext: ${context}\n\nUser Question: ${question}`;

      const result = await model.generateContentStream(prompt);
      for await (const chunk of result.stream) {
        yield chunk.text();
      }
    } catch (error) {
      logger.error('AI Question answering failed', error as Error);
      yield 'Service temporarily unavailable.';
    }
  }
}

// Injected via environment in practice, but exported as a singleton instance here.
// Note: Actual API key will be provided via config in the factory/loader.
export const aiEngine = new AIEngine(process.env.GEMINI_API_KEY || '');
