
import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
            <div className="w-full max-w-3xl bg-[#0d0d0d] border border-green-500/30 font-mono text-sm" onClick={e => e.stopPropagation()}>
                <header className="p-3 border-b border-green-500/30 flex justify-between items-center">
                    <h2 className="text-green-400 terminal-glow">CASE_FILE: {project.title}</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-white">[ close ]</button>
                </header>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="mb-4">
                        <h3 className="text-green-400 mb-2">// OBJECTIVE</h3>
                        <p className="text-gray-300 font-sans">{project.objective}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-green-400 mb-2">// IMPLEMENTATION_/_ATTACK_CHAIN</h3>
                        <ul className="space-y-1 text-gray-300">
                            {project.attackChain.map((step, index) => (
                                <li key={index} className="flex">
                                    <span className="text-green-600 mr-2">{`[STEP ${index + 1}]`}</span>
                                    <p className="font-sans flex-1">{step.substring(step.indexOf(' ') + 1)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-green-400 mb-2">// TOOLS_USED</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.toolsUsed.map(tool => (
                                <span key={tool} className="text-xs bg-green-900/50 text-green-300 py-1 px-2">{tool}</span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-green-400 mb-2">// BUSINESS_IMPACT_/_VALUE</h3>
                        <p className="text-gray-300 font-sans">{project.businessImpact}</p>
                    </div>
                     {project.githubLink && (
                        <div className="mb-4">
                             <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-sm bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 hover:bg-green-500/20 transition-all duration-300">
                                [ Access Source on GitHub ]
                            </a>
                        </div>
                    )}
                    <div>
                        <h3 className="text-green-400 mb-2">// STATUS</h3>
                        <p className="text-yellow-400">{project.status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
