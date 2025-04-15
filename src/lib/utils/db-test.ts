import { connectDB } from '../config/mongodb';
import User from '@/features/auth/models/user.model';

export async function testDatabaseConnection() {
  try {
    await connectDB();
    console.log('✅ MongoDB connection successful');
    
    // Intentar crear un usuario de prueba
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'TEACHER' as const,
    };

    // Comprobar si el usuario ya existe
    const existingUser = await User.findOne({ email: testUser.email });
    
    if (!existingUser) {
      await User.create(testUser);
      console.log('✅ Test user created successfully');
    } else {
      console.log('ℹ️ Test user already exists');
    }

    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}