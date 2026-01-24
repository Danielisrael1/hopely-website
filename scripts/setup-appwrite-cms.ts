/**
 * Automated Appwrite CMS Setup Script
 *
 * This script creates all necessary collections and attributes for the Hopely CMS
 * Run with: npx tsx scripts/setup-appwrite-cms.ts
 */

import dotenv from 'dotenv';
import { Client, Databases, ID, Permission, Role } from 'appwrite';

// Load environment variables from .env file
dotenv.config();

// Appwrite configuration
const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '');

// Add JWT for server-side operations (if API key is available)
if (process.env.VITE_APPWRITE_API_KEY) {
  client.setJWT(process.env.VITE_APPWRITE_API_KEY);
}

const databases = new Databases(client);
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';

// Collection schemas
const collections = [
  {
    id: 'site_settings',
    name: 'Site Settings',
    attributes: [
      { key: 'siteName', type: 'string', size: 100, required: true, default: 'Hopely Uganda' },
      { key: 'tagline', type: 'string', size: 200, required: true },
      { key: 'logo', type: 'string', size: 500, required: false },
      { key: 'primaryDonationUrl', type: 'string', size: 500, required: true },
      { key: 'email', type: 'string', size: 100, required: true },
      { key: 'phone', type: 'string', size: 50, required: true },
      { key: 'address', type: 'string', size: 200, required: true },
      { key: 'instagramUrl', type: 'string', size: 500, required: false },
      { key: 'facebookUrl', type: 'string', size: 500, required: false },
      { key: 'twitterUrl', type: 'string', size: 500, required: false },
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
      { key: 'backgroundImage', type: 'string', size: 500, required: true },
    ]
  },
  {
    id: 'mission_section',
    name: 'Mission Section',
    attributes: [
      { key: 'title', type: 'string', size: 200, required: true },
      { key: 'missionImage', type: 'string', size: 500, required: true },
      { key: 'ctaButtonText', type: 'string', size: 50, required: true },
      { key: 'ctaButtonUrl', type: 'string', size: 500, required: true },
    ]
  },
  {
    id: 'mission_items',
    name: 'Mission Items',
    attributes: [
      { key: 'text', type: 'string', size: 300, required: true },
      { key: 'icon', type: 'string', size: 500, required: true },
      { key: 'order', type: 'integer', required: true, default: 0 },
    ]
  },
  {
    id: 'ngo_section',
    name: 'NGO Section',
    attributes: [
      { key: 'title', type: 'string', size: 200, required: true },
      { key: 'description', type: 'string', size: 2000, required: true },
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
      { key: 'order', type: 'integer', required: true, default: 0 },
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
      { key: 'buttonUrl', type: 'string', size: 500, required: false },
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
      { key: 'order', type: 'integer', required: true, default: 0 },
    ]
  }
];

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createCollection(collectionId: string, name: string) {
  try {
    console.log(`\n📦 Creating collection: ${name} (${collectionId})...`);

    const collection = await databases.createCollection(
      DATABASE_ID,
      collectionId,
      name,
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );

    console.log(`✅ Collection "${name}" created successfully!`);
    return collection;
  } catch (error: any) {
    if (error.code === 409) {
      console.log(`⚠️  Collection "${name}" already exists, skipping...`);
      return null;
    }
    throw error;
  }
}

async function createAttribute(collectionId: string, attribute: any) {
  try {
    console.log(`  ➕ Adding attribute: ${attribute.key} (${attribute.type})...`);

    let result;

    switch (attribute.type) {
      case 'string':
        result = await databases.createStringAttribute(
          DATABASE_ID,
          collectionId,
          attribute.key,
          attribute.size,
          attribute.required,
          attribute.default,
          false // array
        );
        break;

      case 'integer':
        result = await databases.createIntegerAttribute(
          DATABASE_ID,
          collectionId,
          attribute.key,
          attribute.required,
          undefined, // min
          undefined, // max
          attribute.default,
          false // array
        );
        break;

      default:
        throw new Error(`Unsupported attribute type: ${attribute.type}`);
    }

    console.log(`  ✅ Attribute "${attribute.key}" created!`);
    return result;
  } catch (error: any) {
    if (error.code === 409) {
      console.log(`  ⚠️  Attribute "${attribute.key}" already exists, skipping...`);
      return null;
    }
    throw error;
  }
}

async function setupCMS() {
  console.log('🚀 Starting Appwrite CMS Setup...\n');
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
      // Create collection
      const created = await createCollection(collection.id, collection.name);

      if (created !== null) {
        // Wait for collection to be ready
        await sleep(2000);

        // Create attributes
        for (const attribute of collection.attributes) {
          await createAttribute(collection.id, attribute);
          // Wait between attribute creations to avoid rate limits
          await sleep(1500);
        }
      }

      console.log(`✅ Collection "${collection.name}" setup complete!\n`);
    }

    console.log('\n🎉 SUCCESS! All CMS collections have been created!\n');
    console.log('📝 Next steps:');
    console.log('1. Update your .env file with these collection IDs:');
    console.log('');
    collections.forEach(col => {
      const envKey = `VITE_APPWRITE_${col.id.toUpperCase()}_COLLECTION_ID`;
      console.log(`   ${envKey}=${col.id}`);
    });
    console.log('');
    console.log('2. Run the data migration script to populate initial content');
    console.log('3. Start your development server: npm run dev');

  } catch (error: any) {
    console.error('\n❌ Error during setup:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the setup
setupCMS();
