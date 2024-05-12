import { userQuestHistory } from "../apis/users.js";

const formatQuests = quests => {
    const questsByType = quests.reduce((acc, quest) => {
        if (!acc[quest.type]) {
            acc[quest.type] = [];
        }
        acc[quest.type].push(quest.questId);
        return acc;
    }, {});

    let formattedText = 'The following quests are currently in progress:\n\n';
    Object.entries(questsByType).forEach(([type, quests]) => {
        formattedText += `\n📋 ${type.toUpperCase()} QUEST\n`;
        quests.forEach(questId => {
            formattedText += `       - /${questId}\n`;
        });
    });

    formattedText += "\n\nKeep up the good work! You got this! 💪";
    formattedText += "\n\nTap the quest ID to update the status.";
    return formattedText;
};

const update = async (ctx) => {
    let userId = ctx.message.from.id.toString();
    let { metadata, data } = await userQuestHistory(userId, "all", "in progress", 1);

    if (metadata.totalPage == 0) {
        ctx.reply(`4️⃣0️⃣4️⃣\n\nSorry, you don't have any quests with the status in progress.`);
        return
    }

    let formattedText = formatQuests(data);
    ctx.reply(formattedText);
}

export default (bot) => bot.command("update", async (ctx) => { await update(ctx) });