import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { put } from "@vercel/blob";

// GET school by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const [rows] = await pool.query("SELECT * FROM schools WHERE id = ?", [id]);

    if (!rows.length) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update school
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const imageFile = formData.get("image");
    const existingImage = formData.get("existingImage");

    let imageUrl = existingImage || null;

    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const blob = await put(`${Date.now()}-${imageFile.name}`, buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      imageUrl = blob.url;
    }

    const [result] = await pool.query(
      "UPDATE schools SET name=?, address=?, city=?, image=? WHERE id=?",
      [name, address, city, imageUrl, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, imageUrl });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// DELETE school
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const [result] = await pool.query("DELETE FROM schools WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
