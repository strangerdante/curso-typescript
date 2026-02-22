export interface Lesson {
    id: string;
    title: string;
    practices: Practice[];
}

export interface Practice {
    id: string;
    title: string;
    theory: string; // Explicación teórica clara
    goal: string; // Objetivo específico de este ejercicio
    syntax: string[]; // Ejemplos de sintaxis relevantes para la práctica
    description: string; // Instrucciones de la misión
    initialCode: string;
    solutionCode?: string;
    isCompleted?: boolean;
    expectedOutput?: string;
    validations?: {
        pattern: string;
        flags?: string;
        negate?: boolean;
        message: string;
    }[];
}
