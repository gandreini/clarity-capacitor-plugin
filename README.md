# @capacitor-plugin/clarity

A Capacitor plugin for Microsoft Clarity analytics integration on iOS and Android platforms.

[![npm version](https://badge.fury.io/js/%40capacitor-plugin%2Fclarity.svg)](https://badge.fury.io/js/%40capacitor-plugin%2Fclarity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ **iOS Support** - Full native integration with Microsoft Clarity iOS SDK
- ✅ **Android Support** - Full native integration with Microsoft Clarity Android SDK  
- ⚠️ **Web Support** - Provides helpful guidance for web integration (requires direct Clarity web SDK)
- 🔧 **TypeScript Support** - Full type definitions and IntelliSense support
- 📱 **Capacitor 6+** - Built for the latest Capacitor framework

## Installation

```bash
npm install @capacitor-plugin/clarity
npx cap sync
```

### iOS Setup

1. Add the Clarity dependency to your `ios/App/Podfile`:
```ruby
pod 'Clarity', '~> 3.0'
```

2. Run pod install:
```bash
cd ios && pod install
```

### Android Setup

The Android dependency is automatically included. No additional setup required.

### Web Setup

For web platforms, integrate Microsoft Clarity directly using their web SDK. See the [Web Integration](#web-integration) section below.

## Usage

### Basic Setup

```typescript
import { Clarity } from '@capacitor-plugin/clarity';

// Initialize Clarity with your project ID
await Clarity.initialize({ 
  projectId: 'your-clarity-project-id' 
});
```

### Setting Custom Tags

```typescript
// Set custom tags to segment your recordings
await Clarity.setCustomTag({ 
  key: 'userType', 
  value: 'premium' 
});

await Clarity.setCustomTag({ 
  key: 'version', 
  value: '2.1.0' 
});
```

### Logging Events

```typescript
// Log custom events to track user interactions
await Clarity.logEvent({ eventName: 'buttonClicked' });
await Clarity.logEvent({ eventName: 'purchaseCompleted' });
await Clarity.logEvent({ eventName: 'screenViewed' });
```

### Getting Session Information

```typescript
// Get current session ID for debugging
const sessionInfo = await Clarity.getCurrentSessionId();
console.log('Session ID:', sessionInfo.sessionId);

// Get direct URL to view session in Clarity dashboard
const sessionUrl = await Clarity.getCurrentSessionUrl();
if (sessionUrl.url) {
  console.log('View session:', sessionUrl.url);
}
```

### Complete Example

```typescript
import { Clarity } from '@capacitor-plugin/clarity';

class AnalyticsService {
  private isInitialized = false;

  async initialize(projectId: string) {
    try {
      await Clarity.initialize({ projectId });
      this.isInitialized = true;
      console.log('Clarity initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Clarity:', error);
    }
  }

  async trackUser(userType: string, userId: string) {
    if (!this.isInitialized) return;
    
    await Clarity.setCustomTag({ key: 'userType', value: userType });
    await Clarity.setCustomTag({ key: 'userId', value: userId });
  }

  async trackEvent(eventName: string) {
    if (!this.isInitialized) return;
    
    await Clarity.logEvent({ eventName });
  }

  async getSessionInfo() {
    if (!this.isInitialized) return null;
    
    const [sessionId, sessionUrl] = await Promise.all([
      Clarity.getCurrentSessionId(),
      Clarity.getCurrentSessionUrl()
    ]);
    
    return { sessionId: sessionId.sessionId, url: sessionUrl.url };
  }
}

// Usage
const analytics = new AnalyticsService();
await analytics.initialize('your-project-id');
await analytics.trackUser('premium', 'user123');
await analytics.trackEvent('appOpened');
```

## Web Integration

For web platforms, this plugin provides helpful warnings and guidance. To integrate Clarity on web:

### 1. Add Clarity Script to HTML

```html
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

### 2. Use Clarity Web API

```typescript
// Set custom tags
clarity("set", "customTag", "userType", "premium");

// Log events
clarity("event", "buttonClicked");

// Get session info
const sessionId = clarity("get", "sessionId");
const sessionUrl = clarity("get", "sessionUrl");
```

## API Reference

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`setCustomTag(...)`](#setcustomtag)
* [`logEvent(...)`](#logevent)
* [`getCurrentSessionId()`](#getcurrentsessionid)
* [`getCurrentSessionUrl()`](#getcurrentsessionurl)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options: { projectId: string; }) => Promise<void>
```

Initialize Clarity with your project ID

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ projectId: string; }</code> |

--------------------


### setCustomTag(...)

```typescript
setCustomTag(options: { key: string; value: string; }) => Promise<void>
```

Set a custom tag for the current session

| Param         | Type                                          |
| ------------- | --------------------------------------------- |
| **`options`** | <code>{ key: string; value: string; }</code> |

--------------------


### logEvent(...)

```typescript
logEvent(options: { eventName: string; }) => Promise<void>
```

Log a custom event

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ eventName: string; }</code> |

--------------------


### getCurrentSessionId()

```typescript
getCurrentSessionId() => Promise<{ sessionId: string | null; }>
```

Get the current session ID

**Returns:** <code>Promise&lt;{ sessionId: string | null; }&gt;</code>

--------------------


### getCurrentSessionUrl()

```typescript
getCurrentSessionUrl() => Promise<{ url: string | null; }>
```

Get the current session URL for viewing in Clarity dashboard

**Returns:** <code>Promise&lt;{ url: string | null; }&gt;</code>

--------------------

</docgen-api>