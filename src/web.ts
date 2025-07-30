import { WebPlugin } from '@capacitor/core';

import type { ClarityPlugin } from './definitions';

export class ClarityWeb extends WebPlugin implements ClarityPlugin {
  async initialize(_options: { projectId: string }): Promise<void> {
    console.warn('Clarity: Web implementation not available. Use native iOS/Android only.');
    return Promise.resolve();
  }

  async setCustomTag(_options: { key: string; value: string }): Promise<void> {
    console.warn('Clarity: Web implementation not available. Use native iOS/Android only.');
    return Promise.resolve();
  }

  async logEvent(_options: { eventName: string }): Promise<void> {
    console.warn('Clarity: Web implementation not available. Use native iOS/Android only.');
    return Promise.resolve();
  }

  async getCurrentSessionId(): Promise<{ sessionId: string | null }> {
    console.warn('Clarity: Web implementation not available. Use native iOS/Android only.');
    return Promise.resolve({ sessionId: null });
  }

  async getCurrentSessionUrl(): Promise<{ url: string | null }> {
    console.warn('Clarity: Web implementation not available. Use native iOS/Android only.');
    return Promise.resolve({ url: null });
  }
}