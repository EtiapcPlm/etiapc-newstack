import { connectDB } from "@/lib/config/mongodb";
import User from "@/features/auth/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/services/email/email.service";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    // Validar datos
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El correo electrónico ya está registrado" },
        { status: 409 }
      );
    }

    // Generar token de verificación
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "TEACHER",
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    // Enviar email de verificación
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        message: "Usuario registrado exitosamente. Por favor verifica tu correo electrónico.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { message: "Error al registrar el usuario" },
      { status: 500 }
    );
  }
}