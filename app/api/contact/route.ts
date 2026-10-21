import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, phone, and message are required' },
        { status: 400 }
      );
    }

    const data: Record<string, any> = {
      id: Math.floor(Math.random() * 10000000),
    };
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone) data.phone = phone;
    if (message) data.message = message;

    const created = await prisma.contact_leads.create({ data });

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      data: {
        ...created,
        created_at: created.created_at.toISOString(),
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to create contact lead' },
      { status: 500 }
    );
  }
}
