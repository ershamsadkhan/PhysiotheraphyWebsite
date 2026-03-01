#!/bin/bash
# ================================================
# PhysioKhan — Deploy to GitHub Pages
# Run this script ONCE from your terminal:
#   bash deploy-to-github.sh
# ================================================

set -e  # stop on any error

# ---- Colours for output ----
GREEN='\033[0;32m'
TEAL='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Colour

echo ""
echo -e "${TEAL}============================================${NC}"
echo -e "${TEAL}  PhysioKhan — GitHub Pages Deploy Script  ${NC}"
echo -e "${TEAL}============================================${NC}"
echo ""

# ---- Step 1: Check git is installed ----
if ! command -v git &> /dev/null; then
  echo -e "${RED}✗ git is not installed. Download from https://git-scm.com${NC}"
  exit 1
fi
echo -e "${GREEN}✓ git found${NC}"

# ---- Step 2: Check gh CLI is installed ----
if ! command -v gh &> /dev/null; then
  echo -e "${RED}✗ GitHub CLI (gh) is not installed.${NC}"
  echo "  Download from: https://cli.github.com"
  echo "  Then re-run this script."
  exit 1
fi
echo -e "${GREEN}✓ GitHub CLI found${NC}"

# ---- Step 3: Check gh auth ----
if ! gh auth status &> /dev/null; then
  echo ""
  echo -e "${TEAL}→ You are not logged in to GitHub. Launching login...${NC}"
  gh auth login
fi
echo -e "${GREEN}✓ GitHub authenticated${NC}"

# ---- Step 4: Remove any broken .git and init fresh ----
echo ""
echo -e "${TEAL}→ Initialising git repository...${NC}"
rm -rf .git
git init
git checkout -b main
git config user.email "shammyk123@gmail.com"
git config user.name "Dr Shaheen Khan"
echo -e "${GREEN}✓ git initialised on branch: main${NC}"

# ---- Step 5: Stage and commit all files ----
git add .
git commit -m "Initial commit — PhysioKhan clinic website

Physeo-inspired physiotherapy website:
- Full-screen hero carousel (3 slides, autoplay + swipe)
- Floating pill navbar + dark teal info bar
- 13 physiotherapy service cards
- Home visits banner, animated stats, testimonials
- Tap-to-call phone + WhatsApp button
- SEO optimised (JSON-LD schema, meta tags)
- Fully mobile responsive"

echo -e "${GREEN}✓ Files committed${NC}"

# ---- Step 6: Create GitHub repo and push ----
echo ""
echo -e "${TEAL}→ Creating GitHub repository and pushing...${NC}"
gh repo create physiokhan-website \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "Dr. Shaheen Khan Physiotherapy Clinic website — Malad West, Mumbai"

echo -e "${GREEN}✓ Pushed to GitHub${NC}"

# ---- Step 7: Enable GitHub Pages ----
echo ""
echo -e "${TEAL}→ Enabling GitHub Pages on branch main...${NC}"

GITHUB_USER=$(gh api user --jq '.login')
REPO="physiokhan-website"

gh api "repos/${GITHUB_USER}/${REPO}/pages" \
  --method POST \
  --field "source[branch]=main" \
  --field "source[path]=/" \
  2>/dev/null || echo "(Pages may already be enabled or needs a moment)"

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  🎉 DONE! Your website is live at:        ${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "  🌐  https://${GITHUB_USER}.github.io/${REPO}/"
echo ""
echo -e "  📁  GitHub Repo:"
echo -e "  https://github.com/${GITHUB_USER}/${REPO}"
echo ""
echo -e "${TEAL}Note: GitHub Pages takes 1-2 minutes to go live.${NC}"
echo -e "${TEAL}Refresh the URL after 2 minutes if it shows 404.${NC}"
echo ""
