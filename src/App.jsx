import React, { useState, useEffect } from "react";
import { useTranslation, TRANSLATIONS } from "./i18n/useTranslation";
import { INDIAN_LANGUAGES } from "./i18n/languages";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import {
  UserCircleIcon,
  CloudIcon,
  BugAntIcon,
  CircleStackIcon,
  NewspaperIcon,
  ChatBubbleLeftRightIcon,
  QueueListIcon,
  CloudArrowUpIcon,
  CalculatorIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import SensorCard from "./components/SensorCard";
import ActionButton from "./components/ActionButton";
import Team from "./components/Team";
import LanguageSelector from "./screens/LanguageSelector";
import HeaderCard from "./components/HeaderCard";
import Alerts from "./components/Alerts";
import Logo from "./components/Logo";
import SkeletonCard from "./components/SkeletonCard";

import ChatbotScreen from "./screens/ChatbotScreen";
import FertilizerCalculator from "./screens/FertilizerCalculator";
import CropAdvisor from "./screens/CropAdvisor";
import PlantDiagnosis from "./screens/PlantDiagnosis";
import MarketScreen from "./screens/MarketScreen";
import CommunityForum from "./screens/CommunityForum";
import ProfileScreen from "./screens/ProfileScreen";
import WeatherScreen from "./screens/WeatherScreen";
import NewsSchemes from "./screens/NewsSchemes";

// ==================== DASHBOARD COMPONENT ====================
const Dashboard = ({ t, onScreenSelect, sensorData, activeAlerts, profileData, isLoading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div>
      <Alerts alerts={activeAlerts} t={t} />
      <HeaderCard t={t} profileData={profileData} />

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* ========== SENSOR DATA SECTION ========== */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {t("readings_header")}
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              Array.from({ length: 7 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              [
                { title: t("moisture"), value: sensorData.moisture.toFixed(1), unit: t("unit_percent"), icon: "moisture" },
                { title: t("temperature"), value: sensorData.temperature.toFixed(1), unit: t("unit_celsius"), icon: "temperature" },
                { title: t("humidity"), value: sensorData.humidity.toFixed(1), unit: t("unit_percent"), icon: "humidity" },
                { title: t("soil_ph"), value: sensorData.ph.toFixed(1), unit: "", icon: "ph" },
                { title: t("nitrogen"), value: sensorData.nitrogen.toFixed(0), unit: t("unit_kg_ha"), icon: "nitrogen" },
                { title: t("phosphorus"), value: sensorData.phosphorus.toFixed(0), unit: t("unit_kg_ha"), icon: "phosphorus" },
                { title: t("potassium"), value: sensorData.potassium.toFixed(0), unit: t("unit_kg_ha"), icon: "potassium" },
              ].map((item) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <SensorCard {...item} />
                </motion.div>
              ))
            )}
          </motion.div>

          {/* ========== ACTION BUTTONS ========== */}
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {t("actions_heading")}
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: t("action_irrigate"), Icon: CloudArrowUpIcon, onClick: () => toast.success("Irrigation triggered!"), color: "blue" },
              { label: t("action_market"), Icon: CircleStackIcon, onClick: () => onScreenSelect("market"), color: "orange" },
              { label: t("action_news"), Icon: NewspaperIcon, onClick: () => onScreenSelect("news"), color: "purple" },
              { label: t("action_chatbot"), Icon: SparklesIcon, onClick: () => onScreenSelect("chatbot"), color: "teal" },
              { label: t("action_calculator"), Icon: CalculatorIcon, onClick: () => onScreenSelect("calculator"), color: "rose" },
              { label: t("action_diagnosis"), Icon: BugAntIcon, onClick: () => onScreenSelect("diagnosis"), color: "indigo" },
              { label: t("action_advisor"), Icon: QueueListIcon, onClick: () => onScreenSelect("advisor"), color: "green" },
              { label: t("action_community"), Icon: ChatBubbleLeftRightIcon, onClick: () => onScreenSelect("community"), color: "cyan" },
              { label: t("action_weather"), Icon: CloudIcon, onClick: () => onScreenSelect("weather"), color: "amber" },
            ].map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <ActionButton {...item} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========== RIGHT-SIDE PANEL (TIPS + MARKET + FORECAST) ========== */}
        <aside className="flex flex-col gap-6 mt-2">
          <div className="card-style bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <div className="p-5">
              <h3 className="text-lg font-bold text-green-800 flex items-center gap-2 mb-3">
                🌱 {t("farming_tips")}
              </h3>
              <ul className="list-disc ml-5 text-sm text-green-900 leading-relaxed space-y-2">
                <li>{t("tip1")}</li>
                <li>{t("tip2")}</li>
                <li>{t("tip3")}</li>
                <li>{t("tip4")}</li>
              </ul>
            </div>
          </div>
          <div className="card-style bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
            <div className="p-5">
              <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2 mb-3">
                📊 {t("market_trends")}
              </h3>
              <ul className="list-disc ml-5 text-sm text-blue-900 leading-relaxed space-y-2">
                <li>{t("market_tip1")}</li>
                <li>{t("market_tip2")}</li>
                <li>{t("market_tip3")}</li>
              </ul>
            </div>
          </div>
          <div className="card-style bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200">
            <div className="p-5">
              <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2 mb-3">
                🌦️ {t("forecast")}
              </h3>
              <ul className="list-none text-sm text-yellow-900 leading-relaxed space-y-2 font-medium">
                <li><strong>{t("today")}:</strong> {t("forecast_today")}</li>
                <li><strong>{t("tomorrow")}:</strong> {t("forecast_tomorrow")}</li>
                <li><strong>{t("day3")}:</strong> {t("forecast_day3")}</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
function App() {
  const [lang, setLang] = useState(null);
  const { t } = useTranslation(lang || "en");
  const [screen, setScreen] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "Farmer",
    location: "Atal Nagar, Chhattisgarh",
    cropType: "crop_wheat",
    soilType: "soil_black",
  });
  const [sensorData, setSensorData] = useState({
    moisture: 45, temperature: 29, humidity: 70, ph: 6.8,
    nitrogen: 132, phosphorus: 45, potassium: 190,
  });
  const [activeAlerts, setActiveAlerts] = useState([]);

  useEffect(() => {
    // Simulate initial data load
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lang) {
      const defaultName = TRANSLATIONS[lang]?.default_farmer_name || TRANSLATIONS.en.default_farmer_name;
      const defaultLocation = TRANSLATIONS[lang]?.default_location || TRANSLATIONS.en.default_location;
      setProfileData(prev => ({ ...prev, name: defaultName, location: defaultLocation }));
    }
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prevData) => ({
        moisture: Math.max(0, Math.min(100, prevData.moisture + (Math.random() * 4 - 2))),
        temperature: Math.max(-5, Math.min(50, prevData.temperature + (Math.random() * 2 - 1))),
        humidity: Math.max(0, Math.min(100, prevData.humidity + (Math.random() * 3 - 1.5))),
        ph: Math.max(5, Math.min(8.5, prevData.ph + (Math.random() * 0.2 - 0.1))),
        nitrogen: Math.max(100, Math.min(200, prevData.nitrogen + (Math.random() * 4 - 2))),
        phosphorus: Math.max(30, Math.min(70, prevData.phosphorus + (Math.random() * 2 - 1))),
        potassium: Math.max(150, Math.min(250, prevData.potassium + (Math.random() * 6 - 3))),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newAlerts = [];
    if (sensorData.moisture < 30) newAlerts.push({ id: "low_moisture", type: "critical", messageKey: "alert_low_moisture" });
    if (sensorData.ph > 7.5) newAlerts.push({ id: "high_ph", type: "warning", messageKey: "alert_high_ph" });
    if (sensorData.nitrogen < 120) newAlerts.push({ id: "low_nitrogen", type: "warning", messageKey: "alert_low_nitrogen" });
    setActiveAlerts(newAlerts);
  }, [sensorData]);

  if (!lang) {
    return <LanguageSelector onSelect={(code) => setLang(code)} />;
  }

  const handleLanguageChange = (e) => setLang(e.target.value);
  const screenProps = {
    onBack: () => setScreen("dashboard"), lang, profileData, setProfileData, sensorData,
  };

  const renderScreen = () => {
    const motionProps = {
      key: screen,
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
      transition: { duration: 0.3 },
    };
    switch (screen) {
      case "profile": return <motion.div {...motionProps}><ProfileScreen {...screenProps} /></motion.div>;
      case "chatbot": return <motion.div {...motionProps}><ChatbotScreen {...screenProps} /></motion.div>;
      case "calculator": return <motion.div {...motionProps}><FertilizerCalculator {...screenProps} /></motion.div>;
      case "advisor": return <motion.div {...motionProps}><CropAdvisor {...screenProps} /></motion.div>;
      case "diagnosis": return <motion.div {...motionProps}><PlantDiagnosis {...screenProps} /></motion.div>;
      case "market": return <motion.div {...motionProps}><MarketScreen {...screenProps} /></motion.div>;
      case "community": return <motion.div {...motionProps}><CommunityForum {...screenProps} languages={INDIAN_LANGUAGES} /></motion.div>;
      case "weather": return <motion.div {...motionProps}><WeatherScreen {...screenProps} /></motion.div>;
      case "news": return <motion.div {...motionProps}><NewsSchemes {...screenProps} /></motion.div>;
      default:
        return (
          <motion.div {...motionProps}>
            <Dashboard {...{ t, onScreenSelect: setScreen, sensorData, activeAlerts, profileData, isLoading }} />
          </motion.div>
        );
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23d1fae5' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Toaster position="top-center" />

        <header className="mb-8 p-4 sm:p-5 flex justify-between items-center bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-4">
            <Logo className="h-14 w-14" />
            <div>
              <h1 className="text-3xl font-bold">Kisan Mitra</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <select
              value={lang}
              onChange={handleLanguageChange}
              className="bg-white/20 border border-white/30 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-white/50 outline-none appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
              }}
            >
              {INDIAN_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="text-black">{l.name}</option>
              ))}
            </select>
            <button
              onClick={() => setScreen("profile")}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title={t('action_profile')}
            >
              <UserCircleIcon className="h-8 w-8" />
            </button>
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
        </main>

        <div className="mt-20 border-t pt-12">
          <Team />
        </div>
      </div>
    </div>
  );
}

export default App;

