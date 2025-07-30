export interface ClarityPlugin {
    /**
     * Initialize Clarity with your project ID
     * @param options - Configuration options including projectId
     * @returns Promise that resolves when initialization is complete
     */
    initialize(options: { projectId: string }): Promise<void>;
  
    /**
     * Set a custom tag for the current session
     * @param options - Tag key and value
     * @returns Promise that resolves when tag is set
     */
    setCustomTag(options: { key: string; value: string }): Promise<void>;
  
    /**
     * Log a custom event
     * @param options - Event name to track
     * @returns Promise that resolves when event is logged
     */
    logEvent(options: { eventName: string }): Promise<void>;
  
    /**
     * Get the current session ID
     * @returns Promise with the session ID or null
     */
    getCurrentSessionId(): Promise<{ sessionId: string | null }>;
  
    /**
     * Get the current session URL for viewing in Clarity dashboard
     * @returns Promise with the session URL or null
     */
    getCurrentSessionUrl(): Promise<{ url: string | null }>;
  }