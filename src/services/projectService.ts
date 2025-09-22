import { databases, appwriteConfig } from '../lib/appwrite';
import { ID, Query } from 'appwrite';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'ongoing' | 'completed' | 'planning';
  location: string;
  beneficiaries: number;
  dateStarted: string;
  dateCompleted?: string;
  budget: number;
  raised: number;
}

interface ProjectDocument {
  $id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  location: string;
  beneficiaries: number;
  dateStarted: string;
  dateCompleted?: string;
  budget: number;
  raised: number;
}

export const projectService = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        [Query.orderDesc('$createdAt')]
      );
      return response.documents.map((doc) => ({
        id: doc.$id,
        title: (doc as unknown as ProjectDocument).title,
        description: (doc as unknown as ProjectDocument).description,
        image: (doc as unknown as ProjectDocument).image,
        status: (doc as unknown as ProjectDocument).status as 'ongoing' | 'completed' | 'planning',
        location: (doc as unknown as ProjectDocument).location,
        beneficiaries: (doc as unknown as ProjectDocument).beneficiaries,
        dateStarted: (doc as unknown as ProjectDocument).dateStarted,
        dateCompleted: (doc as unknown as ProjectDocument).dateCompleted,
        budget: (doc as unknown as ProjectDocument).budget,
        raised: (doc as unknown as ProjectDocument).raised,
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Create a new project
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    try {
      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        ID.unique(),
        project
      );
      return {
        id: response.$id,
        title: (response as unknown as ProjectDocument).title,
        description: (response as unknown as ProjectDocument).description,
        image: (response as unknown as ProjectDocument).image,
        status: (response as unknown as ProjectDocument).status as 'ongoing' | 'completed' | 'planning',
        location: (response as unknown as ProjectDocument).location,
        beneficiaries: (response as unknown as ProjectDocument).beneficiaries,
        dateStarted: (response as unknown as ProjectDocument).dateStarted,
        dateCompleted: (response as unknown as ProjectDocument).dateCompleted,
        budget: (response as unknown as ProjectDocument).budget,
        raised: (response as unknown as ProjectDocument).raised,
      };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update a project
  async updateProject(id: string, project: Omit<Project, 'id'>): Promise<Project> {
    try {
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        id,
        project
      );
      return {
        id: response.$id,
        title: (response as unknown as ProjectDocument).title,
        description: (response as unknown as ProjectDocument).description,
        image: (response as unknown as ProjectDocument).image,
        status: (response as unknown as ProjectDocument).status as 'ongoing' | 'completed' | 'planning',
        location: (response as unknown as ProjectDocument).location,
        beneficiaries: (response as unknown as ProjectDocument).beneficiaries,
        dateStarted: (response as unknown as ProjectDocument).dateStarted,
        dateCompleted: (response as unknown as ProjectDocument).dateCompleted,
        budget: (response as unknown as ProjectDocument).budget,
        raised: (response as unknown as ProjectDocument).raised,
      };
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(id: string): Promise<void> {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        id
      );
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};