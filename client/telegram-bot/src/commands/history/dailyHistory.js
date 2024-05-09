import { questHistory } from "./index.js";

const dailyHistory = async (ctx) => {
    await questHistory(ctx, ctx.message.from.id.toString(), "daily", 1);
}

export default (bot) => bot.command("daily_history", (ctx) => { dailyHistory(ctx) });