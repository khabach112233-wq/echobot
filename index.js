console.log("STARTING BOT...");
 
const express = require("express");
const { ActivityHandler, BotFrameworkAdapter } = require("botbuilder");
 
const app = express();
 
app.use(express.json());
 
// Test page
app.get("/", (req, res) => {
    res.send("Echo Bot is running!");
});
 
// For lab testing without authentication
const adapter = new BotFrameworkAdapter({
    appId: "",
    appPassword: ""
});
 
class EchoBot extends ActivityHandler {
    constructor() {
        super();
 
        this.onMessage(async (context, next) => {
            const text = context.activity.text;
 
            await context.sendActivity(`You said: ${text}`);
 
            await next();
        });
    }
}
 
const bot = new EchoBot();
 
// Bot endpoint
app.post("/api/messages", async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});
 
// Start server
const PORT = process.env.PORT || 3978;
 
app.listen(PORT, () => {
    console.log(`Bot is running on port ${PORT}`);
});
 
