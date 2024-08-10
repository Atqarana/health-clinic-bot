import { AstraDB } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import 'dotenv/config';
import OpenAI from 'openai';
import { SimilarityMetric } from "../app/hooks/useConfiguration";
import fs from 'fs';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Destructure environment variables
const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT, ASTRA_DB_NAMESPACE } = process.env;

// Initialize AstraDB client
const astraDb = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT, ASTRA_DB_NAMESPACE);

// Define text splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

// Define similarity metrics
const similarityMetrics: SimilarityMetric[] = [
  'cosine',
  'euclidean',
  'dot_product',
];

// Load health clinic data from data.json
const loadHealthClinicData = () => {
  const data = fs.readFileSync('./data.json', 'utf8');
  return JSON.parse(data);
};

// Function to create collection in AstraDB
const createCollection = async (similarity_metric: SimilarityMetric = 'cosine') => {
  try {
    const res = await astraDb.createCollection(`chat_${similarity_metric}`, {
      vector: {
        dimension: 1536,
        metric: similarity_metric,
      }
    });
    console.log(res);
  } catch (e) {
    console.log(`chat_${similarity_metric} already exists`);
  }
};

// Function to load health clinic data into AstraDB
const loadDataIntoCollection = async (similarity_metric: SimilarityMetric = 'cosine') => {
  const collection = await astraDb.collection(`chat_${similarity_metric}`);
  const healthClinicData = loadHealthClinicData();
  
  let i = 0;
  for (const doctor of healthClinicData) {
    const content = JSON.stringify(doctor); // Use the entire doctor data as content
    const chunks = await splitter.splitText(content);

    for (const chunk of chunks) {
      const { data } = await openai.embeddings.create({ input: chunk, model: 'text-embedding-ada-002' });

      const res = await collection.insertOne({
        document_id: `doctor-${i}`,
        $vector: data[0]?.embedding,
        content: chunk,
        ...doctor // Spread doctor data into the document
      });
      i++;
    }
  }
  console.log('Health clinic data loaded');
};

// Create collections and load data
similarityMetrics.forEach(metric => {
  createCollection(metric).then(() => loadDataIntoCollection(metric));
});
