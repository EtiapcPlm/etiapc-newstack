import { connectDB } from "@/lib/config/mongodb";
import User from "@/features/auth/models/user.model";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/services/email/email.service";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    // Verificar que se proporcionó un email
    if (!email) {
      return NextResponse.json(
        { message: "El correo electrónico es requerido" },
        { status: 400 }
      );
    }

    // Buscar al usuario
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "No existe una cuenta con este correo electrónico" },
        { status: 404 }
      );
    }

    // Generar token de restablecimiento
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Actualizar usuario con el token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Enviar email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: "Se ha enviado un email con las instrucciones" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return NextResponse.json(
      { message: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}