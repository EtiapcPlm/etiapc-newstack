import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verifica tu correo electrónico - ETIAPC PLM",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #003366; text-align: center;">Bienvenido a ETIAPC PLM</h2>
        <p style="color: #666;">Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
             Verificar correo electrónico
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">Si no creaste una cuenta en ETIAPC PLM, puedes ignorar este correo.</p>
        <p style="color: #666; font-size: 14px;">Este enlace expirará en 24 horas.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error al enviar el email de verificación");
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Restablece tu contraseña - ETIAPC PLM",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #003366; text-align: center;">Restablecimiento de contraseña</h2>
        <p style="color: #666;">Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
             Restablecer contraseña
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
        <p style="color: #666; font-size: 14px;">Este enlace expirará en 1 hora.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error al enviar el email de restablecimiento de contraseña");
  }
}