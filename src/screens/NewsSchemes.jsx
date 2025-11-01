import React, { useEffect, useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

const NEWS_API_KEY = "YOUR_NEWS_API_KEY_HERE";
const NEWS_QUERY = "agriculture OR farming OR crops OR farmers";

const fallbackNews = [
  { title: "Local mandi prices steady this week", source: "Local News", url: "#" },
  { title: "Tips: Protect crops from early frost", source: "Agri Tips", url: "#" },
];

const fallbackSchemes = [
  { title: "PM-KISAN Samman Nidhi", link: "https://pmkisan.gov.in" },
  { title: "Agriculture Infrastructure Fund", link: "https://agriwelfare.gov.in" },
];

const NewsSchemes = ({ onBack, lang }) => {
  const { t } = useTranslation(lang);
  const [news, setNews] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        if (NEWS_API_KEY !== "YOUR_NEWS_API_KEY_HERE") {
          const res = await fetch(
            `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(NEWS_QUERY)}&pageSize=6&apiKey=${NEWS_API_KEY}`
          );
          const json = await res.json();
          if (json && json.articles) {
            setNews(json.articles.map((a) => ({ title: a.title, source: a.source.name, url: a.url })));
          } else {
            setNews(fallbackNews);
          }
        } else {
          setNews(fallbackNews);
        }
      } catch {
        setNews(fallbackNews);
      }

      setSchemes(fallbackSchemes);
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700 headline-glow">📰 {t("news_heading")}</h2>
        <button onClick={onBack} className="px-3 py-1 bg-green-500 text-white rounded">
          Back
        </button>
      </header>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Top Headlines</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-3">
            {news.map((n, idx) => (
              <a key={idx} href={n.url} target="_blank" rel="noreferrer" className="block p-3 glass-card hover:shadow-lg">
                <div className="text-sm font-semibold">{n.title}</div>
                <div className="text-xs text-gray-500 mt-1">{n.source}</div>
              </a>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-semibold mb-2">{t("schemes_heading")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {schemes.map((s, i) => (
            <a key={i} href={s.link} target="_blank" rel="noreferrer" className="p-3 glass-card hover:scale-[1.01]">
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-gray-500 mt-1">Official</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsSchemes;
