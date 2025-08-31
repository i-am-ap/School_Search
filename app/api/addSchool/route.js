// import { NextResponse } from "next/server";
// import  pool  from "@/lib/db"; // export default, hence no "{}"
// import path from "path";
// import fs from "fs/promises";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const name = formData.get("name");
//     const email_id = formData.get("email"); // frontend field is "email"
//     const contact = Number(formData.get("phone"));  // frontend field is "phone"
//     const address = formData.get("address");
//     const city = formData.get("city");
//     const state = formData.get("state");
//     const imageFile = formData.get("image");

//     // ✅ Save image to /public/schoolImages
//     let imagePath = null;
//     if (imageFile && imageFile.name) {
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       imagePath = `/schoolImages/${Date.now()}-${imageFile.name}`;
//       const filePath = path.join(process.cwd(), "public", imagePath);
//       await fs.writeFile(filePath, buffer);
//     }

//     // ✅ Check if school already exists (by email or name)
//     const [check] = await pool.query(
//       "SELECT * FROM schools WHERE email_id = ? OR name = ?",
//       [email_id, name]
//     );
//     if (check.length > 0) {
//       return NextResponse.json(
//         { error: "School with this email or name already exists" },
//         { status: 400 }
//       );
//     }

//     // ✅ Insert into DB
//     const [result] = await pool.query(
//       "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [name, address, city, state, contact, imagePath, email_id]
//     );
//     console.log("Insert result:", result);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }







import { NextResponse } from "next/server";
import pool from "../../../db";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Handle POST request
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image"); // uploaded file

    let imageUrl = "";

    if (file) {
      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload buffer to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "schoolImages" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imageUrl = result.secure_url;
    }

    // Save school details in DB
    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imageUrl, email_id]
    );

    return NextResponse.json({ message: "School added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
