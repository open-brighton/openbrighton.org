"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import FeatureFlags from "../FeatureFlags";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "user", text: "Hi there!" },
    { sender: "bot", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Tell me about OpenBrighton." },
    {
      sender: "bot",
      text: "OpenBrighton is a community-driven organization focused on open collaboration and innovation in Brighton.",
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm<{ message: string }>({
    mode: "onChange",
    defaultValues: { message: "" },
  });
  const input = watch("message");
  // Patch register to capture the ref
  const { ref: rhfRef, ...restRegister } = register("message", {
    required: true,
  });
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-grow textarea when input changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Helper async delay function
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = useCallback(
    async (data: { message: string }) => {
      setMessages((prev) => [...prev, { sender: "user", text: data.message }]);
      setSubmitting(true);
      reset();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
      await delay(1200);
      setSubmitting(false);
    },
    [reset]
  );

  if (!FeatureFlags.chat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Chat is currently disabled.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md flex flex-col h-[70vh] rounded shadow-lg overflow-hidden">
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-[var(--background)]">
          <h1 className="text-2xl font-bold text-center">AI Chatbot</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 ">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] text-sm shadow
                  ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form
          className="flex items-center gap-2 p-4 border-t border-gray-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 min-h-[64px] max-h-40 resize-none"
            rows={4}
            ref={(el) => {
              textareaRef.current = el;
              rhfRef(el);
            }}
            autoComplete="off"
            style={{ maxHeight: "160px", overflowY: "auto" }}
            disabled={submitting}
            {...restRegister}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // Only submit if not disabled or submitting
                if (!submitting && isValid && input?.trim()) {
                  (e.target as HTMLTextAreaElement).form?.requestSubmit();
                }
              }
            }}
          />
          <button
            type="submit"
            className="p-2 rounded bg-blue-500 text-white shadow hover:bg-blue-600 transition-colors disabled:opacity-60 flex items-center justify-center"
            disabled={!isValid || !input?.trim() || submitting}
            aria-label="Send"
          >
            {submitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <FaArrowRight className="text-lg" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
