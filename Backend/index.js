import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeText } from "./llm.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/", (req, res) => {
    res.send("TalkSense backend running");
});

// Main API
app.post("/analyze", async (req, res) => {
    try {
        const { chat } = req.body;

        if (!chat || typeof chat !== "string") {
            return res.status(400).json({
                error: "Chat text is required"
            });
        }

        const rawOutput = await analyzeText(chat);

        // IMPORTANT: parse JSON safely
        let parsed;
        try {
            parsed = JSON.parse(rawOutput);
        } catch (err) {
            return res.status(500).json({
                error: "AI returned invalid JSON",
                raw: rawOutput
            });
        }

        res.json(parsed);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
