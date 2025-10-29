
import React, { useState, useRef, useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

interface CommandBarProps {
    onCommand: (command: string) => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({ onCommand }) => {
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const command = inputValue.trim();
        if (!command) return;
        soundManager.play('submit');
        onCommand(command);
        if (history[history.length - 1] !== command) {
            setHistory(prev => [...prev, command]);
        }
        setHistoryIndex(history.length);
        setInputValue('');
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInputValue(history[newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = Math.min(history.length - 1, historyIndex + 1);
                setHistoryIndex(newIndex);
                setInputValue(history[newIndex] || '');
            } else if (historyIndex === history.length - 1) {
                 setHistoryIndex(history.length);
                 setInputValue('');
            }
        }
    };
    
    useEffect(() => {
        const focusInput = (e: KeyboardEvent) => {
             if((e.code === 'Space' || e.key === ' ') && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if(inputRef.current) {
                   inputRef.current.focus();
                }
            }
        }
        window.addEventListener('keydown', focusInput);
        return () => window.removeEventListener('keydown', focusInput);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-t border-green-500/30">
            <form onSubmit={handleFormSubmit} className="container mx-auto px-6 py-2 flex items-center font-mono text-sm">
                <span className="text-green-400 mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none text-gray-300 w-full focus:outline-none"
                    placeholder="Type a command (or press spacebar to focus)... `help` for options"
                />
            </form>
        </div>
    );
};
