
import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const bootSequence = [
        'INITIATING_CONNECTION...',
        'BYPASSING_FIREWALL...',
        'AUTHENTICATING_USER: 1YN3R...',
        'DECRYPTING_DATA_STREAM...',
        '[ACCESS_GRANTED]',
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[index]]);
                soundManager.play('type');
                index++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-[#0d0d0d] z-50 flex items-center justify-center">
            <div className="w-full max-w-2xl font-mono text-green-400 p-4">
                {lines.map((line, i) => (
                    <p key={i} className="terminal-glow">
                        <span className="text-green-600">&gt; </span>{line}
                    </p>
                ))}
                <span className="blinking-cursor">_</span>
            </div>
        </div>
    );
};
