/**
 * Appwrite Service
 * Handles all communication with Appwrite backend
 */

import { Client, Databases, Storage, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);
const storage = new Storage(client);
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';
const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'images';

// Appwrite's free plan blocks image transformations: every /preview URL returns
// 403 "storage_image_transformations_blocked". Serve the original file via /view.
export function toViewUrl(url: string): string {
  if (!url || !url.includes('/storage/buckets/') || !/\/preview(\?|$)/.test(url)) return url;
  const u = new URL(url);
  u.pathname = u.pathname.replace(/\/preview$/, '/view');
  const project = u.searchParams.get('project');
  u.search = project ? `?project=${project}` : '';
  return u.toString();
}

// Types for our data
export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo?: string;
  primaryDonationUrl: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage: string;
}

export interface MissionSection {
  title: string;
  missionImage: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

export interface MissionItem {
  text: string;
  icon: string;
  order: number;
}

export interface NGOSection {
  title: string;
  description: string;
}

export interface InfoCard {
  title: string;
  description: string;
  backgroundImage: string;
  iconImage: string;
  order: number;
}

export interface BannerSection {
  sectionKey: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  location: string;
  image: string;
  description: string;
  email?: string;
  order: number;
}

export interface NoMoreItem {
  category: string;
  description: string;
  order: number;
}

// Service functions
export class AppwriteService {
  // Get site settings
  static async getSiteSettings(): Promise<SiteSettings> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        'site_settings',
        'site_settings'
      );
      return response as unknown as SiteSettings;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      // Return default values
      return {
        siteName: 'Hopely Uganda',
        tagline: 'Empowering communities, transforming lives, creating hope for children in Uganda',
        logo: '/logo.png',
        primaryDonationUrl: 'https://gofund.me/266a82aa',
        email: 'info@hopelyuganda.org',
        phone: '+256 772081010',
        address: 'Kampala, Uganda',
        instagramUrl: '#',
        facebookUrl: '#',
        twitterUrl: '#',
      };
    }
  }

  // Get hero content
  static async getHeroContent(): Promise<HeroContent> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        'hero_content',
        'hero_content'
      );
      return response as unknown as HeroContent;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return {
        title: 'Welcome to Hopely Uganda',
        subtitle: 'Together, we can make a difference in the lives of children and communities across Uganda',
        buttonText: 'Donate Now',
        buttonUrl: 'https://gofund.me/266a82aa',
        backgroundImage: '/img/IMG_4149.webp',
      };
    }
  }

  // Get mission section
  static async getMissionSection(): Promise<MissionSection> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        'mission_section',
        'mission_section'
      );
      return response as unknown as MissionSection;
    } catch (error) {
      console.error('Error fetching mission section:', error);
      return {
        title: 'Our Mission',
        missionImage: '/img/hope.jpg',
        ctaButtonText: 'Join Us',
        ctaButtonUrl: 'https://gofund.me/266a82aa',
      };
    }
  }

  // Get mission items
  static async getMissionItems(): Promise<MissionItem[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'mission_items',
        [],
        // Order by the 'order' field
      );
      return response.documents.map(doc => doc as unknown as MissionItem).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching mission items:', error);
      return [
        { text: 'Provide quality education to underprivileged children', icon: '📚', order: 1 },
        { text: 'Ensure access to clean water and sanitation', icon: '💧', order: 2 },
        { text: 'Promote health and wellness programs', icon: '🏥', order: 3 },
        { text: 'Support sustainable community development', icon: '🌱', order: 4 },
      ];
    }
  }

  // Get NGO section
  static async getNGOSection(): Promise<NGOSection> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        'ngo_section',
        'ngo_section'
      );
      return response as unknown as NGOSection;
    } catch (error) {
      console.error('Error fetching NGO section:', error);
      return {
        title: 'About Hopely Uganda',
        description: 'Hopely Uganda is a non-profit organization dedicated to improving the lives of children and communities in Uganda.',
      };
    }
  }

  // Get info cards
  static async getInfoCards(): Promise<InfoCard[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'info_cards'
      );
      return response.documents
        .map(doc => doc as unknown as InfoCard)
        .map(c => ({ ...c, backgroundImage: toViewUrl(c.backgroundImage), iconImage: toViewUrl(c.iconImage) }))
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching info cards:', error);
      return [];
    }
  }

  // Get banner sections
  static async getBannerSection(sectionKey: string): Promise<BannerSection | null> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        'banner_sections',
        sectionKey
      );
      return response as unknown as BannerSection;
    } catch (error) {
      console.error(`Error fetching banner section ${sectionKey}:`, error);
      return null;
    }
  }

  // Get team members
  static async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'team_members'
      );
      const members = response.documents
        .map(doc => doc as unknown as TeamMember)
        .map(m => ({ ...m, image: toViewUrl(m.image) }))
        .sort((a, b) => a.order - b.order);
      console.log('Retrieved team members:', members);
      return members;
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  // Get no more items
  static async getNoMoreItems(): Promise<NoMoreItem[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'no_more_items'
      );
      return response.documents.map(doc => doc as unknown as NoMoreItem).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching no more items:', error);
      // Return default values if collection doesn't exist
      return [
        { category: "hunger", description: "Aid projects are empowering the vulnerable, ensuring no child goes hungry. Your donation helps us provide food and nutrition.", order: 1 },
        { category: "illiteracy", description: "Education for all. Regardless of gender or background, we support children to stay in school and succeed.", order: 2 },
        { category: "disease", description: "Healthcare prevents disease and enables children to thrive. We provide access to medical care and health education.", order: 3 }
      ];
    }
  }

  // ==================== UPDATE FUNCTIONS ====================

  // Update site settings
  static async updateSiteSettings(data: SiteSettings): Promise<SiteSettings> {
    try {
      // Try to update existing document
      const response = await databases.updateDocument(
        DATABASE_ID,
        'site_settings',
        'site_settings',
        data
      );
      return response as unknown as SiteSettings;
    } catch (error: unknown) {
      // If document doesn't exist, create it
      if (error && typeof error === 'object' && 'code' in error && error.code === 404) {
        const response = await databases.createDocument(
          DATABASE_ID,
          'site_settings',
          'site_settings',
          data
        );
        return response as unknown as SiteSettings;
      }
      throw error;
    }
  }

  // Update hero content
  static async updateHeroContent(data: HeroContent): Promise<HeroContent> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        'hero_content',
        'hero_content',
        data
      );
      return response as unknown as HeroContent;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 404) {
        const response = await databases.createDocument(
          DATABASE_ID,
          'hero_content',
          'hero_content',
          data
        );
        return response as unknown as HeroContent;
      }
      throw error;
    }
  }

  // Update mission section
  static async updateMissionSection(data: MissionSection): Promise<MissionSection> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        'mission_section',
        'mission_section',
        data
      );
      return response as unknown as MissionSection;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 404) {
        const response = await databases.createDocument(
          DATABASE_ID,
          'mission_section',
          'mission_section',
          data
        );
        return response as unknown as MissionSection;
      }
      throw error;
    }
  }

  // Update NGO section
  static async updateNGOSection(data: NGOSection): Promise<NGOSection> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        'ngo_section',
        'ngo_section',
        data
      );
      return response as unknown as NGOSection;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 404) {
        const response = await databases.createDocument(
          DATABASE_ID,
          'ngo_section',
          'ngo_section',
          data
        );
        return response as unknown as NGOSection;
      }
      throw error;
    }
  }

  // ==================== MISSION ITEMS CRUD ====================

  // Create mission item
  static async createMissionItem(data: MissionItem): Promise<MissionItem & { $id: string }> {
    const response = await databases.createDocument(
      DATABASE_ID,
      'mission_items',
      ID.unique(),
      data
    );
    return response as unknown as MissionItem & { $id: string };
  }

  // Update mission item
  static async updateMissionItem(id: string, data: Partial<MissionItem>): Promise<MissionItem> {
    const response = await databases.updateDocument(
      DATABASE_ID,
      'mission_items',
      id,
      data
    );
    return response as unknown as MissionItem;
  }

  // Delete mission item
  static async deleteMissionItem(id: string): Promise<void> {
    await databases.deleteDocument(DATABASE_ID, 'mission_items', id);
  }

  // Save all mission items (handles create/update/delete)
  static async saveMissionItems(items: (MissionItem & { $id?: string })[]): Promise<void> {
    // Get existing items
    const existingResponse = await databases.listDocuments(DATABASE_ID, 'mission_items');
    const existingIds = new Set(existingResponse.documents.map(doc => doc.$id));
    const newIds = new Set(items.filter(item => item.$id).map(item => item.$id));

    // Delete items that are no longer in the list
    for (const doc of existingResponse.documents) {
      if (!newIds.has(doc.$id)) {
        await databases.deleteDocument(DATABASE_ID, 'mission_items', doc.$id);
      }
    }

    // Update or create items
    for (const item of items) {
      const { $id, ...data } = item;
      if ($id && existingIds.has($id)) {
        await databases.updateDocument(DATABASE_ID, 'mission_items', $id, data);
      } else {
        await databases.createDocument(DATABASE_ID, 'mission_items', ID.unique(), data);
      }
    }
  }

  // ==================== INFO CARDS CRUD ====================

  // Create info card
  static async createInfoCard(data: InfoCard): Promise<InfoCard & { $id: string }> {
    const response = await databases.createDocument(
      DATABASE_ID,
      'info_cards',
      ID.unique(),
      data
    );
    return response as unknown as InfoCard & { $id: string };
  }

  // Update info card
  static async updateInfoCard(id: string, data: Partial<InfoCard>): Promise<InfoCard> {
    const response = await databases.updateDocument(
      DATABASE_ID,
      'info_cards',
      id,
      data
    );
    return response as unknown as InfoCard;
  }

  // Delete info card
  static async deleteInfoCard(id: string): Promise<void> {
    await databases.deleteDocument(DATABASE_ID, 'info_cards', id);
  }

  // Save all info cards
  static async saveInfoCards(items: (InfoCard & { $id?: string })[]): Promise<void> {
    const existingResponse = await databases.listDocuments(DATABASE_ID, 'info_cards');
    const existingIds = new Set(existingResponse.documents.map(doc => doc.$id));
    const newIds = new Set(items.filter(item => item.$id).map(item => item.$id));

    for (const doc of existingResponse.documents) {
      if (!newIds.has(doc.$id)) {
        await databases.deleteDocument(DATABASE_ID, 'info_cards', doc.$id);
      }
    }

    for (const item of items) {
      const { $id, ...data } = item;
      if ($id && existingIds.has($id)) {
        await databases.updateDocument(DATABASE_ID, 'info_cards', $id, data);
      } else {
        await databases.createDocument(DATABASE_ID, 'info_cards', ID.unique(), data);
      }
    }
  }

  // ==================== TEAM MEMBERS CRUD ====================

  // Create team member
  static async createTeamMember(data: TeamMember): Promise<TeamMember & { $id: string }> {
    const response = await databases.createDocument(
      DATABASE_ID,
      'team_members',
      ID.unique(),
      data
    );
    return response as unknown as TeamMember & { $id: string };
  }

  // Update team member
  static async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    const response = await databases.updateDocument(
      DATABASE_ID,
      'team_members',
      id,
      data
    );
    return response as unknown as TeamMember;
  }

  // Delete team member
  static async deleteTeamMember(id: string): Promise<void> {
    await databases.deleteDocument(DATABASE_ID, 'team_members', id);
  }

  // Save all team members
  static async saveTeamMembers(items: (TeamMember & { $id?: string })[]): Promise<void> {
    console.log('saveTeamMembers called with:', items);
    const existingResponse = await databases.listDocuments(DATABASE_ID, 'team_members');
    const existingIds = new Set(existingResponse.documents.map(doc => doc.$id));
    const newIds = new Set(items.filter(item => item.$id).map(item => item.$id));

    console.log('Existing IDs in DB:', Array.from(existingIds));
    console.log('IDs from items:', Array.from(newIds));

    for (const doc of existingResponse.documents) {
      if (!newIds.has(doc.$id)) {
        console.log('Deleting document:', doc.$id);
        await databases.deleteDocument(DATABASE_ID, 'team_members', doc.$id);
      }
    }

    for (const item of items) {
      const { $id, ...data } = item;
      console.log('Processing item:', { $id, data });
      if ($id && existingIds.has($id)) {
        console.log('Updating document:', $id, data);
        await databases.updateDocument(DATABASE_ID, 'team_members', $id, data);
      } else {
        console.log('Creating new document:', data);
        await databases.createDocument(DATABASE_ID, 'team_members', ID.unique(), data);
      }
    }
  }

  // ==================== NO MORE ITEMS CRUD ====================

  // Save all no more items
  static async saveNoMoreItems(items: (NoMoreItem & { $id?: string })[]): Promise<void> {
    try {
      const existingResponse = await databases.listDocuments(DATABASE_ID, 'no_more_items');
      const existingIds = new Set(existingResponse.documents.map(doc => doc.$id));
      const newIds = new Set(items.filter(item => item.$id).map(item => item.$id));

      for (const doc of existingResponse.documents) {
        if (!newIds.has(doc.$id)) {
          await databases.deleteDocument(DATABASE_ID, 'no_more_items', doc.$id);
        }
      }

      for (const item of items) {
        const { $id, ...data } = item;
        if ($id && existingIds.has($id)) {
          await databases.updateDocument(DATABASE_ID, 'no_more_items', $id, data);
        } else {
          await databases.createDocument(DATABASE_ID, 'no_more_items', ID.unique(), data);
        }
      }
    } catch (error) {
      console.error('Error saving no more items:', error);
      throw error;
    }
  }

  // ==================== IMAGE UPLOAD ====================

  // Upload an image to Appwrite Storage
  static async uploadImage(file: File): Promise<string> {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      
      // Get the file preview URL (more reliable for images)
      // Using getFilePreview instead of getFileView for better compatibility
      const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, response.$id);
      
      // Appwrite SDK v18+ returns the preview URL as a string
      console.log('Uploaded image URL:', fileUrl);
      return fileUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Get file view URL for a file ID
  static getFileViewUrl(fileId: string): string {
    return storage.getFileView(STORAGE_BUCKET_ID, fileId);
  }

  // Delete an image from Appwrite Storage
  static async deleteImage(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw - file might already be deleted
    }
  }

  // Extract file ID from Appwrite storage URL
  static getFileIdFromUrl(url: string): string | null {
    try {
      // URL format: https://[endpoint]/v1/storage/buckets/[bucketId]/files/[fileId]/view
      const match = url.match(/\/files\/([^/]+)\/(?:view|preview)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }
}

export default AppwriteService;
