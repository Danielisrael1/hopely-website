# Appwrite Setup Guide for Hopely Uganda Website

This guide will walk you through setting up Appwrite for the Hopely Uganda website's admin authentication and project management system.

## Prerequisites
- An Appwrite Cloud account (free tier available)
- Admin access to your project

## Step 1: Create Appwrite Cloud Account

1. Go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Sign up for a free account or log in if you already have one
3. Create a new project by clicking "Create Project"
4. Give your project a name (e.g., "Hopely Uganda Website")
5. Copy the **Project ID** - you'll need this later

## Step 2: Configure Web Platform

1. In your Appwrite project dashboard, go to "Settings" → "Platforms"
2. Click "Add Platform" and select "Web"
3. Give it a name (e.g., "Hopely Website")
4. Add your domain(s):
   - For local development: `http://localhost:5173`
   - For production: `https://your-domain.com`
5. Save the platform configuration

## Step 3: Create Database and Collection

### Create Database
1. Go to "Databases" in the left sidebar
2. Click "Create Database"
3. Name it "hopely_db" (or any name you prefer)
4. Copy the **Database ID** - you'll need this later

### Create Projects Collection
1. Inside your database, click "Create Collection"
2. Name it "projects"
3. Copy the **Collection ID** - you'll need this later

### Configure Collection Attributes
Add the following attributes to your projects collection:

| Attribute Key | Type | Size | Required | Default |
|---------------|------|------|----------|---------|
| title | String | 255 | ✓ | - |
| description | String | 1000 | ✓ | - |
| image | String | 500 | ✗ | - |
| status | Enum | - | ✓ | planning |
| location | String | 255 | ✓ | - |
| beneficiaries | Integer | - | ✓ | 0 |
| dateStarted | String | 50 | ✓ | - |
| dateCompleted | String | 50 | ✗ | - |
| budget | Integer | - | ✓ | 0 |
| raised | Integer | - | ✓ | 0 |

**For the status enum:**
- Values: `ongoing`, `completed`, `planning`
- Default: `planning`

### Set Collection Permissions
1. Go to the "Settings" tab of your collection
2. Set the following permissions:

**Read Access:**
- Role: Any
- This allows anyone to view projects

**Create/Update/Delete Access:**
- Role: Users (authenticated users only)
- This ensures only logged-in admins can manage projects

## Step 4: Create Admin User

1. Go to "Auth" → "Users" in the left sidebar
2. Click "Create User"
3. Fill in the admin details:
   - **Email**: your-admin@email.com
   - **Password**: Create a strong password
   - **Name**: Admin Name
4. Make note of the email and password for admin login

## Step 5: Configure Environment Variables

1. In your project root, copy `.env.example` to `.env`
2. Fill in the values you copied earlier:

```env
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_PROJECTS_COLLECTION_ID=your_projects_collection_id_here
```

**Important:** 
- Keep your `.env` file secure and never commit it to version control
- The `.env.example` file shows the required format without actual values

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the Projects page: `http://localhost:5173/projects`
3. Click "Admin Access" to test login
4. Use the admin credentials you created in Step 4
5. After successful login, you should see:
   - "Add New Project" button
   - "Edit" and "Delete" buttons on existing projects

## Step 7: Production Deployment

When deploying to production:

1. Add your production domain to Appwrite platform settings
2. Set the environment variables in your hosting platform
3. Ensure the `.env` file is not deployed to production

## Troubleshooting

### Common Issues:

**1. Login fails with "Invalid credentials"**
- Verify the admin user email and password
- Check that the user was created successfully in Appwrite

**2. Projects don't load or save**
- Verify all environment variables are set correctly
- Check the database and collection IDs match your Appwrite setup
- Ensure collection permissions are configured correctly

**3. "Appwrite endpoint not reachable" error**
- Check your internet connection
- Verify the endpoint URL is correct
- Ensure your domain is added to the platform settings

**4. Permission denied errors**
- Check collection permissions
- Ensure the user is authenticated before trying to create/update/delete

### Testing Connection

To test if Appwrite is properly configured, you can:

1. Open browser developer tools
2. Check the Network tab for any failed requests to Appwrite
3. Look for error messages in the Console tab

## Security Best Practices

1. **Strong Passwords**: Use strong, unique passwords for admin accounts
2. **Environment Variables**: Never expose API keys or credentials in your code
3. **Regular Updates**: Keep Appwrite SDK updated to the latest version
4. **Backup**: Regularly backup your Appwrite data
5. **Monitoring**: Monitor your Appwrite usage and set up alerts

## Need Help?

- **Appwrite Documentation**: [https://appwrite.io/docs](https://appwrite.io/docs)
- **Appwrite Discord**: [https://appwrite.io/discord](https://appwrite.io/discord)
- **GitHub Issues**: Report issues in this project's GitHub repository

## Optional: Import Sample Data

If you want to start with some sample projects, you can manually create them in the Appwrite console or use the admin interface once it's set up.

Your Appwrite setup is now complete! The website will automatically fall back to sample data if Appwrite is not configured, but with this setup, you'll have full admin functionality with persistent data storage.