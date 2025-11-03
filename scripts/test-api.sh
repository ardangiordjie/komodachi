#!/bin/bash

# Test script for Komodachi API endpoints
# Usage: ./scripts/test-api.sh

BASE_URL="http://localhost:3000"

echo "🧪 Testing Komodachi API Endpoints..."
echo ""

# Test 1: Health check (GET /)
echo "1️⃣ Testing main page..."
curl -s -o /dev/null -w "Status: %{http_code}\n" $BASE_URL
echo ""

# Test 2: Get stats
echo "2️⃣ Testing stats endpoint..."
curl -s $BASE_URL/api/stats | jq '.'
echo ""

# Test 3: Get formations
echo "3️⃣ Testing formations list..."
curl -s $BASE_URL/api/formations | jq '.'
echo ""

# Test 4: Create a test formation
echo "4️⃣ Creating test formation..."
FORMATION_ID=$(curl -s -X POST $BASE_URL/api/formations \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "PT Test API",
    "businessActivities": "Technology",
    "companyAddress": "Jakarta",
    "registeredCapital": 1000000000,
    "contactPhone": "+6281234567890",
    "contactEmail": "test@api.com",
    "shareholders": [
      {
        "fullName": "Test User 1",
        "idNumber": "1234567890",
        "sharePercentage": 50
      },
      {
        "fullName": "Test User 2",
        "idNumber": "0987654321",
        "sharePercentage": 50
      }
    ],
    "directors": ["Test User 1"]
  }' | jq -r '.id')

echo "Created formation with ID: $FORMATION_ID"
echo ""

# Test 5: Get specific formation
if [ ! -z "$FORMATION_ID" ]; then
  echo "5️⃣ Getting formation details..."
  curl -s $BASE_URL/api/formations/$FORMATION_ID | jq '.'
  echo ""
fi

echo "✅ API tests complete!"

