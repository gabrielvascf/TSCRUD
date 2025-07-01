import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Sistema CRUD",
  description: "Sistema de Gerenciamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
