# Simple Appwrite CMS Setup (Step-by-Step)

Since the automated script has SDK compatibility issues, here's a simple manual approach that takes about 10-15 minutes.

---

## Option 1: Quick Manual Setup (Recommended)

### Step 1: Open Appwrite Console
Go to: https://cloud.appwrite.io and navigate to your database (`68d152e8000b44e52780`)

### Step 2: Create Each Collection

For each collection below, follow these steps:
1. Click **"Create Collection"**
2. Set the **Collection ID** (important - must match exactly!)
3. Set the **Name**
4. Click **Create**
5. Go to **"Attributes"** tab
6. Add each attribute listed
7. Go to **"Settings"** tab → **"Permissions"**
8. Add permission: **Read** → Role: **Any**

---

### Collections to Create:

#### 1️⃣ **Site Settings**
- **Collection ID:** `site_settings`
- **Name:** Site Settings

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| siteName | String | 100 | ✓ |
| tagline | String | 200 | ✓ |
| logo | String | 500 | ✗ |
| primaryDonationUrl | String | 500 | ✓ |
| email | String | 100 | ✓ |
| phone | String | 50 | ✓ |
| address | String | 200 | ✓ |
| instagramUrl | String | 500 | ✗ |
| facebookUrl | String | 500 | ✗ |
| twitterUrl | String | 500 | ✗ |

---

#### 2️⃣ **Hero Content**
- **Collection ID:** `hero_content`
- **Name:** Hero Content

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| title | String | 200 | ✓ |
| subtitle | String | 500 | ✓ |
| buttonText | String | 50 | ✓ |
| buttonUrl | String | 500 | ✓ |
| backgroundImage | String | 500 | ✓ |

---

#### 3️⃣ **Mission Section**
- **Collection ID:** `mission_section`
- **Name:** Mission Section

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| title | String | 200 | ✓ |
| missionImage | String | 500 | ✓ |
| ctaButtonText | String | 50 | ✓ |
| ctaButtonUrl | String | 500 | ✓ |

---

#### 4️⃣ **Mission Items**
- **Collection ID:** `mission_items`
- **Name:** Mission Items

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| text | String | 300 | ✓ |
| icon | String | 500 | ✓ |
| order | Integer | - | ✓ |

---

#### 5️⃣ **NGO Section**
- **Collection ID:** `ngo_section`
- **Name:** NGO Section

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| title | String | 200 | ✓ |
| description | String | 2000 | ✓ |

---

#### 6️⃣ **Info Cards**
- **Collection ID:** `info_cards`
- **Name:** Info Cards

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| title | String | 100 | ✓ |
| description | String | 500 | ✓ |
| backgroundImage | String | 500 | ✓ |
| iconImage | String | 500 | ✓ |
| order | Integer | - | ✓ |

---

#### 7️⃣ **Banner Sections**
- **Collection ID:** `banner_sections`
- **Name:** Banner Sections

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| sectionKey | String | 100 | ✓ |
| title | String | 500 | ✓ |
| subtitle | String | 1000 | ✗ |
| backgroundImage | String | 500 | ✗ |
| buttonText | String | 50 | ✗ |
| buttonUrl | String | 500 | ✗ |

---

#### 8️⃣ **Team Members**
- **Collection ID:** `team_members`
- **Name:** Team Members

**Attributes:**
| Key | Type | Size | Required |
|-----|------|------|----------|
| name | String | 100 | ✓ |
| role | String | 100 | ✓ |
| location | String | 100 | ✓ |
| image | String | 500 | ✓ |
| description | String | 500 | ✓ |
| email | String | 100 | ✗ |
| order | Integer | - | ✓ |

---

### Step 3: Update .env File

Add these lines to your `.env` file:

```env
# CMS Collections
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

### Step 4: Populate Initial Data

I'll create a web-based script that you can run in your browser console to populate the data. This will be much easier!

Once you complete the collections setup, let me know and I'll give you the browser script to run.

---

## Tips for Faster Setup

1. **Copy Collection IDs carefully** - They must match exactly
2. **Use the "Duplicate" feature** in Appwrite if available
3. **Permissions**: Always set Read: Any for public content
4. **Don't worry about order** - Just create all collections first, then add attributes

---

## Checklist

Use this to track your progress:

- [ ] Site Settings collection created with 10 attributes
- [ ] Hero Content collection created with 5 attributes
- [ ] Mission Section collection created with 4 attributes
- [ ] Mission Items collection created with 3 attributes
- [ ] NGO Section collection created with 2 attributes
- [ ] Info Cards collection created with 5 attributes
- [ ] Banner Sections collection created with 6 attributes
- [ ] Team Members collection created with 7 attributes
- [ ] All permissions set to Read: Any
- [ ] .env file updated with collection IDs

---

**Once done, let me know and I'll provide:**
1. ✅ Browser console script to populate initial data
2. ✅ Service files for content management
3. ✅ Admin CMS dashboard
4. ✅ Dynamic component updates
