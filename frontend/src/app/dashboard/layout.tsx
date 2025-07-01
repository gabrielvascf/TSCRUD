"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // ou um spinner de carregamento
  }

  return (
    <section>
      <nav>
        <Link href="/dashboard">Dashboard</Link> |{" "}
        <Link href="/dashboard/users">Usuários</Link>
        <button onClick={logout} style={{ marginLeft: "20px" }}>
          Sair
        </button>
      </nav>
      <hr />
      {children}
    </section>
  );
}
