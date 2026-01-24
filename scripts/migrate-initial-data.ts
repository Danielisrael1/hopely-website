/**
 * Data Migration Script - Populate Initial CMS Content
 *
 * This script migrates your current hardcoded content into Appwrite
 * Run with: npx tsx scripts/migrate-initial-data.ts
 */

import dotenv from 'dotenv';
import { Client, Databases, ID } from 'appwrite';

// Load environment variables
dotenv.config();

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '');

// Add JWT for server-side operations (if API key is available)
if (process.env.VITE_APPWRITE_API_KEY) {
  client.setJWT(process.env.VITE_APPWRITE_API_KEY);
}

const databases = new Databases(client);
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';

// Initial data based on current hardcoded content
const initialData = {
  siteSettings: {
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
  },

  heroContent: {
    title: 'Hopely Uganda',
    subtitle: 'Empowering communities, transforming lives, creating hope for children in Uganda',
    buttonText: 'DONATE',
    buttonUrl: 'https://gofund.me/266a82aa',
    backgroundImage: '/img/IMG_4149.webp',
  },

  missionSection: {
    title: 'Join in our mission',
    missionImage: '/img/hope.jpg',
    ctaButtonText: 'Join Us',
    ctaButtonUrl: 'https://gofund.me/266a82aa',
  },

  missionItems: [
    {
      text: 'Donate directly, whether regular or one-off',
      icon: '/icons/gift.png',
      order: 1,
    },
    {
      text: 'Volunteer your time or skills',
      icon: '/icons/volunteer.png',
      order: 2,
    },
    {
      text: 'Help us reach more children in need',
      icon: '/icons/infocards/heart.png',
      order: 3,
    },
    {
      text: 'Share our mission with your network',
      icon: '/icons/send.png',
      order: 4,
    },
  ],

  ngoSection: {
    title: 'Non-Governmental Organization',
    description: 'Hopely supports underprivileged children across Uganda, giving them hope for a better future by providing them with access to education, food, and clothing. Our goal is to save as many lives as possible and ensure a bright future for those who are below the breadline. We envision a Uganda without hunger, illiteracy, or disease, where every child can reach their full potential.',
  },

  infoCards: [
    {
      title: 'Your Donation',
      description: 'We are hoping to have people across the world to help us in our mission to make children have a better future.',
      backgroundImage: '/img/coin-donation.jpg',
      iconImage: '/icons/infocards/heart.png',
      order: 1,
    },
    {
      title: 'Complete Projects',
      description: 'We provide updates on completed and ongoing projects, ensuring transparency and impact in our community work.',
      backgroundImage: '/img/IMG_4178.png',
      iconImage: '/icons/infocards/project.png',
      order: 2,
    },
    {
      title: 'Hopekid',
      description: 'We also have a sponsorship programme where you can sponsor a child and help them get access to education and basic needs.',
      backgroundImage: '/img/IMG_4149.png',
      iconImage: '/icons/infocards/baby.png',
      order: 3,
    },
  ],

  bannerSections: [
    {
      sectionKey: 'quote',
      title: '"It\'s not how much we give but how much love we put into giving."',
      subtitle: '',
      backgroundImage: '/img/pupils2.jpg',
      buttonText: '',
      buttonUrl: '',
    },
  ],

  teamMembers: [
    {
      name: 'Byaruhanga Felicity',
      role: 'TEAM LEAD CANADA',
      location: 'Canada',
      image: '/img/teams/team3.jpg',
      description: 'Felicity leads our Canadian operations and coordinates international partnerships for Hopely.org.',
      email: 'felicity@hopely.org',
      order: 1,
    },
    {
      name: 'Lukwago Daniel',
      role: 'TEAM LEAD UGANDA',
      location: 'Uganda',
      image: '/img/teams/team4.jpg',
      description: 'Daniel leads our Uganda team and manages community outreach and local partnerships on the ground.',
      email: 'daniel@hopely.org',
      order: 2,
    },
    {
      name: 'Brooke Ramos Dickson',
      role: 'COMMUNICATIONS DIRECTOR',
      location: 'Canada',
      image: '/img/teams/team5.jpg',
      description: 'Brooke manages our communications, storytelling, and digital outreach to spread awareness of our mission.',
      email: 'brooke@hopely.org',
      order: 3,
    },
    {
      name: 'Jjunju Micheal',
      role: 'FIELD OPERATIONS DIRECTOR',
      location: 'Uganda',
      image: '/img/teams/team1.jpg',
      description: 'Micheal oversees all field operations in Uganda, ensuring our programs reach the communities that need them most.',
      email: 'micheal@hopely.org',
      order: 4,
    },
    {
      name: 'Kisakye Dorah',
      role: 'FINANCE DIRECTOR',
      location: 'Uganda',
      image: '/img/teams/team2.jpg',
      description: 'Dorah manages our finances with transparency and ensures every donation is used effectively for maximum impact.',
      email: 'dorah@hopely.org',
      order: 5,
    },
  ],
};

async function migrateData() {
  console.log('🚀 Starting data migration...\n');

  try {
    // 1. Site Settings (single document)
    console.log('📝 Creating Site Settings...');
    await databases.createDocument(
      DATABASE_ID,
      'site_settings',
      ID.unique(),
      initialData.siteSettings
    );
    console.log('✅ Site Settings created!\n');

    // 2. Hero Content (single document)
    console.log('📝 Creating Hero Content...');
    await databases.createDocument(
      DATABASE_ID,
      'hero_content',
      ID.unique(),
      initialData.heroContent
    );
    console.log('✅ Hero Content created!\n');

    // 3. Mission Section (single document)
    console.log('📝 Creating Mission Section...');
    await databases.createDocument(
      DATABASE_ID,
      'mission_section',
      ID.unique(),
      initialData.missionSection
    );
    console.log('✅ Mission Section created!\n');

    // 4. Mission Items (multiple documents)
    console.log('📝 Creating Mission Items...');
    for (const item of initialData.missionItems) {
      await databases.createDocument(
        DATABASE_ID,
        'mission_items',
        ID.unique(),
        item
      );
      console.log(`  ✅ Created: ${item.text.substring(0, 30)}...`);
    }
    console.log('✅ All Mission Items created!\n');

    // 5. NGO Section (single document)
    console.log('📝 Creating NGO Section...');
    await databases.createDocument(
      DATABASE_ID,
      'ngo_section',
      ID.unique(),
      initialData.ngoSection
    );
    console.log('✅ NGO Section created!\n');

    // 6. Info Cards (multiple documents)
    console.log('📝 Creating Info Cards...');
    for (const card of initialData.infoCards) {
      await databases.createDocument(
        DATABASE_ID,
        'info_cards',
        ID.unique(),
        card
      );
      console.log(`  ✅ Created: ${card.title}`);
    }
    console.log('✅ All Info Cards created!\n');

    // 7. Banner Sections (multiple documents)
    console.log('📝 Creating Banner Sections...');
    for (const banner of initialData.bannerSections) {
      await databases.createDocument(
        DATABASE_ID,
        'banner_sections',
        ID.unique(),
        banner
      );
      console.log(`  ✅ Created: ${banner.sectionKey}`);
    }
    console.log('✅ All Banner Sections created!\n');

    // 8. Team Members (multiple documents)
    console.log('📝 Creating Team Members...');
    for (const member of initialData.teamMembers) {
      await databases.createDocument(
        DATABASE_ID,
        'team_members',
        ID.unique(),
        member
      );
      console.log(`  ✅ Created: ${member.name}`);
    }
    console.log('✅ All Team Members created!\n');

    console.log('🎉 SUCCESS! All initial data has been migrated!\n');
    console.log('📝 Next steps:');
    console.log('1. Verify the data in your Appwrite console');
    console.log('2. Update your frontend components to fetch from Appwrite');
    console.log('3. Build the admin CMS interface');

  } catch (error: any) {
    console.error('\n❌ Error during migration:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    console.log('\n💡 Note: If you see "Document already exists" errors, the data may have been migrated already.');
    process.exit(1);
  }
}

// Run the migration
migrateData();
