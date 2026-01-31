import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.menuCategory.findMany({
            include: {
                _count: {
                    select: { menus: true }
                }
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // If setting as featured, unset others first
        if (body.isFeatured) {
            await prisma.menuCategory.updateMany({
                where: { isFeatured: true },
                data: { isFeatured: false }
            });
        }

        const category = await prisma.menuCategory.create({
            data: {
                name: body.name,
                color: body.color || 'default',
                layoutType: body.layoutType || 'SQUARE',
                isFeatured: body.isFeatured || false,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
