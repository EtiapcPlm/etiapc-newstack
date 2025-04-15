import { connectDB } from "@/lib/config/mongodb";
import User from "@/features/auth/models/user.model";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/services/email/email.service";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "El correo electrónico es requerido" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No existe una cuenta con este correo electrónico" },
        { status: 404 }
      );
    }

    // Generar token de recuperación
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hora

    // Actualizar usuario con el token de recuperación
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Enviar correo electrónico
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: "Se ha enviado un enlace de recuperación a tu correo electrónico" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al procesar tu solicitud" },
      { status: 500 }
    );
  }
}