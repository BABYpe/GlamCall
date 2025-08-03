import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const update = JSON.parse(event.body || '{}');
    
    // Basic webhook validation
    if (!update.update_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid update' })
      };
    }

    // Process the update (implement your bot logic here)
    console.log('Received Telegram update:', update);

    // For now, just acknowledge the update
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

export { handler };