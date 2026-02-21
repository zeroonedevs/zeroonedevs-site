import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = () =>
  new TextEncoder().encode(
    process.env.JWT_SECRET ?? "zeroone-fallback-secret-2025"
  );

export async function createToken(userId: number, username: string) {
  return new SignJWT({ userId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { userId: number; username: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
