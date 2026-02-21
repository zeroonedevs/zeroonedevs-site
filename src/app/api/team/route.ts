import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await sql`SELECT * FROM team_members ORDER BY sort_order, id`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const [row] = await sql`
    INSERT INTO team_members (name, role, stack, bio, bg_color, skin_color, hair_color, hair_type, shoulder_tone, sort_order)
    VALUES (${b.name}, ${b.role ?? ""}, ${b.stack ?? ""}, ${b.bio ?? ""},
            ${b.bg_color ?? "#181818"}, ${b.skin_color ?? "#8a7260"}, ${b.hair_color ?? "#0e0e0e"},
            ${b.hair_type ?? "short"}, ${b.shoulder_tone ?? "#222"}, ${b.sort_order ?? 0})
    RETURNING *`;
  return NextResponse.json(row, { status: 201 });
}
