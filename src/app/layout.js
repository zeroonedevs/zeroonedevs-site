import "./globals.css";

export const metadata = {
  title: "ZeroOne CodeClub | KL SAC",
  description: "Official website of ZeroOne CodeClub under KL SAC."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
