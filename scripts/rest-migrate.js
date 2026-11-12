/**
 * Data Migration Script - Populate Initial CMS Content
 * Uses REST API directly to populate collections with initial data
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';
const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || '';
const API_KEY = process.env.APPWRITE_API_KEY || '';

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
    title: 'Welcome to Hopely Uganda',
    subtitle: 'Together, we can make a difference in the lives of children and communities across Uganda',
    buttonText: 'Donate Now',
    buttonUrl: 'https://gofund.me/266a82aa',
    backgroundImage: '/hero-bg.jpg',
  },
  missionSection: {
    title: 'Our Mission',
    missionImage: '/mission.jpg',
    ctaButtonText: 'Join Us',
    ctaButtonUrl: 'https://gofund.me/266a82aa',
  },
  missionItems: [
    { text: 'Provide quality education to underprivileged children', icon: '📚', order: 1 },
    { text: 'Ensure access to clean water and sanitation', icon: '💧', order: 2 },
    { text: 'Promote health and wellness programs', icon: '🏥', order: 3 },
    { text: 'Support sustainable community development', icon: '🌱', order: 4 },
  ],
  ngoSection: {
    title: 'About Hopely Uganda',
    description: 'Hopely Uganda is a non-profit organization dedicated to improving the lives of children and communities in Uganda. Through education, healthcare, and sustainable development initiatives, we strive to create lasting positive change and empower future generations.',
  },
  infoCards: [
    {
      title: 'Education',
      description: 'Providing quality education and learning resources to children in need',
      backgroundImage: '/education-bg.jpg',
      iconImage: '/education-icon.png',
      order: 1,
    },
    {
      title: 'Healthcare',
      description: 'Ensuring access to medical care and health education for communities',
      backgroundImage: '/healthcare-bg.jpg',
      iconImage: '/healthcare-icon.png',
      order: 2,
    },
    {
      title: 'Clean Water',
      description: 'Building wells and water systems to provide clean drinking water',
      backgroundImage: '/water-bg.jpg',
      iconImage: '/water-icon.png',
      order: 3,
    },
  ],
  bannerSections: [
    {
      sectionKey: 'donation',
      title: 'Make a Difference Today',
      subtitle: 'Your generous donation helps us continue our mission to transform lives',
      backgroundImage: '/donation-bg.jpg',
      buttonText: 'Donate Now',
      buttonUrl: 'https://gofund.me/266a82aa',
    },
    {
      sectionKey: 'volunteer',
      title: 'Join Our Team',
      subtitle: 'Become a volunteer and help us make a direct impact in communities',
      backgroundImage: '/volunteer-bg.jpg',
      buttonText: 'Get Involved',
      buttonUrl: '#contact',
    },
  ],
  teamMembers: [
    {
      name: 'Sarah Namukasa',
      role: 'Executive Director',
      location: 'Kampala, Uganda',
      image: '/team/sarah.jpg',
      description: 'Leading our mission with over 10 years of experience in non-profit management',
      email: 'sarah@hopelyuganda.org',
      order: 1,
    },
    {
      name: 'David Okello',
      role: 'Program Coordinator',
      location: 'Gulu, Uganda',
      image: '/team/david.jpg',
      description: 'Managing our educational programs and community outreach initiatives',
      email: 'david@hopelyuganda.org',
      order: 2,
    },
    {
      name: 'Grace Achieng',
      role: 'Healthcare Director',
      location: 'Lira, Uganda',
      image: '/team/grace.jpg',
      description: 'Overseeing our healthcare programs and medical missions',
      email: 'grace@hopelyuganda.org',
      order: 3,
    },
  ],
};

async function makeRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': API_KEY,
      ...options.headers
    },
    ...options
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw { code: response.status, message: error.message || response.statusText };
  }
  
  return response.json();
}

async function createDocument(collectionId, documentId, data) {
  try {
    console.log(`📝 Creating document in ${collectionId}...`);
    
    const result = await makeRequest(
      `${ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/documents`,
      {
        method: 'POST',
        body: JSON.stringify({
          documentId: documentId,
          data: data
        })
      }
    );
    
    console.log(`✅ Document created successfully in ${collectionId}!`);
    return result;
  } catch (error) {
    if (error.code === 409) {
      console.log(`⚠️  Document already exists in ${collectionId}, skipping...`);
      return null;
    }
    throw error;
  }
}

async function migrateData() {
  console.log('🚀 Starting data migration...\n');
  console.log(`📍 Endpoint: ${ENDPOINT}`);
  console.log(`📍 Project ID: ${PROJECT_ID}`);
  console.log(`📍 Database ID: ${DATABASE_ID}\n`);

  if (!PROJECT_ID || !DATABASE_ID || !API_KEY) {
    console.error('❌ Error: Missing environment variables!');
    console.error('Please ensure VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_DATABASE_ID, and APPWRITE_API_KEY are set in your .env file.');
    process.exit(1);
  }

  try {
    // Migrate site settings
    await createDocument('site_settings', 'site_settings', initialData.siteSettings);

    // Migrate hero content
    await createDocument('hero_content', 'hero_content', initialData.heroContent);

    // Migrate mission section
    await createDocument('mission_section', 'mission_section', initialData.missionSection);

    // Migrate mission items (multiple documents)
    for (let i = 0; i < initialData.missionItems.length; i++) {
      const item = initialData.missionItems[i];
      await createDocument('mission_items', `mission_item_${i + 1}`, item);
    }

    // Migrate NGO section
    await createDocument('ngo_section', 'ngo_section', initialData.ngoSection);

    // Migrate info cards (multiple documents)
    for (let i = 0; i < initialData.infoCards.length; i++) {
      const card = initialData.infoCards[i];
      await createDocument('info_cards', `info_card_${i + 1}`, card);
    }

    // Migrate banner sections (multiple documents)
    for (const banner of initialData.bannerSections) {
      await createDocument('banner_sections', banner.sectionKey, banner);
    }

    // Migrate team members (multiple documents)
    for (let i = 0; i < initialData.teamMembers.length; i++) {
      const member = initialData.teamMembers[i];
      await createDocument('team_members', `team_member_${i + 1}`, member);
    }

    console.log('\n🎉 SUCCESS! All initial data has been migrated!\n');
    console.log('📝 Your CMS is now populated with initial content.');
    console.log('🚀 You can now start your development server: npm run dev');

  } catch (error) {
    console.error('\n❌ Error during migration:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the migration
migrateData();
