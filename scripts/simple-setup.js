/**
 * Simple Appwrite Collections Setup Script
 * Uses the correct Appwrite v20 API
 */

import dotenv from 'dotenv';
import { Client, Databases, Permission, Role } from 'appwrite';

// Load environment variables
dotenv.config();

// Appwrite configuration
const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '');

// Set up authentication with API key
if (process.env.VITE_APPWRITE_API_KEY) {
  client.setJWT(process.env.VITE_APPWRITE_API_KEY);
}

const databases = new Databases(client);
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';

// Collection definitions from your config
const collections = [
  {
    id: 'site_settings',
    name: 'Site Settings',
    attributes: [
      { key: 'siteName', type: 'string', size: 100, required: true },
      { key: 'tagline', type: 'string', size: 200, required: true },
      { key: 'logo', type: 'string', size: 500, required: false },
      { key: 'primaryDonationUrl', type: 'string', size: 500, required: true },
      { key: 'email', type: 'string', size: 100, required: true },
      { key: 'phone', type: 'string', size: 50, required: true },
      { key: 'address', type: 'string', size: 200, required: true },
      { key: 'instagramUrl', type: 'string', size: 500, required: false },
      { key: 'facebookUrl', type: 'string', size: 500, required: false },
      { key: 'twitterUrl', type: 'string', size: 500, required: false }
    ]
  },
  {
    id: 'hero_content',
    name: 'Hero Content',
    attributes: [
      { key: 'title', type: 'string', size: 200, required: true },
      { key: 'subtitle', type: 'string', size: 500, required: true },
      { key: 'buttonText', type: 'string', size: 50, required: true },
      { key: 'buttonUrl', type: 'string', size: 500, required: true },
      { key: 'backgroundImage', type: 'string', size: 500, required: true }
    ]
  },
  {
    id: 'mission_section',
    name: 'Mission Section',
    attributes: [
      { key: 'title', type: 'string', size: 200, required: true },
      { key: 'missionImage', type: 'string', size: 500, required: true },
      { key: 'ctaButtonText', type: 'string', size: 50, required: true },
      { key: 'ctaButtonUrl', type: 'string', size: 500, required: true }
    ]
  },
  {
    id: 'mission_items',
    name: 'Mission Items',
    attributes: [
      { key: 'text', type: 'string', size: 300, required: true },
      { key: 'icon', type: 'string', size: 500, required: true },
      { key: 'order', type: 'integer', required: true }
    ]
  },
  {
    id: 'ngo_section',
    name: 'NGO Section',
    attributes: [
      { key: 'title', type: 'string', size: 200, required: true },
      { key: 'description', type: 'string', size: 2000, required: true }
    ]
  },
  {
    id: 'info_cards',
    name: 'Info Cards',
    attributes: [
      { key: 'title', type: 'string', size: 100, required: true },
      { key: 'description', type: 'string', size: 500, required: true },
      { key: 'backgroundImage', type: 'string', size: 500, required: true },
      { key: 'iconImage', type: 'string', size: 500, required: true },
      { key: 'order', type: 'integer', required: true }
    ]
  },
  {
    id: 'banner_sections',
    name: 'Banner Sections',
    attributes: [
      { key: 'sectionKey', type: 'string', size: 100, required: true },
      { key: 'title', type: 'string', size: 500, required: true },
      { key: 'subtitle', type: 'string', size: 1000, required: false },
      { key: 'backgroundImage', type: 'string', size: 500, required: false },
      { key: 'buttonText', type: 'string', size: 50, required: false },
      { key: 'buttonUrl', type: 'string', size: 500, required: false }
    ]
  },
  {
    id: 'team_members',
    name: 'Team Members',
    attributes: [
      { key: 'name', type: 'string', size: 100, required: true },
      { key: 'role', type: 'string', size: 100, required: true },
      { key: 'location', type: 'string', size: 100, required: true },
      { key: 'image', type: 'string', size: 500, required: true },
      { key: 'description', type: 'string', size: 500, required: true },
      { key: 'email', type: 'string', size: 100, required: false },
      { key: 'order', type: 'integer', required: true }
    ]
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createCollectionWithAttributes(collection) {
  try {
    console.log(`\n📦 Creating collection: ${collection.name} (${collection.id})...`);

    // Create collection
    const createdCollection = await databases.createCollection(
      DATABASE_ID,
      collection.id,
      collection.name,
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );

    console.log(`✅ Collection "${collection.name}" created successfully!`);

    // Wait for collection to be ready
    await sleep(2000);

    // Create attributes
    for (const attribute of collection.attributes) {
      try {
        console.log(`  ➕ Adding attribute: ${attribute.key} (${attribute.type})...`);

        if (attribute.type === 'string') {
          await databases.createStringAttribute(
            DATABASE_ID,
            collection.id,
            attribute.key,
            attribute.size,
            attribute.required,
            undefined, // default
            false // array
          );
        } else if (attribute.type === 'integer') {
          await databases.createIntegerAttribute(
            DATABASE_ID,
            collection.id,
            attribute.key,
            attribute.required,
            undefined, // min
            undefined, // max
            undefined, // default
            false // array
          );
        }

        console.log(`  ✅ Attribute "${attribute.key}" created!`);
        await sleep(1000); // Wait between attributes
      } catch (attrError) {
        if (attrError.code === 409) {
          console.log(`  ⚠️  Attribute "${attribute.key}" already exists, skipping...`);
        } else {
          console.error(`  ❌ Error creating attribute "${attribute.key}":`, attrError.message);
        }
      }
    }

    return createdCollection;
  } catch (error) {
    if (error.code === 409) {
      console.log(`⚠️  Collection "${collection.name}" already exists, skipping...`);
      return null;
    }
    throw error;
  }
}

async function setupCollections() {
  console.log('🚀 Starting Appwrite Collections Setup...\n');
  console.log(`📍 Endpoint: ${process.env.VITE_APPWRITE_ENDPOINT}`);
  console.log(`📍 Project ID: ${process.env.VITE_APPWRITE_PROJECT_ID}`);
  console.log(`📍 Database ID: ${DATABASE_ID}\n`);

  if (!process.env.VITE_APPWRITE_PROJECT_ID || !DATABASE_ID) {
    console.error('❌ Error: Missing environment variables!');
    console.error('Please ensure VITE_APPWRITE_PROJECT_ID and VITE_APPWRITE_DATABASE_ID are set in your .env file.');
    process.exit(1);
  }

  try {
    for (const collection of collections) {
      await createCollectionWithAttributes(collection);
      console.log(`✅ Collection "${collection.name}" setup complete!\n`);
    }

    console.log('\n🎉 SUCCESS! All collections have been created!\n');
    console.log('📝 Your collections are now ready for use in the CMS.');
    
  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the setup
setupCollections();
