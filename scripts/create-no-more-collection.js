/**
 * Script to create the no_more_items collection in Appwrite
 * Run with: node scripts/create-no-more-collection.js
 */

import 'dotenv/config';

const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || '68c92076003a23d60576';
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '68d152e8000b44e52780';
const API_KEY = process.env.VITE_APPWRITE_API_KEY;

if (!API_KEY) {
  console.error('❌ VITE_APPWRITE_API_KEY is required in your .env file');
  console.log('\nTo get an API key:');
  console.log('1. Go to your Appwrite Console');
  console.log('2. Navigate to Project Settings → API Keys');
  console.log('3. Create a new API key with Database permissions');
  console.log('4. Add it to your .env file as VITE_APPWRITE_API_KEY=your_key_here');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'X-Appwrite-Project': PROJECT_ID,
  'X-Appwrite-Key': API_KEY,
};

async function createCollection() {
  console.log('🚀 Creating no_more_items collection...\n');
  
  try {
    // Create the collection
    const collectionResponse = await fetch(
      `${ENDPOINT}/databases/${DATABASE_ID}/collections`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          collectionId: 'no_more_items',
          name: 'No More Items',
          permissions: [
            'read("any")',
            'create("users")',
            'update("users")',
            'delete("users")'
          ],
          documentSecurity: false,
          enabled: true
        })
      }
    );

    if (!collectionResponse.ok) {
      const error = await collectionResponse.json();
      if (error.code === 409) {
        console.log('⚠️  Collection already exists, skipping creation...');
      } else {
        throw new Error(`Failed to create collection: ${error.message}`);
      }
    } else {
      console.log('✅ Collection created successfully!');
    }

    // Wait a moment for collection to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create attributes
    const attributes = [
      { key: 'category', type: 'string', size: 100, required: true },
      { key: 'description', type: 'string', size: 500, required: true },
      { key: 'order', type: 'integer', required: true, min: 0, max: 9999 }
    ];

    for (const attr of attributes) {
      console.log(`Creating attribute: ${attr.key}...`);
      
      const endpoint = attr.type === 'integer' 
        ? `${ENDPOINT}/databases/${DATABASE_ID}/collections/no_more_items/attributes/integer`
        : `${ENDPOINT}/databases/${DATABASE_ID}/collections/no_more_items/attributes/string`;
      
      const body = attr.type === 'integer'
        ? { key: attr.key, required: attr.required, min: attr.min, max: attr.max }
        : { key: attr.key, required: attr.required, size: attr.size };

      const attrResponse = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (!attrResponse.ok) {
        const error = await attrResponse.json();
        if (error.code === 409) {
          console.log(`  ⚠️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Failed to create ${attr.key}: ${error.message}`);
        }
      } else {
        console.log(`  ✅ ${attr.key} created`);
      }

      // Wait between attribute creations
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 Setup complete!');
    console.log('\nYou can now use the "No More" section in the admin panel.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createCollection();
