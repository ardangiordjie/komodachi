#!/bin/bash

# Configure ElevenLabs Agent Webhooks via API
# Usage: ./scripts/configure-webhooks.sh

AGENT_ID="agent_8701k93aecrefc7v4zm4t2dfbaet"
API_KEY="sk_a794775c6dd82f4d7ab27f3abade916a6cffee4a953d0e62"
WEBHOOK_BASE_URL="https://komodachi-augi.vercel.app/api/elevenlabs/webhook"

echo "🔧 Configuring ElevenLabs Agent Webhooks..."
echo ""

# Update agent with webhook configuration
curl -X PATCH "https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}" \
  -H "xi-api-key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_config": {
      "webhook": {
        "url": "'${WEBHOOK_BASE_URL}'/call-end",
        "events": ["conversation.ended"]
      }
    }
  }'

echo ""
echo "✅ Webhook configuration sent!"
echo ""
echo "Webhook URL: ${WEBHOOK_BASE_URL}/call-end"

