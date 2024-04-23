"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import "@/app/styles/fonts.css";

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const sender = Math.random() < 0.5 ? "me" : "other";
    setMessages([...messages, { sender, text: input }]);
    setInput("");
  };

  const handleThemeChange = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <button
        onClick={handleThemeChange}
        className="self-end m-4 p-2 bg-blue-500 text-white rounded flex items-center"
      >
        {resolvedTheme === "dark" ? (
          <MdOutlineLightMode key="light" />
        ) : (
          <MdOutlineDarkMode key="dark" />
        )}
        <span className="ml-2">
          {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
      <div className="overflow-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-screen text-2xl big-center-text">
            Hi, Gaurav This side.
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "me" ? "justify-end" : ""}`}
            >
              <div className="m-4 p-2 rounded text-[var(--color-text)] bg-[var(--color-background)] inline-block">
                {message.text} {message.sender}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="m-2 flex px-10 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded text-[var(--color-text)]"
          placeholder="What you want to know about me?"
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
