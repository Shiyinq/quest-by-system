import { questHistory } from "./index.js";

const sideHistory = async (ctx) => {
    await questHistory(ctx, ctx.message.from.id.toString(), "side", 1);
}

export default (bot) => bot.command("side_history", (ctx) => { sideHistory(ctx) });