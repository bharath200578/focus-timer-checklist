# Deploying Focus Timer to Netlify

This guide will walk you through deploying your Focus Timer application to Netlify.

## Prerequisites

- GitHub account (for repository hosting)
- Netlify account (free tier is sufficient)
- Your project pushed to a GitHub repository

## Steps to Deploy

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub with the latest changes:

```bash
git add .
git commit -m "Prepare for deployment"
git push
```

### 2. Sign Up for Netlify

- Go to [Netlify](https://netlify.com)
- Sign up for a free account (you can use your GitHub account)

### 3. Create a New Site

- From the Netlify dashboard, click "Add new site" > "Import an existing project"
- Connect to your GitHub account
- Select the repository containing your Focus Timer application
- Configure the build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click "Deploy site"

### 4. Configure Domain (Optional)

By default, Netlify assigns a random subdomain like `random-name-123456.netlify.app`. To use a custom domain:

1. Go to Domain settings in your site dashboard
2. Click "Add custom domain"
3. Follow the instructions to set up your domain

### 5. Deploy Using Netlify CLI (Alternative Method)

If you prefer using the command line:

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Authenticate:
   ```bash
   netlify login
   ```

3. Initialize your project (if not already done):
   ```bash
   netlify init
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```
   
5. For production deployment:
   ```bash
   npm run deploy:prod
   ```

## Verify Your Deployment

1. Check that the timer works properly
2. Test creating and managing tasks
3. Verify that the statistics displays correctly

## Troubleshooting

- **Blank screen after deployment**: Check the browser console for errors.
- **Routing problems**: The `netlify.toml` file should handle this, but check that it's included in your repository.

## Keeping Your Site Updated

When you make changes to your code:

1. Push changes to GitHub
2. Netlify will automatically deploy the updated version

You can also manually trigger a new deployment from the Netlify dashboard. 