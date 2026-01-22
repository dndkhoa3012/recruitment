"use client";
import React, { useState } from "react";
import { MessageCircle, X, Bot, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn? (Đặt bàn, Menu, Sự kiện...)' }
    ]);
    const [inputValue, setInputValue] = useState("");

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (isBotOpen) setIsBotOpen(false);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
        const userInput = inputValue;
        setInputValue("");

        // Simulate bot response
        setTimeout(() => {
            let reply = "Cảm ơn bạn đã liên hệ. Nhân viên sẽ phản hồi sớm nhất!";
            if (userInput.toLowerCase().includes("đặt bàn")) {
                reply = "Bạn muốn đặt bàn cho bao nhiêu người và vào thời gian nào ạ?";
            } else if (userInput.toLowerCase().includes("menu") || userInput.toLowerCase().includes("thực đơn")) {
                reply = "Bạn có thể xem thực đơn chi tiết tại trang Menu của chúng tôi.";
            } else if (userInput.toLowerCase().includes("sự kiện")) {
                reply = "Tuần này chúng tôi có Full Moon Party vào tối thứ 6. Bạn có quan tâm không?";
            }
            setMessages(prev => [...prev, { type: 'bot', text: reply }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* AI Bot Chat Window */}
            <AnimatePresence>
                {isBotOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-[320px] sm:w-[380px] h-[500px] flex flex-col overflow-hidden mb-2"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full">
                                    <Bot size={20} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Airwave AI Assistant</h3>
                                    <span className="flex items-center gap-1 text-[10px] text-green-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setIsBotOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-3">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-primary text-slate-900 font-medium rounded-tr-sm'
                                            : 'bg-white border border-slate-200 text-slate-600 rounded-tl-sm shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-slate-100 bg-white">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-slate-900"
                                />
                                <button type="submit" className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-primary hover:text-slate-900 transition-colors">
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List of Actions */}
            <AnimatePresence>
                {isOpen && !isBotOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="flex flex-col gap-3 items-end mb-2"
                    >
                        {/* Zalo */}
                        <a
                            href="https://zalo.me/0912345678"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white pl-4 pr-3 py-2 rounded-full shadow-lg border border-blue-50 hover:bg-blue-50 transition-colors group"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">Chat Zalo</span>
                            <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                                <span className="font-extrabold text-xs">Zalo</span>
                            </div>
                        </a>

                        {/* Messenger */}
                        <a
                            href="https://m.me/airwavesbeachclub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white pl-4 pr-3 py-2 rounded-full shadow-lg border border-blue-50 hover:bg-blue-50 transition-colors group"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">Messenger</span>
                            <div className="size-10 rounded-full bg-[#0084FF] flex items-center justify-center text-white shadow-md">
                                <MessageCircle size={20} fill="currentColor" strokeWidth={0} />
                            </div>
                        </a>

                        {/* AI Bot Trigger */}
                        <button
                            onClick={() => setIsBotOpen(true)}
                            className="flex items-center gap-3 bg-white pl-4 pr-3 py-2 rounded-full shadow-lg border border-green-50 hover:bg-green-50 transition-colors group"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-green-600">Trợ lý AI</span>
                            <div className="size-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md">
                                <Bot size={20} />
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={toggleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`size-16 rounded-full shadow-2xl flex items-center justify-center relative transition-colors duration-300 ${isOpen ? 'bg-slate-900' : 'bg-primary'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={28} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <MessageCircle size={28} className="text-slate-900" strokeWidth={2.5} />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
