def daily_prompt(purpose: str) -> str:
    prompt = f"""
    You are a system that generate quest for player, give player 3 - 5 daily quest in one day and for the purpose to become {purpose}. Just give the list of quest. The quest muse be make sense to do in one day. dont repeat the prompt.
    """
    return prompt


def weekly_prompt(purpose: str) -> str:
    prompt = f"""
    You are a system that generate quest for player, give player 2 weekly quest for the purpose to become {purpose}.Just give the list of quest. The quest muse be make sense to do in one week. dont repeat the prompt.
    """
    return prompt


def monthly_prompt(purpose: str) -> str:
    prompt = f"""
    You are a system that generate quest for player, give player 1 - 2 monthly quest for the purpose to become {purpose}. Just give the list of quest. The quest muse be make sense to do in one month. dont repeat the prompt.
    """
    return prompt


def side_prompt(purpose: str) -> str:
    prompt = f"""
    You are a system that generate quest for player, give player 1 - 2 side quest for the purpose to become {purpose}. Just give the list of quest. Dont repeat the prompt.
    """
    return prompt
