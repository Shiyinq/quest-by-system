import { detailQuest } from "../../apis/quests.js";
import { userInfo } from "../../utils.js";


const formatTime = (date) => {
    if (!date) {
        return '-'
    }
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    const hours = ('0' + dateObj.getHours()).slice(-2);
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);
    const seconds = ('0' + dateObj.getSeconds()).slice(-2);

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}


const quest = async (ctx) => {
    let { id } = userInfo(ctx);
    let questId = ctx.message.text.substring(1);

    let detail = await detailQuest(id.toString(), questId);

    if (!detail) {
        ctx.reply(`4️⃣0️⃣4️⃣ Quest not found`);
        return
    }

    let metadata = `ID: ${detail.questId}\nTYPE: ${detail.type}\nSTATUS: ${detail.status}\n\nCREATED AT: ${formatTime(detail.createdAt)}\nACCEPTED AT: ${formatTime(detail.acceptedAt)}\nSTATUS UPDATED AT: ${formatTime(detail.statusUpdatedAt)}`
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

export default (bot) => bot.command(/quest_(.+)/, async (ctx) => { await quest(ctx) });