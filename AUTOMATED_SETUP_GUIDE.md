# Automated Appwrite CMS Setup Guide

This guide will help you automatically create all necessary Appwrite collections and populate them with initial data.

## Prerequisites

✅ Appwrite Cloud account with a project created
✅ `.env` file configured with your Appwrite credentials
✅ Admin API key (we'll create one)

---

## Step 1: Create an API Key in Appwrite

**IMPORTANT:** The automated scripts need an API key to create collections.

1. Go to your Appwrite Console: https://cloud.appwrite.io
2. Select your project
3. Navigate to **"Settings"** → **"API Keys"** (in the left sidebar)
4. Click **"Create API Key"**
5. Configure the key:
   - **Name**: `CMS Setup Script`
   - **Expiration**: Set to a future date (e.g., 1 month from now)
   - **Scopes**: Check the following:
     - ✅ `databases.read`
     - ✅ `databases.write`
     - ✅ `collections.read`
     - ✅ `collections.write`
     - ✅ `attributes.read`
     - ✅ `attributes.write`
     - ✅ `documents.read`
     - ✅ `documents.write`
6. Click **"Create"**
7. **COPY THE API KEY** - you'll need it in the next step

---

## Step 2: Update Your .env File

Add the API key to your `.env` file:

```env
# Existing configuration
VITE_APPWRITE_PROJECT_ID=68c92076003a23d60576
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=68d152e8000b44e52780
VITE_APPWRITE_PROJECTS_COLLECTION_ID=projects

# Add this line with your API key
VITE_APPWRITE_API_KEY=your_api_key_here
```

**Security Note:** After running the setup scripts, you can delete this API key from Appwrite console.

---

## Step 3: Run the Automated Setup Script

This will create all CMS collections with proper attributes and permissions:

```bash
npx tsx scripts/setup-appwrite-cms.ts
```

**What this does:**
- ✅ Creates 8 new collections in your Appwrite database
- ✅ Adds all required attributes (strings, integers, etc.)
- ✅ Sets proper permissions (Read: Anyone, Write: Authenticated users)
- ✅ Handles existing collections gracefully

**Expected output:**
```
🚀 Starting Appwrite CMS Setup...

📦 Creating collection: Site Settings (site_settings)...
✅ Collection "Site Settings" created successfully!
  ➕ Adding attribute: siteName (string)...
  ✅ Attribute "siteName" created!
  ...

🎉 SUCCESS! All CMS collections have been created!
```

---

## Step 4: Update .env with Collection IDs

After running the script, add these lines to your `.env` file:

```env
# CMS Collections (add these)
VITE_APPWRITE_SITE_SETTINGS_COLLECTION_ID=site_settings
VITE_APPWRITE_HERO_COLLECTION_ID=hero_content
VITE_APPWRITE_MISSION_SECTION_COLLECTION_ID=mission_section
VITE_APPWRITE_MISSION_ITEMS_COLLECTION_ID=mission_items
VITE_APPWRITE_NGO_SECTION_COLLECTION_ID=ngo_section
VITE_APPWRITE_INFO_CARDS_COLLECTION_ID=info_cards
VITE_APPWRITE_BANNER_SECTIONS_COLLECTION_ID=banner_sections
VITE_APPWRITE_TEAM_MEMBERS_COLLECTION_ID=team_members
```

---

## Step 5: Run the Data Migration Script

This will populate your collections with the current hardcoded content:

```bash
npx tsx scripts/migrate-initial-data.ts
```

**What this does:**
- ✅ Migrates all your current hardcoded content to Appwrite
- ✅ Populates Hero, Mission, Team, Contact info, etc.
- ✅ Creates initial documents for immediate use

**Expected output:**
```
🚀 Starting data migration...

📝 Creating Site Settings...
✅ Site Settings created!

📝 Creating Hero Content...
✅ Hero Content created!

📝 Creating Team Members...
  ✅ Created: Byaruhanga Felicity
  ✅ Created: Lukwago Daniel
  ...

🎉 SUCCESS! All initial data has been migrated!
```

---

## Step 6: Verify in Appwrite Console

1. Go to your Appwrite Console
2. Navigate to **"Databases"** → Your database
3. You should see 8 new collections:
   - ✅ Site Settings
   - ✅ Hero Content
   - ✅ Mission Section
   - ✅ Mission Items
   - ✅ NGO Section
   - ✅ Info Cards
   - ✅ Banner Sections
   - ✅ Team Members

4. Click on each collection to verify the data is there

---

## Step 7: Clean Up (Optional)

For security, delete the API key after setup:

1. Go to **"Settings"** → **"API Keys"**
2. Find the `CMS Setup Script` key
3. Click the **trash icon** to delete it
4. Remove `VITE_APPWRITE_API_KEY` from your `.env` file

---

## Troubleshooting

### Error: "Missing environment variables"
- Make sure your `.env` file has all required variables
- Restart your terminal/IDE to reload environment variables

### Error: "Invalid credentials" or "Unauthorized"
- Verify your API key is correct
- Check that the API key has the required scopes

### Error: "Collection already exists"
- This is normal if you re-run the script
- The script will skip existing collections

### Error: "Rate limit exceeded"
- The script includes delays to avoid rate limits
- If this happens, wait a few minutes and try again

### Error: "Attribute already exists"
- This is normal if you re-run the script
- The script will skip existing attributes

---

## Next Steps

Once setup is complete:

1. ✅ **Backend is ready!** - All collections are created and populated
2. ⏭️ **Next:** Update frontend components to fetch from Appwrite
3. ⏭️ **Next:** Build the admin CMS dashboard interface

---

## Support

If you encounter issues:
1. Check the Appwrite Console for error details
2. Verify all environment variables are set correctly
3. Check the terminal output for specific error messages

**Common Solutions:**
- Clear your terminal and restart it
- Verify your Appwrite project ID and database ID are correct
- Make sure you're using the correct endpoint URL
