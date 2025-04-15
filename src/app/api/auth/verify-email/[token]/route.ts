import { connectDB } from "@/lib/config/mongodb";
import User from "@/features/auth/models/user.model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    await connectDB();

    const user = await User.findOne({
      emailVerificationToken: params.token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    // Actualizar usuario
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verificado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al verificar email:", error);
    return NextResponse.json(
      { message: "Error al verificar el email" },
      { status: 500 }
    );
  }
}