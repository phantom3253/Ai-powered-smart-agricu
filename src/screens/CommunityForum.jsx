import React, { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

const CommunityForum = ({ onBack, lang, languages }) => {
  const { t } = useTranslation(lang);
  const [posts, setPosts] = useState([
    { user: "Farmer A", text: "How to increase wheat yield?", lang: "en" },
    { user: "किसान बी", text: "धान के लिए कौन सा उर्वरक अच्छा है?", lang: "hi" },
  ]);
  const [input, setInput] = useState("");
  const [postLang, setPostLang] = useState(lang || "en");

  const handlePost = () => {
    if (!input.trim()) return;
    setPosts([...posts, { user: "You", text: input, lang: postLang }]);
    setInput("");
  };

  const visible = posts.filter((p) => p.lang === (lang || postLang));

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">👥 {t("community_heading")}</h2>
        <button
          onClick={onBack}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          {t("back") || "Back"}
        </button>
      </header>

      <div className="mb-4">
        <label className="text-sm">{t("posting_language")}</label>
        <select
          value={postLang}
          onChange={(e) => setPostLang(e.target.value)}
          className="ml-2 border rounded p-1"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 space-y-2">
        {visible.length ? (
          visible.map((p, idx) => (
            <div key={idx} className="border p-2 rounded bg-gray-100">
              <strong>{p.user}:</strong> {p.text}
            </div>
          ))
        ) : (
          <div className="text-gray-500">{t("no_posts")}</div>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder={t("write_something")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2 rounded-l"
        />
        <button
          onClick={handlePost}
          className="px-4 bg-green-600 text-white rounded-r"
        >
          {t("post") || "Post"}
        </button>
      </div>
    </div>
  );
};

export default CommunityForum;
