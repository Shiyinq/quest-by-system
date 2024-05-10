import { generate } from "./quests/index.js";
import { acceptQuest, updateStatusQuest } from "../apis/quests.js";
import { questHistory } from "./history/index.js";

const reGenerate = async (type, ctx) => {
    await generate(type, ctx);
}

const accept = async (questId, ctx) => {
    const accept = await acceptQuest(questId);

    if (!accept) {
        ctx.reply("Failed to accept quest");
        return
    }

    let message = `${ctx.update.callback_query.message.text}\n\n\n QUEST ACCEPTED ✅`;
    ctx.editMessageText(message, {
        message_id: ctx.update.callback_query.message.message_id,
    });
}

const getMoreQuestHistory = async (param, ctx) => {
    const [userId, type, page] = param.split("_");
    await questHistory(ctx, userId, type, page, "paging");
}

const updateStatus = async (questId, action, ctx) => {
    const status = {
        questCompleted: "completed",
        questNotComplete: "not complete"
    }

    const updated = await updateStatusQuest(questId, status[action]);

    if (!updated) {
        ctx.reply("Failed to update status");
        return
    }

    let message = `✅ UPDATE STATUS SUCCES\n\n /${questId} is ${status[action]}`;
    ctx.editMessageText(message, {
        message_id: ctx.update.callback_query.message.message_id,
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
        }
    });
}

const callback = async (ctx) => {
    let dataQuery = ctx.callbackQuery.data;
    let [action, param] = dataQuery.split("#");

    console.log(action, param);

    switch (action) {
        case "deleteMessage":
            ctx.deleteMessage();
            break;
        case "generateQuest":
            ctx.deleteMessage();
            await reGenerate(param, ctx);
            break;
        case "acceptQuest":
            await accept(param, ctx);
            break;
        case "prevHistory":
        case "nextHistory":
            await getMoreQuestHistory(param, ctx);
            break;
        case "questCompleted":
        case "questNotComplete":
            await updateStatus(param, action, ctx);
            break;
        default:
            break;
    }
}

export default (bot) => bot.on("callback_query", async (ctx) => { await callback(ctx) });