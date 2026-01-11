# GitHub Setup Guide

## Step 1: Install Git (if not installed)

### Windows:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart your terminal/PowerShell after installation

### Verify Installation:
```powershell
git --version
```

## Step 2: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Git Repository

```powershell
# Navigate to project root
cd D:\chart

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Amazon-like e-commerce platform"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com
2. Sign in (or create account)
3. Click the **"+"** icon in top right → **"New repository"**
4. Repository name: `amazon-ecommerce` (or your choice)
5. Description: `Full-stack Amazon-like e-commerce platform with React and Node.js`
6. Choose **Public** or **Private**
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **"Create repository"**

## Step 5: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```powershell
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/amazon-ecommerce.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify

1. Go to your GitHub repository page
2. You should see all your files uploaded
3. The README.md will display automatically

## Future Updates

To push future changes:

```powershell
# Check status
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Important Notes

### Files NOT uploaded to GitHub:
- `node_modules/` - Dependencies (too large, users install with `npm install`)
- `.env` files - Contains secrets (API keys, passwords)
- `data/*.json` - User data and orders (privacy)
- Build files - Generated files

### Files uploaded:
- All source code
- `package.json` files
- README and documentation
- Configuration files (without secrets)

## Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart terminal after installation

### "Authentication failed"
- Use GitHub Personal Access Token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Generate new token with `repo` permissions
- Use token as password when pushing

### "Repository not found"
- Check repository name and username
- Verify you have access to the repository

### "Large file" errors
- Make sure `node_modules/` is in `.gitignore`
- If already committed: `git rm -r --cached node_modules`

## Quick Commands Reference

```powershell
# Initialize repository
git init

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Add remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git push -u origin main

# View remotes
git remote -v

# Pull latest changes
git pull origin main
```

