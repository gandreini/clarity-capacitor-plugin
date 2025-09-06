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
    
    // MARK: - Input Validation
    
    private func isValidProjectId(_ projectId: String) -> Bool {
        let trimmed = projectId.trimmingCharacters(in: .whitespacesAndNewlines)
        let regex = try! NSRegularExpression(pattern: "^[a-zA-Z0-9-]{8,16}$")
        return regex.firstMatch(in: trimmed, range: NSRange(location: 0, length: trimmed.count)) != nil
    }
    
    private func isValidTagKey(_ key: String) -> Bool {
        let trimmed = key.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.count == 0 || trimmed.count > 64 { return false }
        let regex = try! NSRegularExpression(pattern: "^[a-zA-Z][a-zA-Z0-9_]{0,63}$")
        return regex.firstMatch(in: trimmed, range: NSRange(location: 0, length: trimmed.count)) != nil
    }
    
    private func isValidTagValue(_ value: String) -> Bool {
        return value.count <= 1024
    }
    
    private func isValidEventName(_ eventName: String) -> Bool {
        let trimmed = eventName.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.count == 0 || trimmed.count > 64 { return false }
        let regex = try! NSRegularExpression(pattern: "^[a-zA-Z][a-zA-Z0-9_]{0,63}$")
        return regex.firstMatch(in: trimmed, range: NSRange(location: 0, length: trimmed.count)) != nil
    }
    
    @objc func initialize(_ call: CAPPluginCall) {
        guard let projectId = call.getString("projectId"), !projectId.isEmpty else {
            call.reject("Project ID is required")
            return
        }
        
        guard isValidProjectId(projectId) else {
            call.reject("Invalid project ID format. Must be 8-16 alphanumeric characters (letters, numbers, hyphens).")
            return
        }
        
        if isInitialized {
            CAPLog.print("Clarity already initialized")
            call.resolve()
            return
        }
        
        DispatchQueue.main.async { [weak self] in
            do {
                let config = ClarityConfig(projectId: projectId)
                ClaritySDK.initialize(config: config)
                self?.isInitialized = true
                CAPLog.print("Clarity initialized successfully with project ID: \(projectId)")
                call.resolve()
            } catch {
                CAPLog.print("Failed to initialize Clarity: \(error.localizedDescription)")
                call.reject("Failed to initialize Clarity: \(error.localizedDescription)")
            }
        }
    }
    
    @objc func setCustomTag(_ call: CAPPluginCall) {
        guard let key = call.getString("key"), !key.isEmpty else {
            call.reject("Tag key is required")
            return
        }
        
        guard let value = call.getString("value") else {
            call.reject("Tag value is required")
            return
        }
        
        guard isValidTagKey(key) else {
            call.reject("Invalid tag key format. Must start with a letter and contain only alphanumeric characters and underscores (1-64 chars).")
            return
        }
        
        guard isValidTagValue(value) else {
            call.reject("Invalid tag value. Must not exceed 1024 characters.")
            return
        }
        
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        do {
            ClaritySDK.setCustomTag(key: key, value: value)
            CAPLog.print("Custom tag set: \(key) = \(value)")
            call.resolve()
        } catch {
            CAPLog.print("Failed to set custom tag: \(error.localizedDescription)")
            call.reject("Failed to set custom tag: \(error.localizedDescription)")
        }
    }
    
    @objc func logEvent(_ call: CAPPluginCall) {
        guard let eventName = call.getString("eventName"), !eventName.isEmpty else {
            call.reject("Event name is required")
            return
        }
        
        guard isValidEventName(eventName) else {
            call.reject("Invalid event name format. Must start with a letter and contain only alphanumeric characters and underscores (1-64 chars).")
            return
        }
        
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        do {
            // Clarity iOS SDK uses setCustomTag for events
            ClaritySDK.setCustomTag(key: eventName, value: "true")
            CAPLog.print("Event logged: \(eventName)")
            call.resolve()
        } catch {
            CAPLog.print("Failed to log event: \(error.localizedDescription)")
            call.reject("Failed to log event: \(error.localizedDescription)")
        }
    }
    
    @objc func getCurrentSessionId(_ call: CAPPluginCall) {
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        do {
            let sessionId = ClaritySDK.getCurrentSessionId()
            call.resolve([
                "sessionId": sessionId ?? NSNull()
            ])
        } catch {
            CAPLog.print("Failed to get session ID: \(error.localizedDescription)")
            call.reject("Failed to get session ID: \(error.localizedDescription)")
        }
    }
    
    @objc func getCurrentSessionUrl(_ call: CAPPluginCall) {
        guard isInitialized else {
            call.reject("Clarity not initialized. Call initialize() first.")
            return
        }
        
        do {
            let url = ClaritySDK.getCurrentSessionUrl()
            call.resolve([
                "url": url ?? NSNull()
            ])
        } catch {
            CAPLog.print("Failed to get session URL: \(error.localizedDescription)")
            call.reject("Failed to get session URL: \(error.localizedDescription)")
        }
    }
}