
import React from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

interface ScrambleHeaderProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    children: string;
}

export const ScrambleHeader: React.FC<ScrambleHeaderProps> = ({ as: Component = 'h2', children, ...props }) => {
    const { text, scramble, reset } = useScrambleText(children);
    return <Component onMouseEnter={scramble} onMouseLeave={reset} {...props}>{text}</Component>;
};
