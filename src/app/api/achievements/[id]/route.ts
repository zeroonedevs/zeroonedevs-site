import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const b = await req.json();
  const [row] = await sql`
    UPDATE achievements SET type=${b.type}, label=${b.label ?? ""}, title=${b.title ?? ""},
      subtitle=${b.subtitle ?? ""}, description=${b.description ?? ""}, stat=${b.stat ?? ""},
      stat_label=${b.stat_label ?? ""}, bg_text=${b.bg_text ?? ""}, sort_order=${b.sort_order ?? 0}
    WHERE id=${id} RETURNING *`;
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await sql`DELETE FROM achievements WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
