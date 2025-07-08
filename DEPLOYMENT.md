# Deploying Your Clock App to Vercel

## Prerequisites
1. A Vercel account (sign up at https://vercel.com)
2. Your project files ready for deployment

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. In your project directory, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a Vite project
5. Click "Deploy"

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
1. In your project directory, run:
   ```bash
   vercel
   ```
2. Follow the prompts:
   - Link to existing project? No
   - What's your project's name? (enter your preferred name)
   - Which directory is your code located? ./
   - Want to override the settings? No

## Option 3: Deploy via Drag & Drop

### Step 1: Build the Project
1. Run the build command:
   ```bash
   npm run build
   ```
2. This creates a `dist/public` folder with your built application

### Step 2: Deploy
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Choose "Deploy from existing files"
4. Drag and drop the `dist/public` folder
5. Click "Deploy"

## Configuration Files

Your project includes:
- `vercel.json` - Vercel configuration for optimal deployment
- Built-in Vite configuration that's ready for production

## Key Features After Deployment

Your deployed clock app will have:
- ✅ Real-time clock display
- ✅ Timezone detection and hover tooltip
- ✅ 12/24 hour format toggle
- ✅ Adjustable clock size (8-20vw)
- ✅ Dark/light theme toggle
- ✅ Responsive design for all devices
- ✅ Lexend font for optimal readability

## Troubleshooting

If you encounter issues:
1. Make sure all files are committed to your repository
2. Check that the build command works locally: `npm run build`
3. Verify the `vercel.json` configuration is in your root directory
4. Check Vercel's deployment logs for specific error messages

## Domain Setup (Optional)

After deployment, you can:
1. Use the provided `.vercel.app` domain
2. Add a custom domain in your Vercel project settings
3. Configure SSL (automatically handled by Vercel)

Your clock app will be live and accessible worldwide once deployed!