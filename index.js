require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('توکن ربات در .env پیدا نشد!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "یک گزینه انتخاب کنید:", {
    reply_markup: {
      keyboard: [
        ["🕐 یادآوری 1 دقیقه‌ای", "🕔 یادآوری 5 دقیقه‌ای"],
        ["🔙 بازگشت"]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

bot.on("message", (msg) => {
  if (msg.text === "🕐 یادآوری 1 دقیقه‌ای") {
    bot.sendMessage(msg.chat.id, "یادآوری در 1 دقیقه تنظیم شد ✅");
    setTimeout(() => {
      bot.sendMessage(msg.chat.id, "⏰ یادآوری: زمان 1 دقیقه‌ای شما تمام شد!");
    }, 1 * 60 * 1000);
  } else if (msg.text === "🕔 یادآوری 5 دقیقه‌ای") {
    bot.sendMessage(msg.chat.id, "یادآوری در 5 دقیقه تنظیم شد ✅");
    setTimeout(() => {
      bot.sendMessage(msg.chat.id, "⏰ یادآوری: زمان 5 دقیقه‌ای شما تمام شد!");
    }, 5 * 60 * 1000);
  }
});
bot.onText(/\/remind (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const time = parseInt(match[1]); // مثلا "5"
  
  if (isNaN(time)) {
    bot.sendMessage(chatId, "لطفا زمان را به دقیقه وارد کنید. مثلا: /remind 5");
    return;
  }

  bot.sendMessage(chatId, `یادآوری در ${time} دقیقه تنظیم شد ✅`);
});

console.log('ربات با موفقیت راه‌اندازی شد!');
