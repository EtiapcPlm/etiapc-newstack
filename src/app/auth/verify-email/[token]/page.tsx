"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email/${params.token}`, {
          method: "GET",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error al verificar el correo");
        }

        setStatus("success");
        setMessage(data.message);
        setTimeout(() => {
          router.push("/auth/login?message=Email verificado exitosamente");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Error al verificar el correo"
        );
      }
    };

    if (params.token) {
      verifyEmail();
    }
  }, [params.token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-slate-800 p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">
          Verificación de Correo Electrónico
        </h1>

        {status === "loading" && (
          <div className="text-slate-300">
            <p>Verificando tu correo electrónico...</p>
            <div className="mt-4 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <p className="text-green-500">{message}</p>
            <p className="text-slate-300">
              Serás redirigido a la página de inicio de sesión en unos segundos...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <p className="text-red-500">{message}</p>
            <Button asChild>
              <Link href="/auth/login">Ir a iniciar sesión</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}