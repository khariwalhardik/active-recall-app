# 🧠 Active Recall Web App

A powerful and minimal learning tool based on **active recall** and **spaced repetition**—built using **Next.js**, **PostgreSQL**, and enhanced with **Progressive Web App (PWA)** features.

---

## 🚀 Features

- 📚 **Library Page** – View all saved learnings
- 🏠 **Home Page** – Displays a random recall card on each visit
- ➕ **Add Learning** – Create and store your new learning items
- 🧭 **Navigation Bar** – Seamlessly move between pages
- 📲 **Progressive Web App (PWA)** – Installable with offline support
- 🔐 (Coming Soon) Authentication using NextAuth
- 🔔 (Coming Soon) Reminders & spaced review notifications

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router or Pages Router)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Backend**: API Routes (or Server Actions if App Router)
- **PWA**: `next-pwa` plugin

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/active-recall-app.git
cd active-recall-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your DB credentials to .env.local

# Run the app
npm run dev
