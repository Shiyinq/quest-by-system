import { questHistory } from "./index.js";

const monthlyHistory = async (ctx) => {
    await questHistory(ctx, ctx.message.from.id.toString(), "monthly", 1);
}

export default (bot) => bot.command("monthly_history", (ctx) => { monthlyHistory(ctx) });