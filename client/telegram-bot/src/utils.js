export const userInfo = (ctx) => {
    if (ctx?.message) {
        return ctx.message.from;
    } else if (ctx?.update) {
        return ctx.update.callback_query.from;
    }
};
