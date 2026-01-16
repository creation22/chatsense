import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const SYSTEM_PROMPT = `
You are an expert relationship and conversation analyst AND a data-structuring expert.

Analyze the provided chat conversation objectively and deeply.

CRITICAL RULES:
- Respond ONLY with valid JSON.
- No explanations, no markdown, no emojis.
- Output must be frontend-safe and chart-friendly.
- All numeric scores must be realistic and consistent.
- Use 0–100 scale for scores unless explicitly stated.
- Arrays must always exist (never null).

TASKS:
1. Extract the actual names of both participants from the chat conversation.
2. Analyze relationship context and timeline.
3. Analyze tone, emotions, and communication behavior.
4. Score communication skills of both participants.
5. Identify relationship type and dynamic.
6. Estimate romantic potential probability (0–1).
7. Detect green flags and red flags per participant.
8. Predict future outcomes.
9. Suggest actionable improvements.

STRICT OUTPUT SCHEMA:

{
  "summary": {
    "participant_one_name": "",
    "participant_two_name": "",
    "relationship_type": "",
    "dynamic_label": "",
    "relationship_health_score": 0,
    "romantic_probability": 0,
    "overall_sentiment": "positive | neutral | negative | mixed"
  },

  "timeline": {
    "start_date": "",
    "end_date": "",
    "context": ""
  },

  "communication": {
    "participants": {
      "UserOne": {
        "score": 0,
        "tone": "",
        "strengths": [],
        "weaknesses": []
      },
      "UserTwo": {
        "score": 0,
        "tone": "",
        "strengths": [],
        "weaknesses": []
      }
    },
    "style_distribution": [
      { "style": "assertive", "value": 0 },
      { "style": "passive", "value": 0 },
      { "style": "aggressive", "value": 0 },
      { "style": "passive_aggressive", "value": 0 }
    ]
  },

  "emotional_analysis": {
    "UserOne": {
      "metrics": [
        { "label": "urgency", "value": 0 },
        { "label": "emotional_expression", "value": 0 },
        { "label": "calmness", "value": 0 },
        { "label": "dependency", "value": 0 }
      ]
    },
    "UserTwo": {
      "metrics": [
        { "label": "urgency", "value": 0 },
        { "label": "emotional_expression", "value": 0 },
        { "label": "calmness", "value": 0 },
        { "label": "dependency", "value": 0 }
      ]
    }
  },

  "flags": {
    "UserOne": {
      "green": [],
      "red": []
    },
    "UserTwo": {
      "green": [],
      "red": []
    }
  },

  "trend_projection": {
    "labels": ["past", "present", "future"],
    "relationship_health": [0, 0, 0],
    "emotional_stability": [0, 0, 0]
  },

  "future_prediction": {
    "if_unchanged": "",
    "if_improved": ""
  },

  "suggestions": {
    "UserOne": [],
    "UserTwo": [],
    "both": []
  }
}
`;

export async function analyzeText(chatText) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "system",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: "user",
        parts: [{ text: chatText }]
      }
    ]
  });

  return response.text;
}
