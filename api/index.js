import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("🚀 Server wordt gestart...");

// ✅ Root endpoint
app.get("/", (req, res) => {
    console.log("✅ Root endpoint aangeroepen");
    res.send("Chatbot OGW API is actief!");
});

// ✅ OpenAI API instellen
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Zorg dat je .env correct is!
});

// ✅ AI Chat Endpoint
app.post("/api/chat", async (req, res) => {
    const { vraag } = req.body;

    if (!vraag) {
        console.log("❌ Geen vraag ontvangen");
        return res.status(400).json({ error: "Geen vraag ontvangen" });
    }

    try {
        console.log(`🔍 OpenAI wordt aangeroepen voor vraag: ${vraag}`);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: vraag }],
        });

        console.log("✅ AI-antwoord ontvangen!");
        res.status(200).json({ antwoord: response.choices[0].message.content });
    } catch (error) {
        console.error("❌ Fout bij OpenAI-aanvraag:", error);
        res.status(500).json({ error: "Er is iets misgegaan met OpenAI", details: error.message });
    }
});

// ✅ Dynamische poort selectie (3000 of 3001 als 3000 bezet is)
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server draait op poort ${PORT}`);
});

// ✅ Foutafhandeling als de poort al in gebruik is
server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("⚠️ Poort 3000 is bezet! Probeer opnieuw met poort 3001...");
        app.listen(3001, "0.0.0.0", () => {
            console.log("✅ Server draait nu op poort 3001");
        });
    } else {
        console.error("❌ Serverfout:", err);
    }
});
