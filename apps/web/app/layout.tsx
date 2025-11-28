import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@repo/ui";

export const metadata: Metadata = {
  title: "Auth System - Better Auth with RBAC",
  description: "Production-grade authentication and authorization system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
