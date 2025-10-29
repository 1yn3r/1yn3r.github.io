
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onSelectProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
    const severityColors = {
        CRITICAL: "text-red-500",
        HIGH: "text-orange-500",
        MED: "text-yellow-500",
        INFO: "text-blue-400"
    };

    return (
        <div className="bg-black/30 border border-green-500/20 flex flex-col transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">
            <div className="p-4 border-b border-green-500/20">
                <p className="text-xs text-green-400">TYPE: {project.type.replace(/_/g, ' ')}</p>
                <h3 className="text-lg font-semibold text-white mt-1">{project.title}</h3>
            </div>
            <div className="p-4 flex-grow text-sm">
                <p className="text-gray-400 mb-4 font-sans">{project.description}</p>
                <h4 className="font-semibold text-gray-200 mb-2">KEY_FINDINGS/ACHIEVEMENTS:</h4>
                <ul className="space-y-1 text-gray-300">
                    {project.findings.map((finding, index) => (
                        <li key={index}>
                            <span className={severityColors[finding.severity] || 'text-gray-400'}>[{finding.severity}]</span> {finding.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4 mt-auto">
                <button onClick={() => onSelectProject(project)} className="w-full text-center bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 hover:bg-green-500/20 transition-all duration-300">
                    [ VIEW DETAILS ]
                </button>
            </div>
        </div>
    );
};
