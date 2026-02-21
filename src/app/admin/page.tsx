"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[.2em] text-white/25">Admin</p>
        <h1 className="mb-8 text-2xl font-black tracking-tight text-white">
          Zero<span className="text-blue-500">One</span>.
        </h1>

        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[.2em] text-white/30">
              Username
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border-b border-white/[.1] bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[.2em] text-white/30">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-white/[.1] bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="font-mono text-[10px] text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <p className="mt-8 font-mono text-[9px] text-white/15">
          First time? POST /api/seed to initialise the database.
        </p>
      </div>
    </div>
  );
}
