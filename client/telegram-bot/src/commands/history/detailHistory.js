import { detailQuest } from "../../apis/history.js";


const detailHistory = async (ctx) => {
    let questId = ctx.message.text.substring(1);

    let detail = await detailQuest(questId);

    if (!detail) {
        ctx.reply(`4️⃣0️⃣4️⃣ Quest not found`);
        return
    }

    let metadata = `ID: ${detail.questId}\nTYPE: ${detail.type}\nSTATUS: ${detail.status}\nCREATED AT: ${detail.createdAt}\nACCEPTED AT: ${detail.acceptedAt}`
    let data = `${metadata}\n\n\nQUEST:\n${detail.quest}`;

    ctx.reply(data, {
        reply_markup: {
            inline_keyboard: [
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