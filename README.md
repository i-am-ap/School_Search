# 🎓 School Search App

Welcome to **School Search**! 🌟 This is a modern, responsive web application that allows users to **add, view, and manage schools** efficiently. The app leverages **Next.js**, **Tailwind CSS**, **MySQL**, and **cloud services** to provide a fast and seamless experience.

🌐 **Live Demo:** (https://school-search-one.vercel.app)  

---

## 🚀 Features

- ✅ Add new schools with details like **name, address, city, state, contact, email**, and **image**  
- ✅ View schools in a **dynamic, responsive grid layout**  
- ✅ Upload school images to **Vercel Blob** for cloud storage  
- ✅ Search schools by **name or email**  
- ✅ Fully responsive for **mobile, tablet, and desktop**  

---

## 🛠️ Tech Stack & Tools

- **Frontend:**  
  - Next.js (React framework) ⚛️  
  - Tailwind CSS 🎨  
  - React Hooks (`useState`, `useEffect`)  

- **Backend & API:**  
  - Next.js API Routes 🖥️  
  - Node.js 🟢  
  - MySQL2 (`mysql2/promise`) 🛢️  

- **Database:**  
  - Railway Cloud DB 🌩️  
  - MySQL (managed in Railway)  

- **Cloud & Storage:**  
  - Vercel Deployment 🚀  
  - Vercel Blob Storage ☁️  

- **Other Tools & Skills:**  
  - FormData handling 📤  
  - File upload and storage 📸  
  - Responsive UI design 🖼️  
  - Grid layout with Tailwind CSS 🧩  
  - Environment variables management (`.env`) 🔐  

---

## 📷 Screenshots
<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/a4b28240-7aec-4358-9114-45d17a5d70f8" />

<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/41937726-8710-4cf1-9437-9ec481fc8586" />

<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/08520f10-bf3a-4078-8ec2-a305c3124683" />

---

## ⚡ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/i-am-ap/School_Search.git
   cd School_Search
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables (.env):**

   ```env
   DATABASE_URL=your_railway_mysql_url
   DB_SSL=true
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_rw_token
   ```

4. **Run locally:**

   ```bash
   npm run dev
   ```

5. **Visit:** `http://localhost:3000`

---

## 📂 Folder Structure

```
/app
 ├─ /api
 │   ├─ addSchool/route.js
 │   └─ getSchools/route.js
 ├─ /showSchools
 └─ /addSchool
/lib
 └─ db.js
/public
 └─ schoolImages (local only, production uses Vercel Blob)
```
````

## 💡 Notes

* All images are stored in **Vercel Blob** (cloud storage), not locally in production.
* Database is hosted on **Railway Cloud DB**. Deleting rows will **not delete images from Blob** automatically.
* Designed to be fully **responsive** using Tailwind CSS grid layouts.

---

## 👨‍💻 Author

**Developed & Designed with ❤️ by Aryan Palaspagar**
[Portfolio](https://devaryan-alpha.vercel.app/) 🌐

---

## 🎉 Enjoy exploring schools with this modern app! 🏫✨
