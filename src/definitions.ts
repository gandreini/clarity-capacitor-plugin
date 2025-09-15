/**
 * Configuration options for initializing Clarity
 */
export interface ClarityInitializeOptions {
  /** The Clarity project ID from your Microsoft Clarity dashboard (8-16 alphanumeric characters) */
  projectId: string;
  /** Enable WebView capture for Capacitor/hybrid apps (defaults to true for better session tracking) */
  enableWebViewCapture?: boolean;
}

/**
 * Options for setting custom tags in Clarity
 */
export interface ClarityCustomTagOptions {
  /** The tag key (must start with a letter, contain only alphanumeric characters and underscores, 1-64 chars) */
  key: string;
  /** The tag value (can be any string, max 1024 characters) */
  value: string;
}

/**
 * Options for logging custom events in Clarity
 */
export interface ClarityEventOptions {
  /** The event name to track (must start with a letter, contain only alphanumeric characters and underscores, 1-64 chars) */
  eventName: string;
}

/**
 * Response object containing the current session ID
 */
export interface ClaritySessionIdResult {
  /** The current Clarity session ID, or null if not available */
  sessionId: string | null;
}

/**
 * Response object containing the current session URL
 */
export interface ClaritySessionUrlResult {
  /** The current Clarity session URL for viewing in dashboard, or null if not available */
  url: string | null;
}

/**
 * Input validation utility functions for Clarity plugin
 */

/**
 * Validates a Clarity project ID format
 * @param projectId - The project ID to validate
 * @returns true if valid, false otherwise
 */
export function isValidProjectId(projectId: string): boolean {
  if (!projectId || typeof projectId !== 'string') {
    return false;
  }

  // Clarity project IDs are typically alphanumeric, 8-16 characters
  // Allow letters, numbers, and hyphens
  const projectIdRegex = /^[a-zA-Z0-9-]{8,16}$/;
  return projectIdRegex.test(projectId.trim());
}

/**
 * Validates a custom tag key format
 * @param key - The tag key to validate
 * @returns true if valid, false otherwise
 */
export function isValidTagKey(key: string): boolean {
  if (!key || typeof key !== 'string') {
    return false;
  }

  const trimmedKey = key.trim();

  // Keys must start with a letter, contain only alphanumeric characters and underscores
  // Length between 1-64 characters
  const keyRegex = /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/;
  return keyRegex.test(trimmedKey);
}

/**
 * Validates a custom tag value
 * @param value - The tag value to validate
 * @returns true if valid, false otherwise
 */
export function isValidTagValue(value: string): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value !== 'string') {
    return false;
  }

  // Values can be any string but should not exceed 1024 characters
  return value.length <= 1024;
}

/**
 * Validates an event name format
 * @param eventName - The event name to validate
 * @returns true if valid, false otherwise
 */
export function isValidEventName(eventName: string): boolean {
  if (!eventName || typeof eventName !== 'string') {
    return false;
  }

  const trimmedName = eventName.trim();

  // Event names must start with a letter, contain only alphanumeric characters and underscores
  // Length between 1-64 characters
  const eventNameRegex = /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/;
  return eventNameRegex.test(trimmedName);
}

/**
 * Microsoft Clarity Analytics Plugin for Capacitor
 *
 * This plugin provides native integration with Microsoft Clarity analytics
 * for iOS and Android platforms. Web platform shows warnings as Clarity
 * web SDK should be integrated directly in your web application.
 *
 * @example
 * ```typescript
 * import { Clarity } from '@capacitor-plugin/clarity';
 *
 * // Initialize Clarity
 * await Clarity.initialize({ projectId: 'abc123def456' });
 *
 * // Set custom tags
 * await Clarity.setCustomTag({ key: 'userType', value: 'premium' });
 *
 * // Log events
 * await Clarity.logEvent({ eventName: 'buttonClicked' });
 *
 * // Get session info
 * const sessionId = await Clarity.getCurrentSessionId();
 * const sessionUrl = await Clarity.getCurrentSessionUrl();
 * ```
 */
export interface ClarityPlugin {
  /**
   * Initialize Clarity with your project ID
   *
   * This method must be called before using any other Clarity methods.
   * The project ID can be found in your Microsoft Clarity dashboard.
   *
   * @param options - Configuration options including projectId
   * @returns Promise that resolves when initialization is complete
   * @throws Will reject if projectId is invalid or initialization fails
   *
   * @example
   * ```typescript
   * // Initialize with WebView capture enabled (recommended for Capacitor apps)
   * await Clarity.initialize({ 
   *   projectId: 'abc123def456',
   *   enableWebViewCapture: true 
   * });
   * ```
   */
  initialize(options: ClarityInitializeOptions): Promise<void>;

  /**
   * Set a custom tag for the current session
   *
   * Custom tags help you segment and filter your Clarity recordings.
   * Tags are session-scoped and will be applied to all recordings
   * in the current session.
   *
   * @param options - Tag key and value
   * @returns Promise that resolves when tag is set
   * @throws Will reject if Clarity is not initialized or if tag key/value is invalid
   *
   * @example
   * ```typescript
   * await Clarity.setCustomTag({
   *   key: 'userType',
   *   value: 'premium'
   * });
   * ```
   */
  setCustomTag(options: ClarityCustomTagOptions): Promise<void>;

  /**
   * Log a custom event
   *
   * Custom events help you track user interactions and behaviors
   * in your Clarity recordings. Events are logged as custom tags
   * with the event name as the key and "true" as the value.
   *
   * @param options - Event name to track
   * @returns Promise that resolves when event is logged
   * @throws Will reject if Clarity is not initialized or if event name is invalid
   *
   * @example
   * ```typescript
   * await Clarity.logEvent({ eventName: 'buttonClicked' });
   * ```
   */
  logEvent(options: ClarityEventOptions): Promise<void>;

  /**
   * Get the current session ID
   *
   * Returns the unique identifier for the current Clarity session.
   * This can be useful for debugging or correlating with other analytics.
   *
   * @returns Promise with the session ID or null if not available
   * @throws Will reject if Clarity is not initialized
   *
   * @example
   * ```typescript
   * const result = await Clarity.getCurrentSessionId();
   * console.log('Session ID:', result.sessionId);
   * ```
   */
  getCurrentSessionId(): Promise<ClaritySessionIdResult>;

  /**
   * Get the current session URL for viewing in Clarity dashboard
   *
   * Returns a direct URL to view the current session in your
   * Microsoft Clarity dashboard. Useful for debugging and support.
   *
   * @returns Promise with the session URL or null if not available
   * @throws Will reject if Clarity is not initialized
   *
   * @example
   * ```typescript
   * const result = await Clarity.getCurrentSessionUrl();
   * if (result.url) {
   *   console.log('View session:', result.url);
   * }
   * ```
   */
  getCurrentSessionUrl(): Promise<ClaritySessionUrlResult>;
}
