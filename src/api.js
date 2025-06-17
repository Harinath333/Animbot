// src/utils/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://anime-bot-backend.onrender.com";

export const sendMessageToWaifu = async (userMessage, waifuType = "kawaii") => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, {
      message: userMessage,
      waifu: waifuType,
    });

    return response.data.reply;
  } catch (error) {
    console.error("Error sending message to waifu:", error);
    return "Oops! Waifu-chan couldn’t respond. Try again later~ 😔";
  }
};
