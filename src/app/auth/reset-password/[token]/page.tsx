"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.token,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al restablecer la contraseña");
      }

      router.push("/auth/login?message=Contraseña actualizada exitosamente");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al restablecer la contraseña"
      );
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
              Restablecer contraseña
            </h1>
            <p className="text-sm text-slate-400">
              Ingresa tu nueva contraseña para actualizar tu cuenta.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                required
                value={formData.password}
                onChange={handleChange}
                className="border-slate-700 bg-slate-800 pr-10 text-white placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar nueva contraseña"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-slate-700 bg-slate-800 pr-10 text-white placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-azul-oscuro py-6 text-white hover:bg-azul-oscuro/70"
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Actualizar contraseña"}
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
        </div>
      </div>
    </div>
  );
}