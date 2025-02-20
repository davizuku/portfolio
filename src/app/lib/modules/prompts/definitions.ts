
export type PromptId = number;

export type Prompt = {
    id?: PromptId;
    name: string;
    content: string;
    updatedAt?: Date;
};
