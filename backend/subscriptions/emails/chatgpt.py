from decouple import config
from openai import OpenAI

CHATGPT_KEY = config("OPEN_API_KEY")

client = OpenAI(
    # This is the default and can be omitted
    api_key=CHATGPT_KEY
)

def stock_advice(stock_sticker: str):
    response = client.responses.create(
        model="gpt-5-mini-2025-08-07",
        tools= [{ "type" : "web_search_preview_2025_03_11"}],
        input=f"Should I buy, sell or hold {stock_sticker}. Only include a very short and concise reason for the decision. Do not include anything else"
    )
    return response.output_text