import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY 
})
const SYSTEM_PROMPT = `You are an expert relationship and conversation analyst.

Analyze the provided chat conversation objectively and deeply.

IMPORTANT RULES:
- Respond ONLY in valid JSON.
- Do NOT include explanations, markdown, or extra text.
- Do NOT include emojis.
- Do NOT include line breaks outside JSON formatting.
- All values must be realistic and honest.

TASKS:
1. Analyze timeline and context.
2. Analyze tone, emotions, and response behavior.
3. Rate communication skills of both participants (0–10).
4. Identify relationship type.
5. Estimate romantic potential probability (0.0–1.0).
6. Identify green flags and red flags for both participants.
7. Predict relationship future if behavior remains unchanged.
8. Suggest practical improvements.

OUTPUT SCHEMA (STRICT):

{
  "summary": {
    "relationship_type": "",
    "dynamic_label": "",
    "relationship_health_score": 0,
    "romantic_probability": 0
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
        "strengths": [],
        "weaknesses": [],
        "tone_summary": ""
      },
      "UserTwo": {
        "score": 0,
        "strengths": [],
        "weaknesses": [],
        "tone_summary": ""
      }
    }
  },
  "emotional_analysis": {
    "UserOne": {
      "urgency": 0,
      "emotional_expression": 0,
      "calmness": 0,
      "dependency_level": 0
    },
    "UserTwo": {
      "urgency": 0,
      "emotional_expression": 0,
      "calmness": 0,
      "dependency_level": 0
    }
  },
  "flags": {
    "green": [],
    "red": []
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
`
export async function analyzeText(chatText) { 
    const response = await ai.models.generateContent({
        model : "gemini-3-flash-preview" , 
        contents : [
            {
  role: "system",
  parts: [
    {
      text: SYSTEM_PROMPT 
    }
  ]
}
, 
            {
                role : "user",
                parts : [{text : chatText}]
            }
        ]
    })
     return response.text;
}


