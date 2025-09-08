from typing import Dict
from decouple import config
from openai import OpenAI

CHATGPT_KEY = config("OPEN_API_KEY")

client = OpenAI(
    # This is the default and can be omitted
    api_key=CHATGPT_KEY
)

def stock_advice(stock_sticker: str, cache: Dict[str, str] = None):
    if cache is None:
        cache = dict()

    if stock_sticker in cache:
        return cache[stock_sticker]

    response = client.responses.create(
        model="gpt-5-mini-2025-08-07",
        tools= [{ "type" : "web_search_preview_2025_03_11"}],
        input=f"Should I buy, sell or hold {stock_sticker}. Only include a very short and concise reason for the decision. Do not include anything else"
    ).output_text

    cache[stock_sticker] = response

    return response