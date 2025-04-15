"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      router.push("/auth/login?message=Registro exitoso. Por favor, verifica tu correo electrónico");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario");
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
        <div className="flex flex-col p-6 lg:p-10">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-white">
              Crear una cuenta
            </h1>
            <p className="text-sm text-slate-400">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-indigo-400 hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Nombre completo"
              required
              value={formData.name}
              onChange={handleChange}
              className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
            />

            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              required
              value={formData.email}
              onChange={handleChange}
              className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
            />

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
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
                placeholder="Confirmar contraseña"
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            O regístrate con
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/api/auth/signin")}
              className="w-full border-azul-oscuro bg-azul-principal text-white hover:bg-azul-principal/80"
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                  fill="currentColor"
                />
              </svg>
              Continuar con Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}