import { generateQuest } from "../../apis/quests.js";

const checkUserId = (ctx) => {
    let userId = "unknown";
    if (ctx?.message) {
        userId = ctx.message.from.id.toString();
    } else if (ctx?.update) {
        userId = ctx.update.callback_query.message.chat.id.toString();
    }
    return userId;
};

const currentEditeMessage = (ctx) => {
    let edit_message_id = null;
    if (ctx?.message) {
        edit_message_id = ctx.message.message_id + 1;
    } else if (ctx?.update) {
        edit_message_id = ctx.update.callback_query.message.message_id + 1;
    }
    return edit_message_id;
};


export const generate = async (type, ctx) => {
    let userId = checkUserId(ctx);
    let editMessageId = currentEditeMessage(ctx);

    await ctx.reply(`📝 Please wait, generating ${type} quest for you...`);
    await ctx.sendChatAction("typing");

    let generated = await generateQuest(userId, type);

    if (!generated) {
        ctx.editMessageText("Failed to generate quest.", {
            message_id: editMessageId,
        });
        return
    }

    await ctx.editMessageText(generated.quest, {
        message_id: editMessageId,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "✅ Accept",
                        callback_data: `acceptQuest#${generated.questId}`,
                        hide: false,
                    },
                    {
                        text: "🔄 Re-generate",
                        callback_data: `generateQuest#${type}`,
                        hide: false,
                    },
                ],
            ],
        },
    });
}
