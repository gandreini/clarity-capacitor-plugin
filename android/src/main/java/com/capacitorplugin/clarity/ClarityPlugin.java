package com.capacitorplugin.clarity;

import android.content.Context;
import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.microsoft.clarity.Clarity;
import com.microsoft.clarity.ClarityConfig;
import com.microsoft.clarity.models.LogLevel;

@CapacitorPlugin(name = "Clarity")
public class ClarityPlugin extends Plugin {
    private static final String TAG = "ClarityPlugin";
    private boolean isInitialized = false;

    @PluginMethod
    public void initialize(PluginCall call) {
        String projectId = call.getString("projectId");
        
        if (projectId == null || projectId.isEmpty()) {
            call.reject("Project ID is required");
            return;
        }

        if (isInitialized) {
            Log.w(TAG, "Clarity already initialized");
            call.resolve();
            return;
        }

        getActivity().runOnUiThread(() -> {
            try {
                ClarityConfig config = new ClarityConfig(projectId);
                config.setLogLevel(LogLevel.None);
                Clarity.initialize(getContext(), config);
                isInitialized = true;
                Log.d(TAG, "Clarity initialized successfully");
                call.resolve();
            } catch (Exception e) {
                Log.e(TAG, "Failed to initialize Clarity", e);
                call.reject("Failed to initialize Clarity: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void setCustomTag(PluginCall call) {
        String key = call.getString("key");
        String value = call.getString("value");
        
        if (key == null || key.isEmpty()) {
            call.reject("Tag key is required");
            return;
        }
        
        if (value == null || value.isEmpty()) {
            call.reject("Tag value is required");
            return;
        }

        if (!isInitialized) {
            call.reject("Clarity not initialized. Call initialize() first.");
            return;
        }
        
        try {
            Clarity.setCustomTag(key, value);
            Log.d(TAG, "Custom tag set: " + key + " = " + value);
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, "Failed to set custom tag", e);
            call.reject("Failed to set custom tag: " + e.getMessage());
        }
    }

    @PluginMethod
    public void logEvent(PluginCall call) {
        String eventName = call.getString("eventName");
        
        if (eventName == null || eventName.isEmpty()) {
            call.reject("Event name is required");
            return;
        }

        if (!isInitialized) {
            call.reject("Clarity not initialized. Call initialize() first.");
            return;
        }
        
        try {
            // Clarity Android SDK uses setCustomTag for events
            Clarity.setCustomTag(eventName, "true");
            Log.d(TAG, "Event logged: " + eventName);
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, "Failed to log event", e);
            call.reject("Failed to log event: " + e.getMessage());
        }
    }

    @PluginMethod
    public void getCurrentSessionId(PluginCall call) {
        if (!isInitialized) {
            call.reject("Clarity not initialized. Call initialize() first.");
            return;
        }

        try {
            String sessionId = Clarity.getCurrentSessionId();
            JSObject ret = new JSObject();
            ret.put("sessionId", sessionId);
            call.resolve(ret);
        } catch (Exception e) {
            Log.e(TAG, "Failed to get session ID", e);
            call.reject("Failed to get session ID: " + e.getMessage());
        }
    }

    @PluginMethod
    public void getCurrentSessionUrl(PluginCall call) {
        if (!isInitialized) {
            call.reject("Clarity not initialized. Call initialize() first.");
            return;
        }

        try {
            String url = Clarity.getCurrentSessionUrl();
            JSObject ret = new JSObject();
            ret.put("url", url);
            call.resolve(ret);
        } catch (Exception e) {
            Log.e(TAG, "Failed to get session URL", e);
            call.reject("Failed to get session URL: " + e.getMessage());
        }
    }
}