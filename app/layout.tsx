import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Almeida Goat | Links",
  description: "Proposta para trabalhar comigo",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-black">{children}</body>
    </html>
  );
}
