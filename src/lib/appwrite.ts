import { Client, Account, Databases } from 'appwrite';

// Appwrite configuration
export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '',
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '',
  projectsCollectionId: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || '',
};

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

export default client;