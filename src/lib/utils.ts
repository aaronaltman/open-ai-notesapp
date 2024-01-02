import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getEmbedding } from "./openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getEmbeddingForNote(title: string, content: string) {
  return getEmbedding(title + "\n\n " + content);
}
