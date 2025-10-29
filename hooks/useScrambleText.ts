
import { useState, useRef, useCallback } from 'react';

export const useScrambleText = (originalText: string) => {
    const [text, setText] = useState(originalText);
    const intervalRef = useRef<number | null>(null);
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    const scramble = useCallback(() => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            setText(prev => prev.split("").map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));

            if (iteration >= originalText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iteration += 1 / 3;
        }, 30);
    }, [originalText]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(originalText);
    }, [originalText]);

    return { text, scramble, reset };
};
