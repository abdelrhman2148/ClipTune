/**
 * Email Automation Test Script (Node.js)
 * Run with: node scripts/test-email-automation.js
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const WEBHOOK_SECRET = process.env.USER_WEBHOOK_SECRET || 'test-secret';
const CRON_SECRET = process.env.CRON_SECRET || 'test-secret';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

async function testEndpoint(name, method, path, body = null, headers = {}) {
  console.log(`\n${colors.yellow}Test: ${name}${colors.reset}`);
  console.log(`${method} ${BASE_URL}${path}`);

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json().catch(() => ({ text: await response.text() }));

    if (response.ok) {
      console.log(`${colors.green}✓ Success (HTTP ${response.status})${colors.reset}`);
      console.log(JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      console.log(`${colors.red}✗ Failed (HTTP ${response.status})${colors.reset}`);
      console.log(JSON.stringify(data, null, 2));
      return { success: false, data };
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🧪 Testing Email Automation System');
  console.log('====================================');
  console.log(`Base URL: ${BASE_URL}\n`);

  const timestamp = Date.now();

  // Test 1: Welcome Email (Webhook)
  await testEndpoint(
    'Welcome Email (Webhook)',
    'POST',
    '/api/webhooks/user-created',
    {
      type: 'INSERT',
      table: 'users',
      record: {
        id: `test-user-${timestamp}`,
        email: `test-${timestamp}@example.com`,
        created_at: new Date().toISOString(),
      },
    },
    { Authorization: `Bearer ${WEBHOOK_SECRET}` }
  );

  // Test 2: Welcome Email (Direct API)
  await testEndpoint(
    'Welcome Email (Direct API)',
    'POST',
    '/api/email/welcome',
    {
      email: `test-direct-${timestamp}@example.com`,
      name: 'Test User',
    }
  );

  // Test 3: Upgrade Email
  await testEndpoint(
    'Upgrade Email',
    'POST',
    '/api/email/upgrade',
    {
      email: `test-upgrade-${timestamp}@example.com`,
      creditsUsed: 2,
      creditsTotal: 3,
      discountCode: 'UPGRADE20',
    }
  );

  // Test 4: Re-engagement Email
  await testEndpoint(
    'Re-engagement Email',
    'POST',
    '/api/email/re-engagement',
    {
      email: `test-reengage-${timestamp}@example.com`,
      daysInactive: 7,
      discountCode: 'COMEBACK30',
    }
  );

  // Test 5: Cron Job
  await testEndpoint(
    'Cron Job (Email Automation)',
    'GET',
    '/api/cron/email-automation',
    null,
    { Authorization: `Bearer ${CRON_SECRET}` }
  );

  console.log('\n====================================');
  console.log(`${colors.green}Testing Complete!${colors.reset}\n`);
  console.log('Note: If RESEND_API_KEY is not set, emails won\'t actually send');
  console.log('but the API endpoints should still return success responses.');
}

// Run tests
runTests().catch(console.error);

