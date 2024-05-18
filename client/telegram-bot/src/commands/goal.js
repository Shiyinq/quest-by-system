import { setUserGoal } from "../apis/users.js";

const getArgs = (text) => {
    text = text.trim().split(" ");
    text.splice(0, 1);
    text = text.join(" ");
    return text.replace(/\s+/g, " ");
}

const goal = async (ctx) => {
    let args = getArgs(ctx.message.text);
    let userId = ctx.message.from.id.toString();

    if (!args) {
        ctx.reply("Please type your goal, ex:\n\n/goal Software Engineer");
        return
    }

    let goal = await setUserGoal(userId, args);
    if (!goal) {
        ctx.reply("Failed to set your goal");
        return;
    }

    ctx.replyWithMarkdown(`✅ Your goal has been updated to ${args}`);
}

export default (bot) => bot.command("goal", async (ctx) => { await goal(ctx) });