
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const body = await request.json();

        // If setting as featured, unset others first
        if (body.isFeatured) {
            await prisma.menuCategory.updateMany({
                where: {
                    isFeatured: true,
                    id: { not: params.id } // Optimization: don't touch current one if it was already true (though update covers it)
                },
                data: { isFeatured: false }
            });
        }

        const category = await prisma.menuCategory.update({
            where: { id: params.id },
            data: {
                name: body.name,
                color: body.color || 'default',
                layoutType: body.layoutType,
                isFeatured: body.isFeatured,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;

        // Check if category has any menus
        const menuCount = await prisma.menu.count({
            where: { categoryId: params.id }
        });

        if (menuCount > 0) {
            return NextResponse.json(
                { error: `Không thể xóa danh mục này vì còn ${menuCount} món ăn bên trong. Vui lòng xóa món ăn trước.` },
                { status: 400 }
            );
        }

        // Then delete the category
        await prisma.menuCategory.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete category error:", error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
