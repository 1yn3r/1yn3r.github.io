export interface Skill {
    name: string;
    details: string;
}

export interface SkillCategory {
    title: string;
    skills: Skill[];
}

export interface ProjectFinding {
    severity: "CRITICAL" | "HIGH" | "MED" | "INFO";
    text: string;
}

export interface Project {
    id: number;
    type: string;
    title: string;
    description: string;
    findings: ProjectFinding[];
    objective: string;
    attackChain: string[];
    businessImpact: string;
    status: string;
    toolsUsed: string[];
    githubLink?: string;
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export interface Certification {
    name: string;
    issuer: string;
    verifyLink: string;
    // FIX: Changed icon type from React.FC<React.SVGProps<SVGSVGElement>> to React.ElementType.
    // This resolves a complex type error related to incompatible 'ref' properties,
    // likely caused by conflicting @types/react versions in the environment.
    icon: React.ElementType;
}

export interface ArsenalTool {
    name: string;
    description: string;
    // FIX: Changed icon type from React.FC<React.SVGProps<SVGSVGElement>> to React.ElementType.
    // This resolves a complex type error related to incompatible 'ref' properties,
    // likely caused by conflicting @types/react versions in the environment.
    icon: React.ElementType;
}
