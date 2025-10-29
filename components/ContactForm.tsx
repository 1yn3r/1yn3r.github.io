
import React, { useState } from 'react';
import { soundManager } from '../utils/soundManager';

export const ContactForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !message.trim()) {
            alert('Please fill out both email and message fields.');
            return;
        }
        soundManager.play('submit');
        
        const subject = encodeURIComponent("Contact from Portfolio - 1YN3R");
        const body = encodeURIComponent(`From: ${email}\n\n${message}`);
        
        window.location.href = `mailto:hc223390@gmail.com?subject=${subject}&body=${body}`;

        // Optionally reset form after a delay
        setTimeout(() => {
            setEmail('');
            setMessage('');
        }, 500);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono">
                <div>
                    <label className="text-green-400 text-sm" htmlFor="email">EMAIL:</label>
                    <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@gmail.com" 
                        className="mt-1 bg-black border border-green-500/30 rounded-none p-3 w-full focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(57,255,20,0.3)] transition-all" 
                        required 
                    />
                </div>
                <div>
                    <label className="text-green-400 text-sm" htmlFor="message">MESSAGE_BRIEF:</label>
                    <textarea 
                        id="message" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe testing requirements..." 
                        rows={5} 
                        className="mt-1 bg-black border border-green-500/30 rounded-none p-3 w-full focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(57,255,20,0.3)] transition-all" 
                        required
                    ></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-transparent border border-green-500 text-green-400 font-semibold py-3 px-12 hover:bg-green-500 hover:text-black transition-all duration-300 w-full md:w-auto">&gt; SEND_MESSAGE</button>
                </div>
            </form>
            <div className="mt-12 text-center font-mono text-sm text-gray-400">
                <h4 className="text-green-400 mb-2">// FOR_SECURE_COMMUNICATION</h4>
                <p>PGP Key Fingerprint:</p>
                <p className="text-gray-500 select-all">4A61 5253 4543 5552 4520 4B45 5920 4845 5245</p>
            </div>
        </div>
    );
};
