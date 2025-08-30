import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
