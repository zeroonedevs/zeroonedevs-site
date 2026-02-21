import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const b = await req.json();
  const [row] = await sql`
    UPDATE projects SET cat=${b.cat}, title=${b.title}, tag=${b.tag}, body=${b.body},
      tags=${JSON.stringify(b.tags ?? [])}, color=${b.color ?? ""}, lines=${b.lines ?? ""},
      sort_order=${b.sort_order ?? 0}
    WHERE id=${id} RETURNING *`;
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await sql`DELETE FROM projects WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
