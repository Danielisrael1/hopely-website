# Quick Start - Automated CMS Setup

## TL;DR - 3 Simple Steps

### 1️⃣ Create API Key in Appwrite
- Go to: https://cloud.appwrite.io → Your Project → Settings → API Keys
- Click "Create API Key"
- Name: `CMS Setup`
- Enable these scopes:
  - ✅ `databases.read` & `databases.write`
  - ✅ `collections.read` & `collections.write`
  - ✅ `attributes.read` & `attributes.write`
  - ✅ `documents.read` & `documents.write`
- Copy the API key

### 2️⃣ Add API Key to .env
```env
APPWRITE_API_KEY=your_api_key_here
```

### 3️⃣ Run the Scripts
```bash
# Create all collections
npx tsx scripts/setup-appwrite-cms.ts

# Populate with initial data
npx tsx scripts/migrate-initial-data.ts
```

## Done! ✅

Your Appwrite backend is now fully configured with:
- ✅ 8 new CMS collections created
- ✅ All content migrated from hardcoded data
- ✅ Proper permissions set (Read: Anyone, Write: Authenticated)

## What's Next?

After setup is complete, I'll help you:
1. Create service files for content management
2. Build the admin CMS dashboard
3. Update all components to use dynamic content

---

**For detailed instructions, see:** `AUTOMATED_SETUP_GUIDE.md`
