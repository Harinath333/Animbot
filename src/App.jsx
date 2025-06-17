import ChatBot from "./components/ChatBot";
import AnimeBackground from "./components/AnimeBackground";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const characterInfo = {
  kawaii: {
    name: "Kawaii",
    emoji: "🌸",
    color: "#FF69B4",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=kawaii",
    description: "Sweet and cute anime girl",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-300",
  },
  tsundere: {
    name: "Tsundere",
    emoji: "⚡",
    color: "#FF4500",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=tsundere",
    description: "Hot-headed but secretly caring",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
  },
  catgirl: {
    name: "Catgirl",
    emoji: "🐱",
    color: "#9370DB",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=catgirl",
    description: "Playful and mischievous",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
  },
  senpai: {
    name: "Senpai",
    emoji: "👓",
    color: "#4169E1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=senpai",
    description: "Wise and caring mentor",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
  },
  yandere: {
    name: "Yandere",
    emoji: "🔪",
    color: "#C71585",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=yandere",
    description: "Obsessive, sweet, but a little scary!",
    bgColor: "bg-pink-200",
    borderColor: "border-pink-400",
  },
  kuudere: {
    name: "Kuudere",
    emoji: "❄️",
    color: "#00BFFF",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=kuudere",
    description: "Cool, calm, and collected.",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400",
  },
  genki: {
    name: "Genki Girl",
    emoji: "☀️",
    color: "#FFD700",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=genki",
    description: "Energetic and always cheerful!",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-400",
  },
  oneesan: {
    name: "Onee-san",
    emoji: "🧡",
    color: "#FF8C00",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=oneesan",
    description: "Caring big sister type.",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-400",
  },
  idol: {
    name: "Idol",
    emoji: "🎤",
    color: "#FF69B4",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=idol",
    description: "Sparkly, positive, and always encouraging!",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-400",
  },
  gyaru: {
    name: "Gyaru",
    emoji: "💅",
    color: "#FFB6C1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gyaru",
    description: "Trendy, sassy, and fun-loving!",
    bgColor: "bg-pink-200",
    borderColor: "border-pink-500",
  },
};

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState("catgirl");
  const [isCharacterPanelOpen, setIsCharacterPanelOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-tl from-pink-100 via-purple-100 to-indigo-100 relative overflow-hidden">
      <AnimeBackground />
      {/* Header */}
      <header className="w-full text-center pt-8 pb-2">
        <h1 className="text-4xl font-bold text-pink-600 mb-1 drop-shadow">Anime AI-chan Chat <span className="align-middle">✨</span></h1>
        <p className="text-lg text-gray-500">Your personal anime companion</p>
      </header>
      {/* Waifu Persona Selector Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCharacterPanelOpen(true)}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/95 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <img
          src={characterInfo[selectedCharacter].avatar}
          alt={characterInfo[selectedCharacter].name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-gray-700">
          {characterInfo[selectedCharacter].name}
        </span>
        <span className="text-xl">{characterInfo[selectedCharacter].emoji}</span>
      </motion.button>
      {/* Waifu Persona Selector Modal */}
      <AnimatePresence>
        {isCharacterPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-2"
            onClick={() => setIsCharacterPanelOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(characterInfo).map(([key, char]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCharacter(key);
                      setIsCharacterPanelOpen(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 text-center ${
                      selectedCharacter === key
                        ? `${char.bgColor} ${char.borderColor}`
                        : "border-transparent hover:border-gray-200 bg-gray-50"
                    }`}
                  >
                    <img
                      src={char.avatar}
                      alt={char.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-700">{char.name}</div>
                      <div className="text-xs text-gray-500">{char.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main Content */}
      <main className="flex justify-center items-center w-full min-h-[70vh]">
        <ChatBot selectedCharacter={selectedCharacter} />
      </main>
    </div>
  );
}

export default App;

