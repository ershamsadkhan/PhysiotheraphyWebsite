# 🚀 Deploy PhysioCare Website to GitHub Pages
### Your website will be live at: `https://YOUR-USERNAME.github.io/physiocare-website/`

---

## METHOD 1 — GitHub Web Upload (No Terminal Needed) ✅ Easiest

### Step 1 — Create a GitHub Account (if you don't have one)
1. Go to **https://github.com/signup**
2. Sign up with your email

### Step 2 — Create a New Repository
1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name:** `physiocare-website`
   - **Visibility:** ✅ Public
   - **Add a README file:** ✅ tick this box
3. Click **"Create repository"**

### Step 3 — Upload Your Website Files
1. In your new repository, click **"Add file"** → **"Upload files"**
2. Drag and drop ALL files from your `PhysiotheraphyWebsite` folder:
   - `index.html`
   - `favicon.svg`
   - `css/` folder
   - `js/` folder
3. Scroll down, click **"Commit changes"**
4. **Repeat** — GitHub web upload only does one level at a time.
   - After uploading the root files, click "Add file" → "Create new file"
   - Type `css/style.css` as the filename, paste the content, commit
   - Type `js/main.js` as the filename, paste the content, commit

> **Tip:** The ZIP file is included. You can unzip it on your computer first, then upload all files at once by dragging the whole folder into the upload area.

### Step 4 — Enable GitHub Pages
1. In your repository, click **Settings** (top menu)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Branch"**, select `main` and folder `/root`
4. Click **Save**
5. Wait 2 minutes, then visit: `https://YOUR-USERNAME.github.io/physiocare-website/`

---

## METHOD 2 — Run the Deploy Script (Terminal) ✅ One Command

**Prerequisites:** Install GitHub CLI from https://cli.github.com

```bash
# Open Terminal, navigate to your PhysiotheraphyWebsite folder, then run:
bash deploy-to-github.sh
```

The script will:
1. Check for git and GitHub CLI
2. Ask you to log in to GitHub (if not already)
3. Create the repo and push all files
4. Enable GitHub Pages automatically
5. Print your live URL

---

## METHOD 3 — Netlify Drop (Instant, No Account Needed) ✅ Fastest

1. Go to **https://app.netlify.com/drop**
2. Drag your entire `PhysiotheraphyWebsite` folder onto the page
3. Your site is live instantly with a random URL like `https://random-name.netlify.app`
4. (Optional) Connect a custom domain later

---

## Your Website Details

| Item | Value |
|------|-------|
| Clinic Name | PhysioCare |
| Doctor | Dr. Shaheen Khan |
| Phone | +91 9769441453 |
| Address | Malvani Mhada, Malad West, Mumbai 400095 |
| WhatsApp | https://wa.me/919769441453 |

---

*If you get stuck on any step, just ask!*
