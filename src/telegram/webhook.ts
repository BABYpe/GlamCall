// Telegram Webhook Handler for Serverless Deployment
import { createTelegramBot } from './bot';

// Environment variables
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL || '';
const API_URL = process.env.API_URL || 'https://glamcall.com/api';

// Initialize bot
const bot = createTelegramBot(BOT_TOKEN, WEBHOOK_URL, API_URL);

// Webhook handler for Vercel/Netlify
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    await bot.handleUpdate(update);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Setup webhook (run once)
export async function setupWebhook() {
  try {
    await bot.initialize();
    console.log('Telegram bot initialized successfully');
  } catch (error) {
    console.error('Failed to initialize bot:', error);
  }
}