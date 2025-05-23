import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/utils/db-test';

export async function GET() {
  try {
    const isConnected = await testDatabaseConnection();
    
    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Database connection successful',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Database connection failed',
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}