import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const b = await req.json();
  const [row] = await sql`
    UPDATE team_members SET name=${b.name}, role=${b.role ?? ""}, stack=${b.stack ?? ""},
      bio=${b.bio ?? ""}, bg_color=${b.bg_color ?? "#181818"}, skin_color=${b.skin_color ?? "#8a7260"},
      hair_color=${b.hair_color ?? "#0e0e0e"}, hair_type=${b.hair_type ?? "short"},
      shoulder_tone=${b.shoulder_tone ?? "#222"}, sort_order=${b.sort_order ?? 0}
    WHERE id=${id} RETURNING *`;
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await sql`DELETE FROM team_members WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
