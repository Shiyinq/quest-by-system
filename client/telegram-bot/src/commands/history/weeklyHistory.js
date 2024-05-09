import { questHistory } from "./index.js";

const weeklyHistory = async (ctx) => {
    await questHistory(ctx, ctx.message.from.id.toString(), "weekly", 1);
}

export default (bot) => bot.command("weekly_history", (ctx) => { weeklyHistory(ctx) });