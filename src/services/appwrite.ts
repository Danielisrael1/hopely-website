/**
 * Appwrite Service
 * Handles all communication with Appwrite backend
 */

import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';

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
        missionImage: '/mission.jpg',
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
      return response.documents.map(doc => doc as unknown as InfoCard).sort((a, b) => a.order - b.order);
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
      return response.documents.map(doc => doc as unknown as TeamMember).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }
}

export default AppwriteService;
