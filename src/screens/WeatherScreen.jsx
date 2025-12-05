import React, { useEffect, useState, useMemo } from "react";

/**
 * WeatherScreen.jsx (Open-Meteo)
 * - NO REACT ROUTER
 * - Accepts `onBack` prop (from App.jsx)
 * - Always scrolls to top
 * - Back button calls onBack()
 */

const weatherCodeToText = (code) => {
  const mapping = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return mapping[code] ?? "Unknown";
};

const weatherEmoji = (code) => {
  if (code === null || code === undefined) return "🌤️";
  if ([0, 1].includes(code)) return "☀️";
  if ([2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
};

const SimpleLineChart = ({ points, labels }) => {
  if (!points || points.length === 0)
    return <div className="text-sm text-gray-500">No historical data.</div>;

  const W = 600;
  const H = 140;
  const pad = 24;

  const ys = points.map((p) => p.y).filter((v) => v !== null && !isNaN(v));
  if (ys.length === 0)
    return <div className="text-sm text-gray-500">No numeric historical data.</div>;

  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(1, maxY - minY);
  const stepX = (W - pad * 2) / ((points.length - 1) || 1);

  const pathD = points
    .map((p, i) => {
      const y =
        p.y === null || isNaN(p.y)
          ? H - pad
          : H - pad - ((p.y - minY) / span) * (H - pad * 2);
      const x = pad + i * stepX;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMinYMin meet">
      <g stroke="#eefaf0" strokeWidth="1">
        <line x1={pad} x2={W - pad} y1={pad} y2={pad} />
        <line x1={pad} x2={W - pad} y1={H / 2} y2={H / 2} />
        <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} />
      </g>
      <path
        d={pathD}
        fill="none"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((pt, i) => {
        const y =
          pt.y === null || isNaN(pt.y)
            ? H - pad
            : H - pad - ((pt.y - minY) / span) * (H - pad * 2);
        const x = pad + i * stepX;
        return <circle key={i} cx={x} cy={y} r={4} fill="#047857" />;
      })}
      {labels.map((lab, i) => {
        const x = pad + i * stepX;
        return (
          <text
            key={i}
            x={x}
            y={H - 4}
            fontSize="10"
            textAnchor="middle"
            fill="#065f46"
          >
            {lab}
          </text>
        );
      })}
    </svg>
  );
};

// ===== IMPORTANT: accept onBack prop here =====
const WeatherScreen = ({ onBack }) => {
  // Scroll to top when this component opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [past7, setPast7] = useState([]);
  const [locationName, setLocationName] = useState("");

  // get location
  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setErrorMsg("Location permission denied or unavailable.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Fetch forecast & current
  useEffect(() => {
    if (!coords) return;

    const fetchForecastAndCurrent = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const { lat, lon } = coords;

        const dailyFields = [
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_sum",
          "uv_index_max",
          "weathercode",
        ].join(",");

        const hourlyFields = [
          "temperature_2m",
          "relativehumidity_2m",
          "precipitation",
          "wind_speed_10m",
          "weathercode",
        ].join(",");

        const forecastUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&daily=${encodeURIComponent(dailyFields)}` +
          `&hourly=${encodeURIComponent(hourlyFields)}` +
          `&current_weather=true&timezone=auto`;

        const res = await fetch(forecastUrl);
        const data = await res.json();

        if (!data) {
          setErrorMsg("No forecast data returned.");
          setLoading(false);
          return;
        }

        // parse current
        if (data.current_weather) {
          setCurrent({
            temp: data.current_weather.temperature,
            wind: data.current_weather.windspeed,
            wind_dir: data.current_weather.winddirection,
            weathercode: data.current_weather.weathercode,
            time: data.current_weather.time
          });
        } else {
          setCurrent(null);
        }

        // parse daily
        const dailyParsed = [];
        const d = data.daily || {};
        const days = d.time || [];
        for (let i = 0; i < days.length; i++) {
          dailyParsed.push({
            date: days[i],
            temp_max: d.temperature_2m_max?.[i] ?? null,
            temp_min: d.temperature_2m_min?.[i] ?? null,
            precip: d.precipitation_sum?.[i] ?? 0,
            uv: d.uv_index_max?.[i] ?? null,
            code: d.weathercode?.[i] ?? null,
          });
        }
        setDaily(dailyParsed);

        // parse hourly
        const h = data.hourly || {};
        const hrTimes = h.time || [];
        const hourlyParsed = hrTimes.map((t, i) => ({
          time: t,
          temp: h.temperature_2m?.[i] ?? null,
          humidity: h.relativehumidity_2m?.[i] ?? null,
          precip: h.precipitation?.[i] ?? 0,
          wind: h.wind_speed_10m?.[i] ?? null,
          code: h.weathercode?.[i] ?? null,
        }));
        setHourly(hourlyParsed);

        setLocationName(`Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`);
      } catch (err) {
        console.error("Forecast fetch error", err);
        setErrorMsg("Failed to fetch forecast/current weather.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecastAndCurrent();
  }, [coords]);

  // Fetch past 7 days using archive endpoint
  useEffect(() => {
    if (!coords) return;

    const fetchPast7 = async () => {
      try {
        setLoading(true);
        const { lat, lon } = coords;

        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(now.getDate() - 1); // yesterday
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);

        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];

        const archiveDailyFields = ["temperature_2m_mean"].join(",");

        const url =
          `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}` +
          `&start_date=${start}&end_date=${end}` +
          `&daily=${encodeURIComponent(archiveDailyFields)}` +
          `&timezone=auto`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data || !data.daily) {
          if (data?.daily?.temperature_2m_max && data?.daily?.temperature_2m_min) {
            const tmax = data.daily.temperature_2m_max;
            const tmin = data.daily.temperature_2m_min;
            const days = data.daily.time || [];
            const parsed = days.map((d, i) => ({
              date: d,
              temp: (tmax[i] + tmin[i]) / 2
            }));
            setPast7(parsed);
          } else {
            const days = [];
            // const dt = new Date(startDate);
            for (let i = 0; i < 7; i++) {
              const dstr = new Date(startDate.getTime() + i * 24*60*60*1000).toISOString().split("T")[0];
              days.push({ date: dstr, temp: null });
            }
            setPast7(days);
          }
          return;
        }

        const daysArr = data.daily.time || [];
        const temps = data.daily.temperature_2m_mean || [];
        const parsed = daysArr.map((d, i) => ({ date: d, temp: temps?.[i] ?? null }));
        setPast7(parsed);
      } catch (err) {
        console.error("Archive fetch error", err);
        const tmp = [];
        const now = new Date();
        for (let i = 7; i >= 1; i--) {
          const dd = new Date(now);
          dd.setDate(now.getDate() - i);
          tmp.push({ date: dd.toISOString().split("T")[0], temp: null });
        }
        setPast7(tmp);
      } finally {
        setLoading(false);
      }
    };

    fetchPast7();
  }, [coords]);

  // Derived data for chart + slices
  const pastLabels = useMemo(() => past7.map(p => {
    try { const d = new Date(p.date); return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }); }
    catch { return p.date; }
  }), [past7]);

  const chartPoints = useMemo(() => {
    if (!past7 || past7.length === 0) return [];
    return past7.map((p, i) => ({ x: i, y: (p.temp == null ? null : Number(p.temp)) }));
  }, [past7]);

  const forecast16 = daily.slice(0, 16);

  const hourlyFuture = useMemo(() => {
    if (!hourly || hourly.length === 0) return [];
    const nowISO = new Date().toISOString();
    return hourly.filter(h => h.time >= nowISO).slice(0, 48);
  }, [hourly]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-2xl font-semibold text-green-700">Loading weather dashboard...</div>
          <p className="text-sm text-gray-500 mt-2">Fetching location and weather data (Open-Meteo)…</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="mt-3 text-gray-700">{errorMsg}</p>
            <div className="mt-4">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-green-600 text-white rounded">Retry</button>
              {/* use onBack prop */}
              <button onClick={onBack} className="ml-3 px-4 py-2 border rounded">Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render dashboard
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
       <header className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold text-green-700">🌦 Weather Dashboard</h1>

  <div className="flex items-center gap-3">
    <button
      onClick={onBack}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
    >
      ← Back to Dashboard
    </button>
  </div>
</header>


        {/* Current summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{locationName}</h2>
              <p className="text-gray-500">{current ? weatherCodeToText(current.weathercode) : "—"}</p>
              <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-6xl">{weatherEmoji(current?.weathercode)}</div>
              <div className="text-right">
                <div className="text-5xl font-bold text-gray-800">{current?.temp == null ? "--" : `${Math.round(current.temp)}°C`}</div>
                <div className="text-gray-500 mt-1">Wind: {current?.wind ?? "--"} km/h</div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-center">
                <div>
                  <div className="text-sm text-gray-500">Humidity</div>
                  <div className="text-lg font-semibold">{hourlyFuture?.[0]?.humidity ?? "--"}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Precip</div>
                  <div className="text-lg font-semibold">{hourlyFuture?.[0]?.precip ?? 0} mm</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">UV (daily)</div>
                  <div className="text-lg font-semibold">{daily?.[0]?.uv ?? "--"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast + Hourly */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 16-day forecast */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-4">📅 7-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {forecast16.length === 0 && <div className="text-sm text-gray-500">No forecast available</div>}
              {forecast16.map((d, i) => (
                <div key={i} className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600">{new Date(d.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div>
                  <div className="text-3xl mt-2">{weatherEmoji(d.code)}</div>
                  <div className="text-lg font-bold mt-1">{d.temp_max == null ? "--" : `${Math.round(d.temp_max)}°C`}</div>
                  <div className="text-sm text-gray-500">{d.precip ?? 0} mm</div>
                </div>
              ))}
            </div>
          </div>

          {/* hourly next 48 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-4">⏱ Next 48 hours</h3>
            <div className="flex gap-3 overflow-x-auto py-1">
              {hourlyFuture.length === 0 && <div className="text-sm text-gray-500">No hourly data</div>}
              {hourlyFuture.map((h, idx) => (
                <div key={idx} className="min-w-[110px] bg-green-50 rounded p-2 text-center">
                  <div className="text-sm text-gray-600">{new Date(h.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="text-2xl mt-1">{h.temp == null ? "--" : `${Math.round(h.temp)}°C`}</div>
                  <div className="text-sm">{h.precip ?? 0} mm</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past 7-day chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">📊 Past 7-Day Mean Temperatures</h3>
          <div className="w-full overflow-x-auto">
            <div style={{ minWidth: 600 }}>
              <SimpleLineChart points={chartPoints} labels={pastLabels} />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 mt-4">
            {past7.length === 0 && <div className="text-sm text-gray-500">No history available</div>}
            {past7.map((d, i) => (
              <div key={i} className="bg-green-50 p-3 rounded text-center">
                <div className="text-sm text-gray-600">{new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                <div className="text-lg font-semibold mt-2">{d.temp == null ? "--" : `${Math.round(d.temp)}°C`}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center py-8">
          Data source: Open-Meteo (forecast, current, hourly, archive). Units: Metric.
        </div>
      </div>
    </div>
  );
};

export default WeatherScreen;
