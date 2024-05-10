import { detailQuest } from "../../apis/quests.js";


const detailHistory = async (ctx) => {
    let questId = ctx.message.text.substring(1);

    let detail = await detailQuest(questId);

    if (!detail) {
        ctx.reply(`4️⃣0️⃣4️⃣ Quest not found`);
        return
    }

    let metadata = `ID: ${detail.questId}\nTYPE: ${detail.type}\nSTATUS: ${detail.status}\nCREATED AT: ${detail.createdAt}\nACCEPTED AT: ${detail.acceptedAt}`
    let data = `${metadata}\n\n\nQUEST:\n${detail.quest}`;

    let confirmButton = []
    if (!detail.status || detail.status == 'in progress') {
        confirmButton = [
            {
                text: "✅ Completed",
                callback_data: `questCompleted#${detail.questId}`,
                hide: false,
            },
            {
                text: "⏳ Not Complete",
                callback_data: `questNotComplete#${detail.questId}`,
                hide: false,
            }
        ]
    }

    ctx.reply(data, {
        reply_markup: {
            inline_keyboard: [
                confirmButton,
                [
                    {
                        text: "❌ Close",
                        callback_data: `deleteMessage`,
                        hide: false,
                    }
                ],
            ],
        },
    });
}

export default (bot) => bot.command(/quest_(.+)/, async (ctx) => { await detailHistory(ctx) });