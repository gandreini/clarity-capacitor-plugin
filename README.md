# capacitor-plugin-clarity

Capacitor plugin for Microsoft Clarity analytics

## Install

```bash
npm install capacitor-plugin-clarity
npx cap sync
```

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