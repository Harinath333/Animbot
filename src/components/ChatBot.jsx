import { useState, useRef, useEffect } from "react";
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

const ChatBot = ({ selectedCharacter }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          waifu: selectedCharacter,
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      const aiMessage = {
        text: data.response,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full max-w-[600px] h-[70vh] bg-white/90 rounded-lg shadow-lg border border-gray-200 mx-auto overflow-hidden">
      {/* Bot Info Card */}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-4 shadow border text-base ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none border-blue-200"
                    : "bg-white text-gray-900 rounded-bl-none border-gray-200"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={characterInfo[selectedCharacter].avatar}
                      alt={characterInfo[selectedCharacter].name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium text-sm text-purple-700">
                      {characterInfo[selectedCharacter].name}
                    </span>
                  </div>
                )}
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div
              className="max-w-[75%] rounded-lg p-4 bg-white text-gray-900 rounded-bl-none shadow border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={characterInfo[selectedCharacter].avatar}
                  alt={characterInfo[selectedCharacter].name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-sm text-purple-700">
                  {characterInfo[selectedCharacter].name}
                </span>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-200 bg-white flex gap-4 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Chat with ${characterInfo[selectedCharacter].name}...`}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!input.trim()}
          className={`px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
            input.trim()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Send
        </motion.button>
      </form>
    </div>
  );
};

export default ChatBot;
