import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const Chatbot = () => {
    const { userInfo } = useAuth();
    
    const initializeMessages = () => {
        try {
            const savedMessages = sessionStorage.getItem('chatbotMessages');
            if (savedMessages) {
                return JSON.parse(savedMessages);
            }
        } catch (error) {
            console.error("Gagal memuat pesan dari sessionStorage:", error);
        }
        return [{ sender: 'bot', text: 'Halo! Saya MateBot, asisten virtual Anda. Ada yang bisa saya bantu?' }];
    };

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initializeMessages);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        try {
            sessionStorage.setItem('chatbotMessages', JSON.stringify(messages));
        } catch (error) {
            console.error("Gagal menyimpan pesan ke sessionStorage:", error);
        }
    }, [messages]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !userInfo) return;

        const userMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const historyForAPI = newMessages
                .filter(msg => msg.text !== 'Maaf, terjadi kesalahan. Coba lagi nanti.')
                .map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }));

            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/chatbot`,
                { prompt: input, history: historyForAPI },
                config
            );

            const botMessage = { sender: 'bot', text: data.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Maaf, terjadi kesalahan. Coba lagi nanti.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    if (!userInfo) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none z-50"
            >
                {isOpen ? <X /> : <MessageSquare />}
            </button>
            
            {isOpen && (
                <div className="fixed bottom-0 right-0 w-full h-[85vh] rounded-t-2xl 
                                md:bottom-24 md:right-5 md:w-[400px] md:h-[500px] md:rounded-lg 
                                bg-white shadow-2xl flex flex-col z-50 transition-transform duration-300 ease-in-out">
                    <header className="bg-indigo-600 text-white p-3 flex items-center justify-between rounded-t-lg md:rounded-t-lg">
                        <div className="flex items-center">
                            <Bot className="mr-2"/>
                            <h3 className="font-semibold">MateBot Support</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-indigo-500 focus:outline-none">
                            <X size={20} />
                        </button>
                    </header>
                    <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] break-words inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                         {loading && (
                            <div className="my-2 flex justify-start">
                                <span className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
                                    <span className="animate-pulse">...</span>
                                </span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </main>
                    <footer className="p-2 border-t flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={onKeyPress}
                            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ketik pesan Anda..."
                            disabled={loading}
                        />
                        <button onClick={handleSend} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 h-full rounded-r-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center">
                            <Send size={20}/>
                        </button>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;
