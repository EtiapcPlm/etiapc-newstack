"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al procesar la solicitud");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-700 p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-xl bg-slate-900 shadow-xl lg:grid-cols-2">
        {/* Left column with image */}
        <div className="relative flex flex-col justify-between bg-indigo-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">ETIAPC PLM</div>
            <Link
              href="/"
              className="flex items-center rounded-full bg-azul-principal px-3 py-1 text-sm text-white backdrop-blur-sm"
            >
              <span>Volver al inicio</span>
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/assets/images/profesor-login.jpg"
              alt="Profesor"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="mt-auto space-y-4">
            <h2 className="text-2xl font-bold">
              Sistema de Evaluación y
              <br />
              Acompañamiento Pedagógico
            </h2>
          </div>
        </div>

        {/* Right column with form */}
        <div className="flex flex-col justify-center p-6 lg:p-10">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-white">
              Recuperar contraseña
            </h1>
            <p className="text-sm text-slate-400">
              Ingresa tu correo electrónico y te enviaremos instrucciones para
              restablecer tu contraseña.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {success ? (
            <div className="space-y-4 rounded-lg bg-green-500/10 p-4 text-sm text-green-500">
              <p>
                Te hemos enviado un email con instrucciones para restablecer tu
                contraseña. Por favor revisa tu bandeja de entrada.
              </p>
              <p className="text-slate-400">
                ¿No recibiste el email?{" "}
                <button
                  onClick={() => {
                    setSuccess(false);
                    setError("");
                  }}
                  className="text-indigo-400 hover:underline"
                >
                  Intentar nuevamente
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />

              <Button
                type="submit"
                className="mt-6 w-full bg-azul-oscuro py-6 text-white hover:bg-azul-oscuro/70"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar instrucciones"}
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm text-indigo-400 hover:underline"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}