import { userQuestStats } from "../apis/users.js";

const formatTaskData = (data) => {
    let formattedText = "Task Status:\n\n";
    for (let key in data) {
        formattedText += `📋 ${key.toUpperCase()} QUEST\n`;
        formattedText += `\t\t\t\t\t\t\t- In Progress: ${data[key].in_progress}\n`;
        formattedText += `\t\t\t\t\t\t\t- Completed: ${data[key].completed}\n`;
        formattedText += `\t\t\t\t\t\t\t- Not Completed: ${data[key].not_completed}\n\n`;
    }
    formattedText += "Keep up the good work! 💪🚀";
    return formattedText;
}

const stats = async (ctx) => {
    let userId = ctx.message.from.id.toString();
    let stats = await userQuestStats(userId);
    if (!stats) {
        ctx.reply("Failed to get stats");
        return
    }
    stats = formatTaskData(stats);
    ctx.reply(stats);
}

export default (bot) => bot.command("quests", async (ctx) => { await stats(ctx) });