"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import "@/app/styles/fonts.css";
import "@/app/styles/mkdwn.css";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState<
    { sender: string; prompt: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rplyWaiting, setRplyWaiting] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (messages.length >= 10) {
      alert(
        "You have reached the maximum number of messages in this session. Please reload the page to start a new session."
      );
      return;
    }

    try {
      const generateRef = collection(db, "generate");
      const docRef = await addDoc(generateRef, { sender: "me", prompt: input });
      console.log("Document successfully written!");
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", prompt: input },
      ]);
      setRplyWaiting(true);

      const unSub = onSnapshot(docRef, (doc) => {
        let res = doc.data() ?? {};
        console.log("Current data: ", res);
        if (res.status?.state === "COMPLETED") {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "other", prompt: res.response },
          ]);
          setRplyWaiting(false);
        } else if (res.status?.state === "ERROR") {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "other", prompt: "I am sorry, please try again." },
          ]);
          setRplyWaiting(false);
        }
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }

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
              <div
                className={`m-4 p-2 rounded text-[var(--color-text)] inline-block ${
                  message.sender === "me"
                    ? "bg-red-600"
                    : "bg-[var(--color-background)]"
                }`}
              >
                <ReactMarkdown>{message.prompt}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {rplyWaiting && (
          <div className="m-4 p-2 loading-animation">
            <em>Thinking...</em>
          </div>
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
