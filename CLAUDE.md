# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Capacitor plugin for Microsoft Clarity analytics that provides cross-platform support for iOS and Android. The plugin allows mobile applications to integrate Clarity's user behavior analytics, including session tracking, custom tags, and event logging.

## Common Development Commands

### Build and Development
- `npm run build` - Clean build with TypeScript compilation and Rollup bundling
- `npm run build:skip-docgen` - Build without regenerating documentation
- `npm run watch` - TypeScript watch mode for development
- `npm run clean` - Remove dist folder

### Code Quality
- `npm run lint` - Run ESLint and Prettier checks
- `npm run fmt` - Auto-fix ESLint issues and format code with Prettier
- `npm run eslint` - Run ESLint only
- `npm run prettier` - Run Prettier formatting

### Testing and Verification
- `npm run verify` - Full verification (iOS, Android, and web)
- `npm run verify:ios` - iOS-specific verification with pod install and xcodebuild
- `npm run verify:android` - Android verification with Gradle clean, build, and test
- `npm run verify:web` - Web verification (runs build)

### Documentation
- `npm run docgen` - Generate API documentation and update README

## Architecture

### Core Structure
- **src/definitions.ts** - TypeScript interface definitions for the plugin API
- **src/index.ts** - Main plugin registration and exports
- **src/web.ts** - Web implementation (placeholder with warnings - Clarity is native-only)

### Native Implementations
- **ios/Plugin/ClarityPlugin.swift** - iOS implementation using Clarity iOS SDK v3.0
- **android/src/main/java/com/yourcompany/plugins/clarity/ClarityPlugin.java** - Android implementation using Clarity Android SDK v3.+

### Build Configuration
- **rollup.config.js** - Bundles to IIFE and CommonJS formats for distribution
- **tsconfig.json** - TypeScript compilation to ES2021 with ESM output
- **CapacitorPluginClarity.podspec** - iOS CocoaPods specification with Clarity dependency

## Plugin API Methods

All methods require initialization before use (except `initialize` itself):

1. `initialize(projectId)` - Initialize Clarity with project ID
2. `setCustomTag(key, value)` - Set session-level custom tags
3. `logEvent(eventName)` - Log custom events (implemented as custom tags)
4. `getCurrentSessionId()` - Retrieve current session identifier
5. `getCurrentSessionUrl()` - Get Clarity dashboard URL for current session

## Native Implementation Notes

### iOS (Swift)
- Uses `ClaritySDK` from Clarity iOS framework
- Initialization state tracked with `isInitialized` flag
- All operations run on main thread via `DispatchQueue.main.async`
- Events logged as custom tags with "true" value

### Android (Java)
- Uses `com.microsoft.clarity.Clarity` SDK
- Package namespace needs customization: `com.yourcompany.plugins.clarity`
- Initialization runs on UI thread via `getActivity().runOnUiThread()`
- Log level set to `LogLevel.None` to reduce noise

## Development Notes

- Web implementation is intentionally non-functional (Clarity requires native platforms)
- Both iOS and Android implementations use custom tags for event logging
- Plugin follows Capacitor 6.x conventions
- Build outputs include CommonJS, ESM, and IIFE formats for broad compatibility