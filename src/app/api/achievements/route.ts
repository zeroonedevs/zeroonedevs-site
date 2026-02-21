import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await sql`SELECT * FROM achievements ORDER BY sort_order, id`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const [row] = await sql`
    INSERT INTO achievements (type, label, title, subtitle, description, stat, stat_label, bg_text, sort_order)
    VALUES (${b.type}, ${b.label ?? ""}, ${b.title ?? ""}, ${b.subtitle ?? ""},
            ${b.description ?? ""}, ${b.stat ?? ""}, ${b.stat_label ?? ""},
            ${b.bg_text ?? ""}, ${b.sort_order ?? 0})
    RETURNING *`;
  return NextResponse.json(row, { status: 201 });
}
