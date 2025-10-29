
import React, { useState, useEffect } from 'react';
import { SkillCategory } from '../types';

interface SkillDetailProps {
    text: string;
    speed?: number;
}

const SkillDetail: React.FC<SkillDetailProps> = ({ text, speed = 20 }) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        setDisplayText('');
        if (text) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text[i]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, speed);
            return () => clearInterval(interval);
        }
    }, [text, speed]);
    return <p className="text-xs text-gray-400 font-mono opacity-80 h-4">{displayText}</p>;
};

interface SkillCardProps {
    category: SkillCategory;
}

export const SkillCard: React.FC<SkillCardProps> = ({ category }) => {
    const [activeSkill, setActiveSkill] = useState<string | null>(null);

    return (
        <div className="bg-black/30 border border-green-500/20 rounded-none transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">
            <div className="p-3 border-b border-green-500/20 flex items-center gap-3">
                <h3 className="text-md font-bold text-green-400 font-mono">{category.title}</h3>
            </div>
            <div className="p-4">
                <ul className="space-y-2">
                    {category.skills.map((skill, index) => (
                        <li key={index} className="flex cursor-default" onMouseEnter={() => setActiveSkill(skill.name)} onMouseLeave={() => setActiveSkill(null)}>
                            <span className="text-green-400 font-mono mr-2">&gt;</span>
                            <div>
                                <h4 className="font-semibold text-gray-200">{skill.name}</h4>
                                <SkillDetail text={activeSkill === skill.name ? skill.details : ''} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
