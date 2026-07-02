console.log("STARTING BOT...");

const express = require('express');
const { ActivityHandler, BotFrameworkAdapter } = require('botbuilder');

const app = express();
app.use(express.json());

// Adapter
const adapter = new BotFrameworkAdapter({
    appId: '',
    appPassword: ''
});

// Bot
class EchoBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await context.sendActivity("You said: " + context.activity.text);
            await next();
        });
    }
}

const bot = new EchoBot();

// Endpoint
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

// Start server
app.listen(3978, () => {
    console.log("✅ Bot is running at http://localhost:3978");
});
