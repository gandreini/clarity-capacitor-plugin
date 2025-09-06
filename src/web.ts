import { WebPlugin } from '@capacitor/core';

import { isValidProjectId, isValidTagKey, isValidTagValue, isValidEventName } from './definitions';
import type {
  ClarityPlugin,
  ClarityInitializeOptions,
  ClarityCustomTagOptions,
  ClarityEventOptions,
  ClaritySessionIdResult,
  ClaritySessionUrlResult,
} from './definitions';

/**
 * Web implementation of the Clarity plugin
 *
 * For web platforms, Microsoft Clarity should be integrated directly
 * using their web SDK. This implementation provides helpful warnings
 * and guidance for proper web integration.
 */
export class ClarityWeb extends WebPlugin implements ClarityPlugin {
  private isInitialized = false;

  async initialize(options: ClarityInitializeOptions): Promise<void> {
    if (!isValidProjectId(options.projectId)) {
      throw new Error('Invalid project ID format. Must be 8-16 alphanumeric characters (letters, numbers, hyphens).');
    }

    this.isInitialized = true;

    console.warn(
      'Clarity Web: Native web implementation not available.\n' +
        'For web platforms, integrate Microsoft Clarity directly using their web SDK:\n' +
        '1. Add the Clarity script to your HTML:\n' +
        '   <script type="text/javascript">\n' +
        '   (function(c,l,a,r,i,t,y){\n' +
        '       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n' +
        '       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n' +
        '       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n' +
        '   })(window, document, "clarity", "script", "' +
        options.projectId +
        '");\n' +
        '   </script>\n' +
        '2. Use the global clarity() function for tracking:\n' +
        '   - clarity("set", "customTag", "key", "value");\n' +
        '   - clarity("event", "eventName");\n' +
        '   - clarity("get", "sessionId");\n' +
        '   - clarity("get", "sessionUrl");',
    );

    return Promise.resolve();
  }

  async setCustomTag(options: ClarityCustomTagOptions): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Clarity not initialized. Call initialize() first.');
    }

    if (!isValidTagKey(options.key)) {
      throw new Error(
        'Invalid tag key format. Must start with a letter and contain only alphanumeric characters and underscores (1-64 chars).',
      );
    }

    if (!isValidTagValue(options.value)) {
      throw new Error('Invalid tag value. Must not exceed 1024 characters.');
    }

    console.warn(
      `Clarity Web: setCustomTag called with key="${options.key}", value="${options.value}"\n` +
        'For web platforms, use: clarity("set", "customTag", "' +
        options.key +
        '", "' +
        options.value +
        '");',
    );

    return Promise.resolve();
  }

  async logEvent(options: ClarityEventOptions): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Clarity not initialized. Call initialize() first.');
    }

    if (!isValidEventName(options.eventName)) {
      throw new Error(
        'Invalid event name format. Must start with a letter and contain only alphanumeric characters and underscores (1-64 chars).',
      );
    }

    console.warn(
      `Clarity Web: logEvent called with eventName="${options.eventName}"\n` +
        'For web platforms, use: clarity("event", "' +
        options.eventName +
        '");',
    );

    return Promise.resolve();
  }

  async getCurrentSessionId(): Promise<ClaritySessionIdResult> {
    if (!this.isInitialized) {
      throw new Error('Clarity not initialized. Call initialize() first.');
    }

    console.warn('Clarity Web: getCurrentSessionId called\n' + 'For web platforms, use: clarity("get", "sessionId");');

    return Promise.resolve({ sessionId: null });
  }

  async getCurrentSessionUrl(): Promise<ClaritySessionUrlResult> {
    if (!this.isInitialized) {
      throw new Error('Clarity not initialized. Call initialize() first.');
    }

    console.warn(
      'Clarity Web: getCurrentSessionUrl called\n' + 'For web platforms, use: clarity("get", "sessionUrl");',
    );

    return Promise.resolve({ url: null });
  }
}
