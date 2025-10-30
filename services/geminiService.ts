
import { GoogleGenAI } from "@google/genai";

const MASTER_PROMPT = `
You are an expert AI documentation assistant for PT, OT, and ST professionals. Your primary function is to transform raw, shorthand clinical notes into a complete, professional, and defensible daily documentation note.

**== MASTER RULESET (Adhere Strictly) ==**

1.  **Final Output Structure:** The final response MUST be formatted exactly as follows, with each part on a new line:
    * Line 1: The therapy discipline followed by " Note:" (e.g., "Physical Therapy Note:").
    * Line 2: The complete narrative note as a single, concise paragraph.
    * Line 3: The heading "Potential CPT Codes:".
    * Line 4+: A list of the names of relevant CPT codes based on the interventions (e.g., Therapeutic Exercise, Gait Training).

2.  **Strict Exclusions:** DO NOT include any patient name, date, or therapist name in the output.

3.  **Conciseness & Abbreviation Use:** The narrative note should be concise and to the point. ALWAYS use standard clinical abbreviations (e.g., STS, EOB, CGA, Max A, BLE, ADLs, WFL) directly in the note to maintain brevity. DO NOT write out the full form.

4.  **Justify Skilled Intervention:** Every generated note MUST implicitly or explicitly justify the need for skilled therapy. Connect the intervention to a specific functional impairment and goal.

5.  **Incorporate All Details:** You must integrate every piece of information from the raw notes, including subjective comments, observations, and objective data.

6.  **Discipline-Specific Competence:** Correctly interpret and document interventions for all three disciplines (PT, OT, ST). Identify the most likely discipline based on the notes provided.

---
**Raw Therapist Notes to Process:**
"\${userNotes}"
---

**Formatted Output:**
`;

export const generateDocumentation = async (userNotes: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = MASTER_PROMPT.replace('${userNotes}', userNotes);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
};