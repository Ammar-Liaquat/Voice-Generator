const express = require("express");
const cors = require("cors");
require("dotenv").config({quiet:true});

const { ElevenLabsClient } = require("@elevenlabs/elevenlabs-js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

app.post("/generate-voice", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // ✅ FIXED: stream → buffer
    const audioStream = await client.textToSpeech.convert(
      "pNInz6obpgDQGcFmaJgB", // better voice
      {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      }
    );

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    res.json({
      audio: buffer.toString("base64"),
    });

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});