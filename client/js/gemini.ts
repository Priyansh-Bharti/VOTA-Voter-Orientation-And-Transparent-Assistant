/**
 * Gemini Chat Module for VOTA.
 * Handles SSE streaming and UI rendering of chat tokens.
 */
export class GeminiChat {
  private container: HTMLElement;

  private indicator: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) || document.body;
    this.indicator = this.createTypingIndicator();
  }

  /**
   * Appends a message to the chat container.
   * @param text Message text.
   * @param isUser Whether the message is from the user.
   */
  public appendMessage(text: string, isUser: boolean): HTMLElement {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    this.container.appendChild(msg);
    this.container.scrollTop = this.container.scrollHeight;
    return msg;
  }

  /**
   * Streams a response from the SSE endpoint and renders tokens one by one.
   * @param response SSE Response stream.
   */
  public async streamResponse(response: Response): Promise<void> {
    const reader = response.body?.getReader();
    if (!reader) return;

    const messageEl = this.appendMessage('', false);
    this.showTyping(false);

    const decoder = new TextDecoder();
    /* eslint-disable no-await-in-loop, no-constant-condition */
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      lines.forEach((line) => {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.chunk) messageEl.textContent += data.chunk;
          } catch (e) { /* End of stream or malformed */ }
        }
      });
    }
  }

  /**
   * Shows or hides the typing indicator (3 dots).
   */
  public showTyping(show: boolean): void {
    if (show) this.container.appendChild(this.indicator);
    else this.indicator.remove();
  }

  private createTypingIndicator(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    return el;
  }
}
