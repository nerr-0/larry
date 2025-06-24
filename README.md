// 📘 README.md

# Sir Larry Photography – Full Stack Node.js App

This is a portfolio and booking web application for Sir Larry's photography business, built using Node.js, Express, MongoDB, and EJS.

---

## 🚀 Features
- Homepage with featured photos
- Portfolio section displaying all uploaded photos
- Packages page with pricing and options
- Booking form for clients to schedule photoshoots
- Contact page
- Admin login and dashboard to view/manage bookings

---

## 🛠️ Tech Stack
- **Node.js + Express** – server
- **MongoDB + Mongoose** – database
- **EJS** – templating
- **Multer** – file uploads (extendable)
- **Nodemailer** – email support (optional)
- **JWT + bcrypt** – secure admin auth

---

## 📂 Folder Structure
```
sir-larry-photography/
├── app.js
├── .env
├── package.json
├── models/
├── routes/
├── views/
├── public/
└── Procfile
```

---

## 🧪 Local Development

1. **Clone the repository**
```bash
git clone https://github.com/nerr-0/larry.git
cd larry
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

4. **Run the server**
```bash
npm run dev
```

Open your browser at `http://localhost:3000`

---

## 🌍 Deployment (Render / Railway)
1. Push your repo to GitHub
2. Go to [https://render.com](https://render.com) or [https://railway.app](https://railway.app)
3. Connect your GitHub repo
4. Set the environment variables (`MONGO_URI`)
5. Add a `Procfile`:
```
web: node app.js
```
6. Deploy and you’re live 🎉

---

## 👤 Create Admin (One-time Setup)
Use this script to create the first admin user:

**tools/createAdmin.js**
```js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashed = await bcrypt.hash('adminpassword', 10);
    await Admin.create({ username: 'sirlarry', password: hashed });
    console.log('Admin user created');
    mongoose.disconnect();
  });
```

Run:
```bash
node tools/createAdmin.js
```

---

## 📸 License
MIT – Use freely, make it yours.

---

Need help? DM the repo maintainer or submit an issue.
