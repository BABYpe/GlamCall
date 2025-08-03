// Telegram Bot Integration for GlamCall
import { TelegramBot, BotCommand, InlineKeyboard } from './types';

export class GlamCallTelegramBot {
  private botToken: string;
  private webhookUrl: string;
  private apiUrl: string;

  constructor(botToken: string, webhookUrl: string, apiUrl: string) {
    this.botToken = botToken;
    this.webhookUrl = webhookUrl;
    this.apiUrl = apiUrl;
  }

  // Initialize bot with commands
  async initialize(): Promise<void> {
    const commands: BotCommand[] = [
      { command: 'start', description: 'Start using GlamCall' },
      { command: 'models', description: 'Browse available models' },
      { command: 'balance', description: 'Check your coin balance' },
      { command: 'history', description: 'View call history' },
      { command: 'support', description: 'Get help and support' },
      { command: 'language', description: 'Change language' },
      { command: 'settings', description: 'Account settings' }
    ];

    await this.setCommands(commands);
    await this.setWebhook();
  }

  // Set bot commands
  private async setCommands(commands: BotCommand[]): Promise<void> {
    const response = await fetch(`https://api.telegram.org/bot${this.botToken}/setMyCommands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands })
    });

    if (!response.ok) {
      throw new Error('Failed to set bot commands');
    }
  }

  // Set webhook
  private async setWebhook(): Promise<void> {
    const response = await fetch(`https://api.telegram.org/bot${this.botToken}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url: this.webhookUrl,
        allowed_updates: ['message', 'callback_query', 'inline_query']
      })
    });

    if (!response.ok) {
      throw new Error('Failed to set webhook');
    }
  }

  // Handle incoming updates
  async handleUpdate(update: any): Promise<void> {
    try {
      if (update.message) {
        await this.handleMessage(update.message);
      } else if (update.callback_query) {
        await this.handleCallbackQuery(update.callback_query);
      } else if (update.inline_query) {
        await this.handleInlineQuery(update.inline_query);
      }
    } catch (error) {
      console.error('Error handling update:', error);
    }
  }

  // Handle text messages
  private async handleMessage(message: any): Promise<void> {
    const chatId = message.chat.id;
    const text = message.text;
    const userId = message.from.id;

    // Register user if new
    await this.registerUser(userId, message.from);

    switch (text) {
      case '/start':
        await this.sendWelcomeMessage(chatId);
        break;
      
      case '/models':
        await this.sendModelsMenu(chatId);
        break;
      
      case '/balance':
        await this.sendBalance(chatId, userId);
        break;
      
      case '/history':
        await this.sendCallHistory(chatId, userId);
        break;
      
      case '/support':
        await this.sendSupportMenu(chatId);
        break;
      
      case '/language':
        await this.sendLanguageMenu(chatId);
        break;
      
      case '/settings':
        await this.sendSettingsMenu(chatId);
        break;
      
      default:
        await this.sendUnknownCommand(chatId);
    }
  }

  // Handle callback queries (button presses)
  private async handleCallbackQuery(callbackQuery: any): Promise<void> {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    const userId = callbackQuery.from.id;

    await this.answerCallbackQuery(callbackQuery.id);

    const [action, ...params] = data.split(':');

    switch (action) {
      case 'model':
        await this.showModelProfile(chatId, params[0]);
        break;
      
      case 'call':
        await this.initiateCall(chatId, userId, params[0]);
        break;
      
      case 'buy_coins':
        await this.showCoinPackages(chatId);
        break;
      
      case 'purchase':
        await this.processPurchase(chatId, userId, params[0]);
        break;
      
      case 'language':
        await this.changeLanguage(chatId, userId, params[0]);
        break;
      
      case 'support_topic':
        await this.showSupportTopic(chatId, params[0]);
        break;
    }
  }

  // Handle inline queries
  private async handleInlineQuery(inlineQuery: any): Promise<void> {
    const query = inlineQuery.query.toLowerCase();
    const results = await this.searchModels(query);
    
    await this.answerInlineQuery(inlineQuery.id, results);
  }

  // Send welcome message
  private async sendWelcomeMessage(chatId: number): Promise<void> {
    const keyboard: InlineKeyboard = {
      inline_keyboard: [
        [
          { text: '🌟 Browse Models', callback_data: 'models:browse' },
          { text: '💰 Buy Coins', callback_data: 'buy_coins' }
        ],
        [
          { text: '📊 My Balance', callback_data: 'balance' },
          { text: '📞 Call History', callback_data: 'history' }
        ],
        [
          { text: '🌐 Language', callback_data: 'language:menu' },
          { text: '❓ Support', callback_data: 'support:menu' }
        ],
        [
          { text: '🚀 Open Web App', web_app: { url: 'https://glamcall.com' } }
        ]
      ]
    };

    const message = `
🌟 *Welcome to GlamCall!*

Connect with beautiful models from around the world through high-quality video calls.

✨ *Features:*
• HD Video Calls
• Global Models
• Secure Payments
• 24/7 Support
• Multi-language

Choose an option below to get started:
    `;

    await this.sendMessage(chatId, message, keyboard);
  }

  // Send models menu
  private async sendModelsMenu(chatId: number): Promise<void> {
    const models = await this.getOnlineModels();
    
    const keyboard: InlineKeyboard = {
      inline_keyboard: [
        ...models.slice(0, 10).map(model => [
          { 
            text: `${model.isOnline ? '🟢' : '🔴'} ${model.name} (${model.country})`, 
            callback_data: `model:${model.id}` 
          }
        ]),
        [
          { text: '🔍 Search Models', switch_inline_query_current_chat: '' },
          { text: '🌐 View All', web_app: { url: 'https://glamcall.com/models' } }
        ],
        [{ text: '⬅️ Back to Menu', callback_data: 'start' }]
      ]
    };

    await this.sendMessage(chatId, '🌟 *Available Models*\n\nChoose a model to view their profile:', keyboard);
  }

  // Show model profile
  private async showModelProfile(chatId: number, modelId: string): Promise<void> {
    const model = await this.getModelById(modelId);
    
    if (!model) {
      await this.sendMessage(chatId, '❌ Model not found.');
      return;
    }

    const keyboard: InlineKeyboard = {
      inline_keyboard: [
        [
          { text: '📞 Start Call', callback_data: `call:${model.id}` },
          { text: '💝 Send Gift', callback_data: `gift:${model.id}` }
        ],
        [
          { text: '⭐ Add to Favorites', callback_data: `favorite:${model.id}` },
          { text: '💬 Send Message', callback_data: `message:${model.id}` }
        ],
        [{ text: '⬅️ Back to Models', callback_data: 'models:browse' }]
      ]
    };

    const message = `
🌟 *${model.name}*

📍 Country: ${model.country}
🗣️ Languages: ${model.language}
⭐ Rating: ${model.rating}/5 (${model.reviewCount} reviews)
💰 Price: $${model.pricePerMinute}/minute
${model.isOnline ? '🟢 Online Now' : '🔴 Offline'}

📝 *About:*
${model.description}

🏷️ *Tags:* ${model.tags.join(', ')}
    `;

    await this.sendPhoto(chatId, model.avatar, message, keyboard);
  }

  // Send message with keyboard
  private async sendMessage(chatId: number, text: string, keyboard?: InlineKeyboard): Promise<void> {
    const payload: any = {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    };

    if (keyboard) {
      payload.reply_markup = keyboard;
    }

    await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  // Send photo with caption
  private async sendPhoto(chatId: number, photo: string, caption: string, keyboard?: InlineKeyboard): Promise<void> {
    const payload: any = {
      chat_id: chatId,
      photo: photo,
      caption: caption,
      parse_mode: 'Markdown'
    };

    if (keyboard) {
      payload.reply_markup = keyboard;
    }

    await fetch(`https://api.telegram.org/bot${this.botToken}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  // Answer callback query
  private async answerCallbackQuery(callbackQueryId: string, text?: string): Promise<void> {
    await fetch(`https://api.telegram.org/bot${this.botToken}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: text
      })
    });
  }

  // Answer inline query
  private async answerInlineQuery(inlineQueryId: string, results: any[]): Promise<void> {
    await fetch(`https://api.telegram.org/bot${this.botToken}/answerInlineQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inline_query_id: inlineQueryId,
        results: results
      })
    });
  }

  // Helper methods for data fetching
  private async getOnlineModels(): Promise<any[]> {
    // Fetch from your API
    const response = await fetch(`${this.apiUrl}/models?status=online&limit=10`);
    return response.json();
  }

  private async getModelById(modelId: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/models/${modelId}`);
    return response.json();
  }

  private async registerUser(userId: number, userInfo: any): Promise<void> {
    await fetch(`${this.apiUrl}/users/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: userId,
        username: userInfo.username,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name
      })
    });
  }

  private async searchModels(query: string): Promise<any[]> {
    const response = await fetch(`${this.apiUrl}/models/search?q=${encodeURIComponent(query)}`);
    const models = await response.json();
    
    return models.map((model: any) => ({
      type: 'article',
      id: model.id,
      title: model.name,
      description: `${model.country} • $${model.pricePerMinute}/min • ${model.isOnline ? 'Online' : 'Offline'}`,
      thumb_url: model.avatar,
      input_message_content: {
        message_text: `🌟 *${model.name}*\n\n📍 ${model.country}\n💰 $${model.pricePerMinute}/min\n${model.isOnline ? '🟢 Online' : '🔴 Offline'}`
      }
    }));
  }
}

// Export bot instance
export const createTelegramBot = (botToken: string, webhookUrl: string, apiUrl: string) => {
  return new GlamCallTelegramBot(botToken, webhookUrl, apiUrl);
};