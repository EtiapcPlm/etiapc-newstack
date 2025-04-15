"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
    <div className="flex min-h-screen items-center justify-center bg-slate-700 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-lg bg-slate-900 p-8 text-center"
      >
        <h1 className="mb-4 text-2xl font-bold text-white">
          Verificación de Correo Electrónico
        </h1>

        {status === "loading" && (
          <div className="text-slate-300">
            <p>Verificando tu correo electrónico...</p>
            <div className="mt-4 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-azul-principal border-t-transparent"></div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <p className="text-verde-fuerte">{message}</p>
            <p className="text-slate-300">
              Serás redirigido a la página de inicio de sesión en unos segundos...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <p className="text-rojo-intenso">{message}</p>
            <Button asChild>
              <Link 
                href="/auth/login"
                className="inline-flex items-center justify-center bg-azul-principal px-4 py-2 text-sm font-medium text-white hover:bg-azul-principal/80"
              >
                Ir a iniciar sesión
              </Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}