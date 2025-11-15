import React, { useEffect, useState } from "react";

const NewsSchemes = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = "pub_7e35b41a056849b48cfbdf89972ff9af";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=Agriculture`
        );

        const data = await response.json();
        console.log("API RESPONSE:", data);

        // API Error handling
        if (data.status === "error") {
          setErrorMsg(data.results?.message || "API error occurred");
          setNews([]);
        } 
        // Success - results is always an array
        else if (Array.isArray(data.results)) {
          setNews(data.results);
        } else {
          setErrorMsg("No news found");
          setNews([]);
        }
      } catch (err) {
        setErrorMsg("Failed to fetch news");
        console.error(err);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading) return <h2 className="text-xl p-4">Loading news...</h2>;
  if (errorMsg)
    return <h2 className="text-xl text-red-600 p-4 text-center">{errorMsg}</h2>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Latest Agriculture News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item, index) => (
          <div key={index} className="border p-4 shadow rounded-lg">
            
            {item.image_url && (
              <img
                src={item.image_url}
                alt="news"
                className="rounded mb-3"
              />
            )}

            <h2 className="font-bold text-lg">{item.title}</h2>

            <p className="text-gray-700 text-sm mt-2">
              {item.description || "No description available"}
            </p>

            <a
              href={item.link}
              target="_blank"
              className="text-blue-600 underline mt-3 block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSchemes;
