import Output from "../models/Output.js";
import { ChatAnthropic } from "@langchain/anthropic";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatAnthropic({
  model: "claude-3-sonnet-20240229", // Replace with your desired Anthropic model
  apiKey: process.env.ANTHROPIC_API_KEY, // Set your Anthropic API key as an environment variable
});

const REFERENCE_PROMPT = `
You are a copywriter at a marketing agency working on a brochure for a real estate developer.
Generate a narrative flow for the real estate brochure keeping in mind the brand positioning and features of the property.

<BRAND POSITIONING>
*$(... pass Input A: Brand Positioning over here)*
</BRAND POSITIONING> 

<FEATURES>
*$(... pass Input B: Features over here)*
</FEATURES>

Keep the tone of the narrative *$(...pass Input C: Tone)*
Also make sure that the length of the copy is *$(...pass Input D: Length passed as number of sentences to generate)*
`;

const REFERENCE_PROMPT_REGENERATE = `
Please regenerate the narrative flow by modifying ONLY the selection portion of the complete text.
Do not regenerate any other aspect of the complete text and ONLY give the output.

<COMPLETE TEXT>
*$(... pass complete text output from LLM)*
</COMPLETE TEXT> 

<SELECTED PORTION>
*$(... pass user highlighted selection of text on front end)*
</SELECTED PORTION>

Please make the text of the selection portion *$(...pass longer or shorter)*

Generate and return the complete text containing the modification, without providing any other information or sentences.
`;

export const generateCopy = async (req, res) => {
  const { tone, length, features, positioning } = req.body;
  const lengthMap = { Short: 5, Medium: 9, Long: 18 };
  const lengthSentences = lengthMap[length];

  const prompt = REFERENCE_PROMPT.replace(
    "$(... pass Input A: Brand Positioning over here)",
    positioning
  )
    .replace("$(... pass Input B: Features over here)", features)
    .replace("$(...pass Input C: Tone)", tone)
    .replace(
      "$(...pass Input D: Length passed as number of sentences to generate)",
      lengthSentences
    );

  try {
    const response = await model.invoke(prompt);
    const generatedText = response.content;
    res.json({ generatedText });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error generating copy", errormessage: error });
  }
};

export const insertCopy = async (req, res) => {
  const { tone, length, features, positioning, output } = req.body;

  const newCopy = new Output({
    tone,
    length,
    features,
    positioning,
    output,
  });

  try {
    await newCopy.save();
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error inserting data" });
  }
};

export const regenerateCopy = async (req, res) => {
  const { completeText, selectedText, option } = req.body;

  const prompt = REFERENCE_PROMPT_REGENERATE.replace(
    "$(... pass complete text output from LLM)",
    completeText
  )
    .replace(
      "$(... pass user highlighted selection of text on front end)",
      selectedText
    )
    .replace("$(...pass longer or shorter)", option);

  try {
    const response = await model.invoke(prompt);
    const modifiedText = response.content;
    res.json({ modifiedText });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error regenerating copy", errormessage: error });
  }
};
