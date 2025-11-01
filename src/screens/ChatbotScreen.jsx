import React, { useState, useEffect } from "react";
import { useTranslation } from "../i18n/useTranslation";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // ✨ NEW: Import speech recognition hooks
import { MicrophoneIcon } from '@heroicons/react/24/solid'; // ✨ NEW: Import a microphone icon

const ChatbotScreen = ({ onBack, lang }) => {
  const { t } = useTranslation(lang);
  const [messages, setMessages] = useState([
    { sender: "bot", text: t("chatbot_welcome") || "🌱 Hello! I am your smart farming assistant. Ask me about farming." },
  ]);
  const [input, setInput] = useState("");

  // ✨ NEW: Setup speech recognition hooks
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // ✨ NEW: A useEffect to update the input field when the user stops speaking
  useEffect(() => {
    if (transcript && !listening) {
      setInput(transcript);
    }
  }, [transcript, listening]);

  // Knowledge base (simple farming Q&A)
  const getReply = (query) => {
    const q = query.toLowerCase();
    if (q.includes("irrigation") || q.includes("पानी") || q.includes("पाणी")) {
      return t("chat_irrigation");
    }
    if (q.includes("fertilizer") || q.includes("खت") || q.includes("खाद")) {
      return t("chat_fertilizer");
    }
    if (q.includes("crop") || q.includes("फसल") || q.includes("पीक")) {
      return t("chat_crop");
    }
    if (q.includes("disease") || q.includes("रोग") || q.includes("आजार") || q.includes("pest") || q.includes("कीट")) {
      return t("chat_disease");
    }
    if (q.includes("weather") || q.includes("मौसम") || q.includes("हवामान")) {
      return t("chat_weather");
    }
    if (q.includes("market") || q.includes("बाजार") || q.includes("mandi")) {
      return t("chat_market");
    }
    if (q.includes("scheme") || q.includes("योजना")) {
      return t("chat_scheme");
    }
    return t("chat_non_farming");
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "you", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    resetTranscript(); // ✨ NEW: Clear the transcript after sending
    setTimeout(() => {
      const reply = getReply(input);
      setMessages((msgs) => [...msgs, { sender: "bot", text: reply }]);
    }, 600);
  };

  // ✨ NEW: Add a check for browser support
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">🤖 {t("action_chatbot")}</h2>
        <button onClick={onBack} className="px-3 py-1 bg-green-500 text-white rounded">
          {t("back") || "Back"}
        </button>
      </header>

      <div className="h-[70vh] overflow-y-auto mb-4 p-3 glass-card space-y-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[75%] ${
              m.sender === "bot" ? "bg-green-100 text-left" : "bg-blue-100 ml-auto text-right"
            }`}
          >
            <span className="text-sm">{m.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          className="flex-grow border rounded-l p-2"
          value={listening ? transcript : input} // ✨ UPDATED: Show transcript while listening
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat_placeholder") || "Ask your farming query..."}
        />
        {/* ✨ NEW: Microphone Button */}
        <button
          onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening()}
          className={`px-3 py-2 transition-colors ${listening ? 'bg-red-500 animate-pulse' : 'bg-gray-500'} text-white`}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>
        <button onClick={sendMessage} className="px-4 py-2 bg-green-600 text-white rounded-r">
          {t("send") || "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatbotScreen;