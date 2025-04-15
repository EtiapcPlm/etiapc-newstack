import Link from "next/link";
import { EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-700 p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-xl bg-slate-900 shadow-xl lg:grid-cols-2">
        {/* Left column with image */}
        <div className="relative flex flex-col justify-between bg-indigo-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">AMU</div>
            <Link
              href="#"
              className="flex items-center rounded-full bg-azul-principal px-3 py-1 text-sm text-white backdrop-blur-sm"
            >
              <span>Back to website</span>
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <img src="../../../assets/images/profesor-login.jpg" alt="Desert landscape" className="w-full object-cover"/>
          </div>

          <div className="mt-auto space-y-4">
            <h2 className="text-2xl font-bold">
              Capturing Moments,
              <br />
              Creating Memories
            </h2>
            <div className="flex space-x-2">
              <div className="h-1 w-8 rounded-full bg-white"></div>
              <div className="h-1 w-2 rounded-full bg-white/50"></div>
              <div className="h-1 w-2 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>

        {/* Right column with form */}
        <div className="flex flex-col p-6 lg:p-10">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-white">
              Create an account
            </h1>
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="#" className="text-indigo-400 hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <Input
                type="text"
                placeholder="First name"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last name"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <Input
              type="email"
              placeholder="Email"
              className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="relative mt-4">
            <Input
              type="password"
              placeholder="Enter your password"
              className="border-slate-700 bg-slate-800 pr-10 text-white placeholder:text-slate-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="border-slate-600 data-[state=checked]:bg-indigo-500"
            />
            <label htmlFor="terms" className="text-sm text-slate-300">
              I agree to the{" "}
              <Link href="#" className="text-indigo-400 hover:underline">
                Terms & Conditions
              </Link>
            </label>
          </div>

          <Button className="mt-6 bg-azul-oscuro py-6 text-white hover:bg-azul-oscuro/70">
            Create account
          </Button>

          <div className="mt-6 text-center text-sm text-slate-400">
            Or register with
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-azul-oscuro bg-azul-principal text-white hover:bg-azul-principal/80"
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
              Google
            </Button>
            <Button
              variant="outline"
              className="border-azul-oscuro bg-azul-principal text-white hover:bg-azul-principal/80"
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24.02-1.44.62-2.2.44-3.06-.35C2.79 15.37 3.51 7.08 9.05 6.88c1.33.07 2.23.82 3.03.89.96-.14 1.87-.95 3.16-.84 1.36.12 2.4.67 3.09 1.67-2.48 1.64-1.91 4.6.17 5.5-.65 1.64-1.49 3.27-2.45 5.18zM12.03 6.36c-.26-2.32 1.69-4.27 3.8-4.36.31 2.18-1.92 4.29-3.8 4.36z"
                  fill="currentColor"
                />
              </svg>
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
