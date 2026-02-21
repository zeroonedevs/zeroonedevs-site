export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#efefef", fontFamily: "Inter, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
