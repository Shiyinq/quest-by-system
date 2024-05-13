import { healthCheck } from "../apis/healthcheck.js";

const ping = async (ctx) => {
    const startTime = Date.now();
    let status = await healthCheck();
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000;
    const emojiResponseTime = responseTime < 1 ? '⚡️' : '⏱️';

    if (!status) {
        ctx.reply(`🚨 STATUS 🚨\n\n🟢 BOT: UP\n\n🔴 API: DOWN\n\n🔴 DB: DOWN\n\nResponse Time: ${emojiResponseTime} ${responseTime} seconds`);
        return;
    }

    ctx.reply(`🚨 STATUS 🚨\n\n🟢 BOT: UP\n\n🟢 API: ${status.api_status}\n\n🟢 DB: ${status.db_status}\n\nResponse Time: ${emojiResponseTime} ${responseTime} seconds`);
}

export default (bot) => bot.command("ping", async (ctx) => { await ping(ctx) });