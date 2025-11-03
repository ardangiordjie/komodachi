# 🔧 ElevenLabs Webhook Setup Guide

## Option 1: Find Webhooks in Dashboard

### Step-by-Step:

1. **Go to your agent**: https://elevenlabs.io/app/conversational-ai
2. **Click on "Komodachi"** (your agent)
3. **Look for one of these sections:**
   - Agent Settings → **Advanced**
   - Agent Settings → **Webhooks**
   - Agent Settings → **Integrations**
   - Scroll to bottom of settings page

### What to Look For:
- Field labeled "Webhook URL" or "Callback URL"
- Section called "Post-conversation webhook"
- "Event handlers" or "External endpoints"

### If You See It:
Add this URL:
```
https://komodachi-augi.vercel.app/api/elevenlabs/webhook/call-end
```

---

## Option 2: Configure via API

If webhooks aren't visible in the UI, configure via API:

### Run This Command:

```bash
cd /Users/ardangiordjie/komodachi-augi
chmod +x scripts/configure-webhooks.sh
./scripts/configure-webhooks.sh
```

---

## Option 3: Manual Polling (Backup Method)

If webhooks aren't available, we can poll for conversation history:

### This involves:
1. ElevenLabs stores conversation history
2. We periodically check for new conversations
3. Import them into our database

Let me know if you need this approach!

---

## 🎯 Where Are You Looking?

**Can you tell me:**
1. Are you in the ElevenLabs dashboard?
2. What tabs/sections do you see in your agent settings?
3. What's your screen showing?

I can guide you more specifically based on what you're seeing!

---

## 📸 What You Should See:

The webhook section typically looks like:

```
┌─────────────────────────────────────┐
│ Agent Settings                      │
├─────────────────────────────────────┤
│ □ General                          │
│ □ Voice                            │
│ □ Conversation                     │
│ ▣ Advanced                         │  ← Look here!
│   ├── Webhook URL                  │
│   │   [                          ] │
│   └── Events: ☑ conversation.ended │
└─────────────────────────────────────┘
```

Or:

```
┌─────────────────────────────────────┐
│ Integrations                        │
├─────────────────────────────────────┤
│ Webhook Configuration              │
│                                    │
│ Endpoint URL:                      │
│ [                                ] │
│                                    │
│ Events:                            │
│ ☑ On Call Start                    │
│ ☑ On Call End                      │
│ ☑ On Message                       │
└─────────────────────────────────────┘
```

---

## 🆘 Still Can't Find It?

**Tell me what you see and I'll help you find it!**

Or we can try the API method right now.

