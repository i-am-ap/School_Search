import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 8;
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    // Count total matching rows
    const [countRows] = await pool.query(
      "SELECT COUNT(*) as count FROM schools WHERE name LIKE ? OR address LIKE ? OR city LIKE ? OR state LIKE ?",
      [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
    );
    const total = countRows[0].count;

    // Fetch paginated & filtered rows
    const [rows] = await pool.query(
      "SELECT * FROM schools WHERE name LIKE ? OR address LIKE ? OR city LIKE ? OR state LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, limit, offset]
    );

    return new Response(JSON.stringify({ schools: rows, total, page, limit }), { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
