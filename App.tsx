
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { TypingAnimation } from './components/TypingAnimation';
import { ScrambleHeader } from './components/ScrambleHeader';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { ThreatAnalyzer } from './components/ThreatAnalyzer';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CommandBar } from './components/CommandBar';
import { soundManager } from './utils/soundManager';
import { ALL_SKILLS, PROJECTS_DATA, TIMELINE_DATA, CERTIFICATIONS_DATA, ARSENAL_TOOLS, HIGHLIGHTED_PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [activeSkillFilter, setActiveSkillFilter] = useState<string>('All');
    const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const skillCategories = ['All', ...ALL_SKILLS.map(cat => cat.title)];
    const projectTypes = ['All', ...[...new Set(PROJECTS_DATA.map(p => p.type))].map(type => type.replace(/_/g, ' '))];
    
    const handleCommand = (command: string) => {
        const [cmd, ...args] = command.trim().toLowerCase().split(' ');
        const target = args.join('');
        
        switch(cmd) {
            case 'goto':
            case 'cd':
                const element = document.getElementById(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn(`Section #${target} not found.`);
                }
                break;
            case 'ls':
            case 'dir':
                console.log("Available sections: #home, #about, #highlights, #timeline, #certifications, #skills, #arsenal, #projects, #ctfs, #analyzer, #contact");
                break;
            case 'help':
                console.log([
                    "Available commands:",
                    "  goto <section>  - Navigates to the specified section.",
                    "  open <site>     - Opens a social profile (github, linkedin, tryhackme).",
                    "  filter <type> <keyword> - Filters content (e.g., 'filter skills web', 'filter projects ad'). Use 'filter clear' to reset.",
                    "  ls              - Lists all available sections.",
                    "  help            - Shows this help message.",
                    "Use Arrow Up/Down for command history."
                ].join('\n'));
                break;
            case 'open':
                const socialLinks: { [key: string]: string } = {
                    github: "https://github.com/1yn3r",
                    linkedin: "https://linkedin.com/in/1yn3r",
                    tryhackme: "https://tryhackme.com/p/1yn3r",
                };
                if (socialLinks[target]) {
                    window.open(socialLinks[target], '_blank');
                } else {
                    console.warn(`Unknown site: ${target}. Available: github, linkedin, tryhackme.`);
                }
                break;
            case 'filter':
                const [type, ...keywordParts] = args;
                const keyword = keywordParts.join(' ');
                if (type === 'skills') {
                    const foundCategory = ALL_SKILLS.find(cat => cat.title.toLowerCase().includes(keyword));
                    setActiveSkillFilter(foundCategory ? foundCategory.title : 'All');
                } else if (type === 'projects') {
                     const foundType = projectTypes.find(pType => pType.toLowerCase().includes(keyword));
                     setActiveProjectFilter(foundType || 'All');
                } else if (type === 'clear') {
                    setActiveSkillFilter('All');
                    setActiveProjectFilter('All');
                } else {
                    console.warn("Usage: filter <skills|projects|clear> [keyword]");
                }
                break;
            default:
                console.warn(`Command not found: ${cmd}`);
        }
    };

    useEffect(() => {
        const unlockAudio = () => {
            soundManager.unlock();
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };
        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);

        const handleInteraction = (e: MouseEvent) => {
            if (e.target instanceof Element && e.target.closest('a, button')) {
                soundManager.play('click');
            }
        };
        document.addEventListener('click', handleInteraction);

        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            document.removeEventListener('click', handleInteraction);
        };
    }, []);

    if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

    const filteredSkills = ALL_SKILLS.filter(category => activeSkillFilter === 'All' || category.title === activeSkillFilter);
    const filteredProjects = PROJECTS_DATA.filter(project => activeProjectFilter === 'All' || project.type.replace(/_/g, ' ') === activeProjectFilter);

    return (
        <div id="home" className="bg-transparent text-gray-300">
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            <div className="min-h-screen">
                <Header />
                <main>
                    <section className="container mx-auto px-6 py-20 md:py-32 flex items-center justify-center min-h-screen">
                        <div className="w-full max-w-5xl text-center">
                            <div className="bg-black/50 border border-green-500/20 p-4">
                                <div className="bg-black/80 p-6 md:p-8">
                                    <div className="flex items-center mb-6"><span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span><span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span><span className="h-3 w-3 rounded-full bg-green-500"></span></div>
                                    <div className="flex flex-col md:flex-row items-center md:items-start text-left gap-8">
                                        <img 
                                            src="https://media.licdn.com/dms/image/v2/D5603AQGEDGsTjMR0BQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692039784157?e=1762992000&v=beta&t=SPR5-kSBzBnAaH5Qndl0upYJs5vMG4oc2FoHddcqLYo" 
                                            alt="1YN3R Avatar" 
                                            className="w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-green-500/50 shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                                            width="160"
                                            height="160"
                                            loading="lazy"
                                        />
                                        <div className="flex-1">
                                            <h1 className="font-mono text-2xl md:text-4xl text-white mb-2"><span className="text-green-400">$</span> Hoang Cuong</h1>
                                            <TypingAnimation lines={["./execute --profile pentester", "STATUS: Analyzing vulnerabilities...", "OBJECTIVE: Fortify digital assets."]} />
                                            <p className="font-sans text-base text-gray-400 mt-4 max-w-xl">
                                                A cybersecurity enthusiast and student at the Posts and Telecommunications Institute of Technology (PTIT). I am passionate about understanding how systems work, which drives me to explore both the art of building and the science of breaking them.
                                            </p>
                                            <div className="mt-8 flex flex-wrap gap-4">
                                                <a href="#contact" className="font-mono text-sm bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-2 hover:bg-green-500/20 transition-all duration-300">[ Initiate Contact ]</a>
                                                <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-sm bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-2 hover:bg-green-500/20 transition-all duration-300">[ Download CV ]</a>
                                                <a href="#projects" className="font-mono text-sm bg-gray-500/10 border border-gray-500/30 text-gray-300 px-6 py-2 hover:bg-gray-500/20 transition-all duration-300">[ Review Case Files ]</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section id="about" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12">
                            <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ DECRYPTING_IDENTITY: 1YN3R ]</ScrambleHeader>
                        </header>
                        <div className="max-w-3xl mx-auto bg-black/30 border border-green-500/20 p-6">
                            <h3 className="text-xl font-bold text-green-400 font-mono mb-3">//_MOTIVATION_&_PHILOSOPHY</h3>
                            <p className="text-gray-300 font-sans">
                                My journey into cybersecurity is fueled by a fundamental curiosity about the intricacies of technology. I operate with a dual mindset: I am as passionate about constructing secure, resilient systems as I am about deconstructing them to find their weaknesses. This "builder and breaker" perspective allows me to approach security challenges holistically. I believe the most effective way to defend a system is to understand the myriad ways it can be attacked. My goal is to leverage this comprehensive understanding to not just identify vulnerabilities, but to help build a more secure digital future.
                            </p>
                        </div>
                    </section>
                    
                    <section id="highlights" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12">
                            <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ MISSION_HIGHLIGHTS ]</ScrambleHeader>
                            <p className="mt-4 max-w-3xl mx-auto text-gray-400">A curated selection of key engagements showcasing diverse expertise and tangible impact.</p>
                        </header>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {HIGHLIGHTED_PROJECTS.map(project => (
                                <div key={project.id} className="bg-black/30 border border-green-500/20 flex flex-col transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                                    <div className="p-4 border-b border-green-500/20">
                                        <p className="text-xs text-green-400">TYPE: {project.type.replace(/_/g, ' ')}</p>
                                        <h3 className="text-lg font-semibold text-white mt-1">{project.title}</h3>
                                    </div>
                                    <div className="p-4 flex-grow">
                                        <p className="text-sm text-gray-400 font-sans mb-4">{project.description}</p>
                                        <div className="font-mono text-xs space-y-2">
                                            <p className="text-green-400">// IMPACT_METRIC</p>
                                            <p className="text-gray-300 pl-2">
                                              <span className="text-green-600">&gt; </span> 
                                              {project.id === 1 ? "Critical SQLi leading to data exposure" : project.id === 2 ? "Achieved full Domain Admin control" : "Built functional SOC monitoring stack"}
                                            </p>
                                            <p className="text-green-400">// KEY_TECH</p>
                                            <p className="text-gray-300 pl-2">
                                               <span className="text-green-600">&gt; </span> 
                                               {project.toolsUsed.slice(0, 3).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 mt-auto">
                                        <button onClick={() => setSelectedProject(project)} className="w-full text-center bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 hover:bg-green-500/20 transition-all duration-300 font-mono text-sm">
                                            [ VIEW_FULL_REPORT ]
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="timeline" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12">
                            <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ MISSION_TIMELINE ]</ScrambleHeader>
                            <p className="mt-4 max-w-3xl mx-auto text-gray-400">Key milestones and strategic shifts in my cybersecurity career.</p>
                        </header>
                        <div className="max-w-3xl mx-auto">
                            <div className="relative border-l-2 border-green-500/20 pl-8 space-y-12">
                                {TIMELINE_DATA.map((item, index) => (
                                    <div key={index} className="relative timeline-item">
                                        <div className="bg-black/30 border border-green-500/20 p-6">
                                            <p className="font-mono text-green-400 text-sm mb-1">{item.year}</p>
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="certifications" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12">
                            <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ VALIDATED_CREDENTIALS ]</ScrambleHeader>
                            <p className="mt-4 max-w-3xl mx-auto text-gray-400">Industry-recognized certifications demonstrating practical and theoretical expertise.</p>
                        </header>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                            {CERTIFICATIONS_DATA.map(cert => (
                                <div key={cert.name} className="bg-black/30 border border-green-500/20 p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                                     <div className="w-20 h-20 text-green-400 mb-4">
                                        {cert.icon ? <cert.icon className="w-full h-full" /> : null}
                                    </div>
                                    <h3 className="text-lg font-bold text-white font-mono">{cert.name}</h3>
                                    <p className="text-gray-400 font-mono text-sm mb-4">{cert.issuer}</p>
                                    <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer" className="mt-auto w-full text-center bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 hover:bg-green-500/20 transition-all duration-300 font-mono text-sm">
                                        [ VERIFY ]
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="skills" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12"><ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ SKILL_MATRIX ]</ScrambleHeader><p className="mt-4 max-w-3xl mx-auto text-gray-400">Technical domains, frameworks, and tools, from web application security to network and Active Directory exploitation.</p></header>
                        <div className="flex justify-center flex-wrap gap-2 mb-8 font-mono text-sm">
                            {skillCategories.map(category => <button key={category} onClick={() => setActiveSkillFilter(category)} className={`capitalize px-4 py-1 border transition-all duration-200 ${activeSkillFilter === category ? 'bg-green-500 text-black border-green-500' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}>{category.replace(/ & /g, ' & ')}</button>)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredSkills.map((category) => <SkillCard key={category.title} category={category} />)}</div>
                    </section>

                     <section id="arsenal" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12">
                            <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ ARSENAL: KEY_TOOLS ]</ScrambleHeader>
                            <p className="mt-4 max-w-3xl mx-auto text-gray-400">A selection of core tools I leverage in offensive and defensive operations.</p>
                        </header>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
                            {ARSENAL_TOOLS.map(tool => (
                                <div key={tool.name} className="group relative bg-black/30 border border-green-500/20 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                                    <div className="w-16 h-16 text-green-400 mb-4 transition-transform duration-300 group-hover:scale-110">
                                        {tool.icon ? <tool.icon className="w-full h-full" /> : null}
                                    </div>
                                    <h3 className="font-mono text-white font-semibold">{tool.name}</h3>
                                    <div className="absolute inset-0 bg-black/90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <p className="text-xs text-gray-300">{tool.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <section id="projects" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12"><ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ CASE_FILES: ENGAGEMENT_LOGS ]</ScrambleHeader><p className="mt-4 max-w-2xl mx-auto text-gray-400">Anonymized summaries of recent projects and outcomes, spanning offensive and defensive operations.</p></header>
                        <div className="flex justify-center flex-wrap gap-2 mb-8 font-mono text-sm">
                            {projectTypes.map(type => <button key={type} onClick={() => setActiveProjectFilter(type)} className={`capitalize px-4 py-1 border transition-all duration-200 ${activeProjectFilter === type ? 'bg-green-500 text-black border-green-500' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}>{type}</button>)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">{filteredProjects.map(project => <ProjectCard key={project.id} project={project} onSelectProject={setSelectedProject} />)}</div>
                    </section>
                    
                    <section id="ctfs" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12">
                            <ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ INTEL_FEED: RECENT_CTFS ]</ScrambleHeader>
                            <p className="mt-4 max-w-3xl mx-auto text-gray-400">
                                Simulated feed of recent Capture The Flag accomplishments, demonstrating continuous hands-on learning and problem-solving.
                            </p>
                        </header>
                        <div className="max-w-3xl mx-auto bg-black/30 border border-green-500/20 p-6 font-mono">
                            <p className="text-green-400 mb-4">&gt; fetching latest solved challenges...</p>
                            <ul className="space-y-3 text-sm">
                                <li><span className="text-green-500 mr-2">[+]</span> <span className="text-yellow-400">[Easy]</span> Network Privelege Escalation - Rooted 'Blue' on HTB.</li>
                                <li><span className="text-green-500 mr-2">[+]</span> <span className="text-orange-500">[Medium]</span> Web App SQLi to RCE - Solved 'Lame' on HTB.</li>
                                <li><span className="text-green-500 mr-2">[+]</span> <span className="text-yellow-400">[Easy]</span> Reverse Engineering Challenge - Cracked 'CrackMe' on THM.</li>
                                <li><span className="text-gray-500 mr-2">[...]</span> (Older write-ups available on GitHub)</li>
                            </ul>
                            <div className="text-center mt-8">
                                <a href="https://github.com/1yn3r/ctf-writeups" target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-lg bg-green-500/10 border border-green-500/30 text-green-400 px-8 py-3 hover:bg-green-500/20 transition-all duration-300">
                                    [ Access Full Write-up Archive ]
                                </a>
                            </div>
                        </div>
                    </section>

                    <ThreatAnalyzer />

                    <section id="contact" className="container mx-auto px-6 py-20">
                        <header className="text-center mb-12"><ScrambleHeader as="h2" className="text-3xl md:text-4xl font-bold text-white font-mono terminal-glow">[ OPEN_SECURE_CHANNEL ]</ScrambleHeader><p className="mt-4 text-gray-400 max-w-2xl mx-auto">Initiate a confidential consultation. Avoid sending sensitive data through this channel.</p></header>
                        <ContactForm />
                    </section>
                </main>
                <Footer />
            </div>
            <CommandBar onCommand={handleCommand} />
        </div>
    );
};

export default App;
