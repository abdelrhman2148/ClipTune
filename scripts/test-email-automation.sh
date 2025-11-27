#!/bin/bash

# Email Automation Test Script
# Tests all email automation endpoints

BASE_URL="${1:-http://localhost:3000}"
WEBHOOK_SECRET="${USER_WEBHOOK_SECRET:-test-secret}"
CRON_SECRET="${CRON_SECRET:-test-secret}"

echo "🧪 Testing Email Automation System"
echo "===================================="
echo "Base URL: $BASE_URL"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Welcome Email (Webhook)
echo -e "${YELLOW}Test 1: Welcome Email (Webhook)${NC}"
echo "POST $BASE_URL/api/webhooks/user-created"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/webhooks/user-created" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $WEBHOOK_SECRET" \
  -d '{
    "type": "INSERT",
    "table": "users",
    "record": {
      "id": "test-user-'$(date +%s)'",
      "email": "test-'$(date +%s)'@example.com",
      "created_at": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
    }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
  echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}"
  echo "$BODY"
fi
echo ""

# Test 2: Welcome Email (Direct API)
echo -e "${YELLOW}Test 2: Welcome Email (Direct API)${NC}"
echo "POST $BASE_URL/api/email/welcome"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/email/welcome" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-direct-'$(date +%s)'@example.com",
    "name": "Test User"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
  echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}"
  echo "$BODY"
fi
echo ""

# Test 3: Upgrade Email
echo -e "${YELLOW}Test 3: Upgrade Email${NC}"
echo "POST $BASE_URL/api/email/upgrade"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/email/upgrade" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-upgrade-'$(date +%s)'@example.com",
    "creditsUsed": 2,
    "creditsTotal": 3,
    "discountCode": "UPGRADE20"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
  echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}"
  echo "$BODY"
fi
echo ""

# Test 4: Re-engagement Email
echo -e "${YELLOW}Test 4: Re-engagement Email${NC}"
echo "POST $BASE_URL/api/email/re-engagement"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/email/re-engagement" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-reengage-'$(date +%s)'@example.com",
    "daysInactive": 7,
    "discountCode": "COMEBACK30"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
  echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}"
  echo "$BODY"
fi
echo ""

# Test 5: Cron Job
echo -e "${YELLOW}Test 5: Cron Job (Email Automation)${NC}"
echo "GET $BASE_URL/api/cron/email-automation"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/cron/email-automation" \
  -H "Authorization: Bearer $CRON_SECRET")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}"
  echo "$BODY"
fi
echo ""

echo "===================================="
echo -e "${GREEN}Testing Complete!${NC}"
echo ""
echo "Note: If RESEND_API_KEY is not set, emails won't actually send"
echo "but the API endpoints should still return success responses."


