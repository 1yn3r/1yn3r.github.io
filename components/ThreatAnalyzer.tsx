
import React, { useState, useEffect, useRef } from 'react';
import { analyzeThreat } from '../services/threatAnalysisService';
import { soundManager } from '../utils/soundManager';
import { ScrambleHeader } from './ScrambleHeader';

export const ThreatAnalyzer: React.FC = () => {
    const [history, setHistory] = useState<string[]>([
        "AI Threat Analyzer [Version 1.1.0]",
        "Copyright (c) 2024 1YN3R. All rights reserved.",
        "Enter 'help' to see available commands."
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const streamResponse = (response: string) => {
        let currentIndex = 0;
        setHistory(prev => [...prev, '']);
        const interval = setInterval(() => {
            if (currentIndex < response.length) {
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] += response[currentIndex];
                    return newHistory;
                });
                currentIndex++;
            } else {
                clearInterval(interval);
                setIsProcessing(false);
            }
        }, 10);
    };

    const handleCommand = async (command: string) => {
        const newHistory = [...history, `> ${command}`];
        setHistory(newHistory);
        const [cmd, ...args] = command.trim().split(' ');
        const target = args.join(' ');
        
        switch (cmd.toLowerCase()) {
            case 'analyze':
                if (!target) {
                    setHistory(prev => [...prev, 'Error: Missing target for analysis. Usage: analyze <target_description>']);
                    setIsProcessing(false);
                    return;
                }
                setHistory(prev => [...prev, '[+] Initializing scan engine...', '[*] Probing target...', '[!] Potential vector identified...']);
                try {
                    const analysisResult = await analyzeThreat(target);
                    streamResponse(analysisResult);
                } catch (error: any) {
                    const errorMessage = `[!] ANALYSIS FAILED\n\n---\nERROR: ${error.message}\n---\n\n### DEBUGGING_SUGGESTIONS:\n1. Check network connection simulation ('network error').\n2. Verify input is not malformed ('bad request').\n3. The analysis service might be temporarily unavailable.`;
                    streamResponse(errorMessage);
                }
                break;
            case 'help':
                setHistory(prev => [...prev, "Available commands:\n  analyze <target> - Analyzes a target description for vulnerabilities.\n  clear            - Clears the terminal screen.\n  help             - Shows this help message."]);
                setIsProcessing(false);
                break;
            case 'clear':
                setHistory([]);
                setIsProcessing(false);
                break;
            default:
                setHistory(prev => [...prev, `'${cmd}' is not recognized as an internal or external command.`]);
                setIsProcessing(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isProcessing) return;
        soundManager.play('submit');
        setIsProcessing(true);
        handleCommand(inputValue);
        setInputValue('');
    };

    return (
        <section id="analyzer" className="container mx-auto px-6 py-20 bg-black/30 border-y border-green-500/20">
            <header className="text-center mb-12">
                <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ INTERACTIVE_ANALYSIS_TERMINAL ]</ScrambleHeader>
                <p className="mt-4 text-gray-400 max-w-3xl mx-auto">Powered by a simulated Gemini engine. Use the `analyze` command to scan a code snippet or application description for potential vulnerabilities. Do not enter sensitive data.</p>
            </header>
            <div className="max-w-4xl mx-auto font-mono bg-black border border-green-500/30 p-4 h-96 flex flex-col">
                <div ref={terminalRef} className="flex-grow overflow-y-auto pr-2">
                    {history.map((line, index) => (
                        <p key={index} className={`whitespace-pre-wrap text-sm ${line.startsWith('>') ? 'text-green-400' : 'text-gray-300'}`}>{line}</p>
                    ))}
                    {isProcessing && <div className="terminal-output"><p></p></div>}
                </div>
                <form onSubmit={handleFormSubmit} className="flex items-center mt-2">
                    <span className="text-green-400 mr-2">&gt;</span>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isProcessing}
                        className="bg-transparent border-none text-gray-300 w-full focus:outline-none"
                        placeholder="Type a command..."
                    />
                </form>
            </div>
        </section>
    );
};
