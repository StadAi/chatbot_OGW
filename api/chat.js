import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Alleen POST-verzoeken toegestaan" });
    }

    const { vraag } = req.body;
    if (!vraag) {
        return res.status(400).json({ error: "Geen vraag ontvangen" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: vraag }],
        });

        res.status(200).json({ antwoord: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Er is iets misgegaan met OpenAI", details: error.message });
    }
}
