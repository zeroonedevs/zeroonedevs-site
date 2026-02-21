import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await sql`SELECT * FROM projects ORDER BY sort_order, id`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const [row] = await sql`
    INSERT INTO projects (cat, title, tag, body, tags, color, lines, sort_order)
    VALUES (${b.cat}, ${b.title}, ${b.tag}, ${b.body}, ${JSON.stringify(b.tags ?? [])},
            ${b.color ?? ""}, ${b.lines ?? ""}, ${b.sort_order ?? 0})
    RETURNING *`;
  return NextResponse.json(row, { status: 201 });
}
