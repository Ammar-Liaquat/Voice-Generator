import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [voiceId, setVoiceId] = useState("JBFqnCBsd6RMkjVDRZzb");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const voices = [
    { id: "JBFqnCBsd6RMkjVDRZzb", name: "Rachel (Default)" },
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
    { id: "FGY2WhTYpPnrIDTdsKH5", name: "Antoni" },
    { id: "IKne3meq5aSn9XLyUdCD", name: "Josh" },
    { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
    { id: "hpp4J3VqNfWAUOO0d1Us", name: "Custom Voice 1" },
    { id: "N2lVS1w4EtoT3dr4eOWO", name: "Custom Voice 2" },
    { id: "SAz9YHcvj6GT2YYXdXww", name: "Custom Voice 3" },
    { id: "SOYHLrjzK2X1ezoPC6cr", name: "Custom Voice 4" },
    { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Custom Voice 5" },
    { id: "XrExE9yKIg1WjnnlVkGX", name: "Custom Voice 6" },
    { id: "bIHbv24MWmeRgasZH58o", name: "Custom Voice 7" },
    { id: "cgSgspJ2msm6clMCkdW9", name: "Custom Voice 8" },
    { id: "cjVigY5qzO86Huf0OWal", name: "Custom Voice 9" },
    { id: "iP95p4xoKVk53GoZ742B", name: "Custom Voice 10" },
    { id: "nPczCjzI2devNBz1zQrb", name: "Custom Voice 11" },
    { id: "onwK4e9ZLuTAKqWW03F9", name: "Custom Voice 12" },
    { id: "pFZP5JQG7iQjIQuC4Bku", name: "Custom Voice 13" },
    { id: "pNInz6obpgDQGcFmaJgB", name: "Custom Voice 14" },
    { id: "pqHfZKP75CvOlQylNhV4", name: "Custom Voice 15" },
  ];

  const handleGenerate = async () => {
    if (!text) return alert("Type some text!");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/generate-voice", {
        text,
        voiceId,
      });

      const b64 = response.data.audio;
      setAudioSrc(`data:audio/mpeg;base64,${b64}`);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Voice generation failed");
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = "voice.mp3";
    link.click();
  };

  return (
    <div style={{ ...styles.container, background: darkMode ? styles.darkBg : styles.lightBg, color: darkMode ? "#fff" : "#333" }}>
      <header style={styles.header}>
        <h1>Ammar ElevenLabs Dashboard</h1>
        <p>🎙 AI Voice Generator — PRO</p>
        <button onClick={() => setDarkMode(!darkMode)} style={styles.toggleButton}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main style={styles.main}>
        <div style={{ ...styles.card, background: darkMode ? "#1e1e1e" : "#fff", color: darkMode ? "#fff" : "#333" }}>
          <h2 style={{ marginBottom: "15px" }}>Generate Voice</h2>

          <select
            style={styles.select}
            value={voiceId}
            onChange={(e) => setVoiceId(e.target.value)}
          >
            {voices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>

          <textarea
            style={styles.textarea}
            placeholder="Type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            style={{
              ...styles.button,
              backgroundColor: loading ? "#999" : "#4CAF50",
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Voice"}
          </button>

          {audioSrc && (
            <div style={{ ...styles.audioBox, background: darkMode ? "#333" : "#f5f5f5", color: darkMode ? "#fff" : "#000" }}>
              <p style={{ marginBottom: "10px" }}>🔊 Preview:</p>
              <audio controls src={audioSrc} style={{ width: "100%" }} />
              <button style={styles.downloadButton} onClick={handleDownload}>
                ⬇ Download MP3
              </button>
            </div>
          )}
        </div>
      </main>

      <footer style={{ ...styles.footer, background: darkMode ? "rgba(0,0,0,0.4)" : "#eee", color: darkMode ? "#fff" : "#333" }}>
        &copy; 2026 Ammar ElevenLabs Dashboard
      </footer>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Segoe UI, Roboto, sans-serif" },
  darkBg: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  lightBg: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  header: { textAlign: "center", padding: "20px" },
  toggleButton: { padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px" },
  main: { flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px" },
  card: { borderRadius: "12px", padding: "30px", width: "400px", boxShadow: "0 15px 35px rgba(0,0,0,0.3)", textAlign: "center" },
  textarea: { width: "100%", height: "100px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "15px", fontSize: "14px", resize: "none" },
  button: { width: "100%", padding: "12px", border: "none", borderRadius: "8px", color: "#fff", fontSize: "16px", cursor: "pointer", transition: "0.3s", marginBottom: "15px" },
  select: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" },
  audioBox: { marginTop: "20px", padding: "15px", borderRadius: "8px" },
  downloadButton: { marginTop: "10px", width: "100%", padding: "10px", border: "none", borderRadius: "6px", background: "#2196F3", color: "#fff", cursor: "pointer" },
  footer: { textAlign: "center", padding: "15px 0" },
};

export default App;