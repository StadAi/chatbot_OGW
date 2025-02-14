import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chatbot OGW API is actief!");
});

app.get("/api/chat", (req, res) => {
    res.json({ antwoord: "Hallo! Hoe kan ik je helpen?" });
});

export default app;
