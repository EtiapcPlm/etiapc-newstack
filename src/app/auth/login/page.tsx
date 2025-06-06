"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Error al iniciar sesión");
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
              Iniciar sesión
            </h1>
            <p className="text-sm text-slate-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/auth/register" className="text-indigo-400 hover:underline">
                Regístrate
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

            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-indigo-400 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-azul-oscuro py-6 text-white hover:bg-azul-oscuro/70"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            O continuar con
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
