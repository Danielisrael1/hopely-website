/**
 * Creates the hope_kids collection in Appwrite (the "Sponsor a child" carousel)
 * and, if it is empty, copies in the three children the site showed before the CMS.
 * Safe to run more than once.
 *
 * Run with: npm run setup:hope-kids
 */

import 'dotenv/config';

const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
const API_KEY = process.env.APPWRITE_API_KEY;
const COLLECTION_ID = 'hope_kids';

const missing = Object.entries({ VITE_APPWRITE_PROJECT_ID: PROJECT_ID, VITE_APPWRITE_DATABASE_ID: DATABASE_ID, APPWRITE_API_KEY: API_KEY })
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length) {
  console.error(`Missing in .env: ${missing.join(', ')}`);
  console.log('\nTo get an API key:');
  console.log('1. Open your project in the Appwrite Console');
  console.log('2. Go to Overview → Integrations → API Keys and create a key');
  console.log('3. Give it the Database scopes (collections, attributes, documents: read + write)');
  console.log('4. Add it to .env as APPWRITE_API_KEY=your_key_here');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'X-Appwrite-Project': PROJECT_ID,
  'X-Appwrite-Key': API_KEY,
};

const collectionUrl = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}`;

const attributes = [
  { key: 'name', type: 'string', size: 100, required: true },
  { key: 'age', type: 'integer', required: true, min: 0, max: 25 },
  { key: 'image', type: 'string', size: 1000, required: true },
  { key: 'description', type: 'string', size: 2000, required: true },
  { key: 'additionalInfo', type: 'string', size: 1000, required: false },
  { key: 'order', type: 'integer', required: true, min: 0, max: 9999 },
];

// The children hardcoded in SponsorChild.tsx before it read from the CMS.
// Photos are the files in public/img, so they keep working as-is.
const initialKids = [
  {
    name: 'Kimuli Joseph',
    age: 16,
    image: '/img/jose.jpg',
    description: 'Joseph, 16 years is the eldest among his 3 siblings. abandon by the father he had challenges going to school since it was his mother carrying the family alone taking care.',
    additionalInfo: 'with your sponsorship, he can go to a better school, acquire better education and break the poverty cycle in the family hence, brighter future Become a sponsor parent to Joseph.',
    order: 1,
  },
  {
    name: 'Nakato Sarah',
    age: 12,
    image: '/img/alisha.jpg',
    description: 'Sarah is a bright young girl who dreams of becoming a doctor. She lost her parents in an accident and now lives with her grandmother.',
    additionalInfo: 'Your sponsorship will help Sarah continue her education and provide her with the basic necessities she needs to thrive and achieve her dreams.',
    order: 2,
  },
  {
    name: 'Ssaku Parvin Darious |S4',
    age: 14,
    image: '/img/pervin.jpg',
    description: 'Parvin ,17 years at his young age, he couldn’t make it to school and was stuckUsed to vendor clothes to earn a living with his mother. Open not lost. He continued in this line of business, but it couldn’t generate enough income to take him to school.With your generous sponsorship, Parvin can go back to school so that he achieves his goals and dreams in lif.',
    additionalInfo: 'Become a sponsor parent to Parvin.',
    order: 3,
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url, options = {}) {
  const response = await fetch(url, { headers, ...options });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, body };
}

async function createCollection() {
  const { ok, status, body } = await request(`${ENDPOINT}/databases/${DATABASE_ID}/collections`, {
    method: 'POST',
    body: JSON.stringify({
      collectionId: COLLECTION_ID,
      name: 'HopeKids',
      // Anyone can read (public site); logged-in admins can edit
      permissions: ['read("any")', 'create("users")', 'update("users")', 'delete("users")'],
      documentSecurity: false,
      enabled: true,
    }),
  });
  if (ok) console.log('Collection hope_kids created');
  else if (status === 409) console.log('Collection hope_kids already exists');
  else throw new Error(`Could not create collection: ${body.message}`);
}

async function createAttributes() {
  for (const attr of attributes) {
    const { type, ...fields } = attr;
    const { ok, status, body } = await request(`${collectionUrl}/attributes/${type}`, {
      method: 'POST',
      body: JSON.stringify(fields),
    });
    if (ok) console.log(`  attribute ${attr.key} created`);
    else if (status === 409) console.log(`  attribute ${attr.key} already exists`);
    else throw new Error(`Could not create attribute ${attr.key}: ${body.message}`);
    await sleep(300);
  }
}

// Appwrite builds attributes in the background; documents can't be written until they're available
async function waitForAttributes() {
  for (let attempt = 0; attempt < 30; attempt++) {
    const { body } = await request(`${collectionUrl}/attributes`);
    const list = body.attributes || [];
    const failed = list.filter((a) => a.status === 'failed' || a.status === 'stuck');
    if (failed.length) throw new Error(`Attributes failed: ${failed.map((a) => `${a.key} (${a.error})`).join(', ')}`);
    if (attributes.every((a) => list.some((l) => l.key === a.key && l.status === 'available'))) return;
    await sleep(1000);
  }
  throw new Error('Attributes were still processing after 30 seconds. Run the script again in a minute.');
}

async function seedKids() {
  const { body } = await request(`${collectionUrl}/documents`);
  if (body.total > 0) {
    console.log(`Collection already has ${body.total} HopeKid(s), not adding the starter ones`);
    return;
  }
  for (const kid of initialKids) {
    const { ok, body: result } = await request(`${collectionUrl}/documents`, {
      method: 'POST',
      body: JSON.stringify({ documentId: 'unique()', data: kid }),
    });
    if (!ok) throw new Error(`Could not add ${kid.name}: ${result.message}`);
    console.log(`  added ${kid.name}`);
  }
}

try {
  await createCollection();
  await sleep(1000);
  await createAttributes();
  console.log('Waiting for Appwrite to finish the attributes...');
  await waitForAttributes();
  await seedKids();
  console.log('\nDone. Open /admin → HopeKids to add and edit children.');
} catch (error) {
  console.error(`\nError: ${error.message}`);
  process.exit(1);
}
