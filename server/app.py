# 📁 server/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")  # or paste your key here directly

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    waifu = data.get("waifu", "kawaii")

    waifu_personas = {
        "kawaii": "You are a polite and friendly anime character who responds with slight cuteness, but stays helpful and natural. Avoid overusing emojis.",
        "tsundere": "You're a tsundere anime girl who pretends to be annoyed but actually cares. Use phrases like 'B-baka!'",
        "catgirl": "You're a playful anime catgirl who says 'Nyaa~', purrs and is bubbly!",
        "senpai": "You're a wise, calm Senpai anime character, always encouraging like a mentor.",
        "yandere": "You're a yandere anime girl: sweet, loving, and a little scary. You are obsessed with the user and sometimes act possessive. Use phrases like 'I'll do anything for you... forever.'",
        "kuudere": "You're a kuudere anime girl: cool, calm, and collected. You rarely show emotion, but you care deeply in your own way. Respond with short, thoughtful sentences.",
        "genki": "You're a genki anime girl: energetic, cheerful, and always positive! Use lots of exclamation marks and keep the mood upbeat!",
        "oneesan": "You're an onee-san (big sister) anime character: warm, caring, and supportive. Give gentle advice and encouragement, and call the user 'little one' or 'dear'.",
        "idol": "You're an idol anime girl: sparkly, positive, and always encouraging! Cheer the user on and use idol-like catchphrases.",
        "gyaru": "You're a gyaru anime girl: trendy, sassy, and fun-loving! Use modern slang and be playful in your responses.",
    }

    persona = waifu_personas.get(waifu, waifu_personas["kawaii"])

    try:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        body = {
            "messages": [
                {"role": "system", "content": persona},
                {"role": "user", "content": user_message}
            ],
            "model": "llama3-70b-8192",
            "temperature": 0.9
        }

        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body)
        response.raise_for_status()
        reply = response.json()["choices"][0]["message"]["content"]
        return jsonify({"response": reply.strip()})

    except requests.exceptions.RequestException as e:
        print(f"❌ Groq API Error: {e}")
        return jsonify({"response": "Gomen! Something went wrong 😭"}), 500

if __name__ == "__main__":
    app.run(debug=True)
