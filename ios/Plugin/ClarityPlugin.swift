import Foundation
import Capacitor
import Clarity

@objc(ClarityPlugin)
public class ClarityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ClarityPlugin"
    public let jsName = "Clarity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setCustomTag", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getCurrentSessionId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getCurrentSessionUrl", returnType: CAPPluginReturnPromise)
    ]
    
    private var isInitialized = false
    
    @objc func initialize(_ call: CAPPluginCall) {
        guard let projectId = call.getString("projectId"), !projectId.isEmpty else {
            call.reject("Project ID is required")
            return
        }
        
        if isInitialized {
            CAPLog.print("Clarity already initialized")
            call.resolve()
            return
        }
        
        DispatchQueue.main.async { [weak self] in
            let config = ClarityConfig(projectId: projectId)
            ClaritySDK.initialize(config: config)
            self?.isInitialized = true
            CAPLog.print("Clarity initialized successfully")
            call.resolve()
        }
    }
    
    @objc func setCustomTag(_ call: CAPPluginCall) {
        guard let key = call.getString("key"), !key.isEmpty else {
            call.reject("Tag key is required")
            return
        }
        
        guard let value = call.getString("value"), !value.isEmpty else {
            call.reject("Tag value is required")
            return
        }
        
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        ClaritySDK.setCustomTag(key: key, value: value)
        CAPLog.print("Custom tag set: \(key) = \(value)")
        call.resolve()
    }
    
    @objc func logEvent(_ call: CAPPluginCall) {
        guard let eventName = call.getString("eventName"), !eventName.isEmpty else {
            call.reject("Event name is required")
            return
        }
        
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        // Clarity iOS SDK uses setCustomTag for events
        ClaritySDK.setCustomTag(key: eventName, value: "true")
        CAPLog.print("Event logged: \(eventName)")
        call.resolve()
    }
    
    @objc func getCurrentSessionId(_ call: CAPPluginCall) {
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        let sessionId = ClaritySDK.getCurrentSessionId()
        call.resolve([
            "sessionId": sessionId ?? NSNull()
        ])
    }
    
    @objc func getCurrentSessionUrl(_ call: CAPPluginCall) {
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        let url = ClaritySDK.getCurrentSessionUrl()
        call.resolve([
            "url": url ?? NSNull()
        ])
    }
}