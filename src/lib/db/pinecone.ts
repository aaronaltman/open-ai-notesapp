import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error("PINECONE_API_KEY is not defined");
}

const pinecone = new Pinecone({
  environment: "us-west1-gcp-free",
  apiKey,
});

export const notesIndex = pinecone.index("langchain-js");
