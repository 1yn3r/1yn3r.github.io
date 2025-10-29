
import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/soundManager';

interface TypingAnimationProps {
    lines: string[];
    speed?: number;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({ lines, speed = 50 }) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const soundPlayedRef = useRef(false);

    useEffect(() => {
        if (currentLineIndex < lines.length) {
            const line = lines[currentLineIndex];
            if (displayText.length < line.length) {
                soundPlayedRef.current = false;
                const timeout = setTimeout(() => {
                    setDisplayText(line.substring(0, displayText.length + 1));
                    soundManager.play('type');
                }, speed);
                return () => clearTimeout(timeout);
            } else {
                if (!soundPlayedRef.current) {
                    soundPlayedRef.current = true;
                    const timeout = setTimeout(() => {
                        setCurrentLineIndex(currentLineIndex + 1);
                        setDisplayText('');
                    }, 1000);
                    return () => clearTimeout(timeout);
                }
            }
        } else {
            setIsComplete(true);
        }
    }, [displayText, currentLineIndex, lines, speed]);

    return (
        <p className="font-mono text-lg md:text-xl text-green-400 terminal-glow">
            {isComplete ? lines[lines.length - 1] : displayText}
            <span className="blinking-cursor">_</span>
        </p>
    );
};
