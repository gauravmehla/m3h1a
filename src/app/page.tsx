"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const sender = Math.random() < 0.5 ? "me" : "other";
    setMessages([...messages, { sender, text: input }]);
    setInput("");
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <button
        onClick={handleThemeChange}
        className="self-end m-4 p-2 bg-blue-500 text-white rounded"
      >
        Switch Theme
      </button>
      <div className="overflow-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "me" ? "justify-end" : ""}`}
          >
            <div className="m-4 p-2 rounded text-[var(--color-text)] bg-[var(--color-background)] inline-block">
              {message.text} {message.sender}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="m-2 flex px-10 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded text-black"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="ml-2 flex-shrink-0 p-2 bg-blue-500 text-white rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
