console.log("STARTING BOT...");
 
const express = require("express");
const { ActivityHandler, BotFrameworkAdapter } = require("botbuilder");
 
const app = express();
app.use(express.json());
 
// Home page
app.get("/", (req, res) => {
    res.send("Echo Bot is running!");
});
 
// Bot Adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId || "",
    appPassword: process.env.MicrosoftAppPassword || ""
});
 
// Echo Bot
class EchoBot extends ActivityHandler {
    constructor() {
        super();
 
        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text;
 
            await context.sendActivity(`You said: ${userMessage}`);
 
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
 
// Azure App Service port
const PORT = process.env.PORT || 3978;
 
app.listen(PORT, () => {
    console.log(`✅ Bot is running on port ${PORT}`);
});
 
