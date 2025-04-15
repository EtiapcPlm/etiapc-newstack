import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl font-bold underline">Dashboard</h1>
            <Link href="/" className="text-blue-500 hover:underline">
                Volver a la pagina de inicio
            </Link>
        </main>
    )
}