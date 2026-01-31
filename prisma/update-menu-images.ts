import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updates = [
    // --- Bia & Rượu ---
    { name: "Bia Sài Gòn Special", image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9" },
    { name: "Bia Tiger Crystal", image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9" }, // Generic amber beer bottle
    { name: "Heineken", image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8" },
    { name: "Corona Extra", image: "https://images.unsplash.com/photo-1606041724263-d49d94b0598f" },
    { name: "Rượu Vang Đỏ (Ly)", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3" },
    { name: "Coca Cola", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" }, // Coke specific
    { name: "Dừa Tươi", image: "https://images.unsplash.com/photo-1574226511250-f632d6d22384" }, // Coconut

    // --- Món Khai Vị ---
    { name: "Khoai tây chiên", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d" },
    { name: "Chả Giò Hải Sản", image: "https://images.unsplash.com/photo-1544601284-2630b381511e" },
    { name: "Mực Chiên Giòn", image: "https://images.unsplash.com/photo-1599487488170-d1127175f5ea" },
    { name: "Cánh Gà Chiên Nước Mắm", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec" }, // Fried chicken
    { name: "Gỏi Xoài Tôm Khô", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2" }, // Mango saladish
    { name: "Bánh Mì Bơ Tỏi", image: "https://images.unsplash.com/photo-1573140247632-f84660f67627" },

    // --- Món Chính ---
    { name: "Signature Beef Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { name: "Mỳ Ý Carbonara", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3" },
    { name: "Pizza Margherita", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002" },
    { name: "Cơm Chiên Hải Sản", image: "https://images.unsplash.com/photo-1603133872878-684f108fd4f4" }, // Fried rice
    { name: "Bò Bít Tết (Ribeye Steak)", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e" },
    { name: "Club Sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af" },

    // --- Tráng Miệng ---
    { name: "Đĩa Trái Cây Nhiệt Đới", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b" },
    { name: "Kem Dừa", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a" },
    { name: "Bánh Chocolate", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" }
];

async function main() {
    console.log(`Starting image updates...`);

    for (const item of updates) {
        try {
            const updated = await prisma.menu.updateMany({
                where: { name: item.name },
                data: { image: item.image }
            });
            if (updated.count > 0) {
                console.log(`Updated image for: ${item.name}`);
            } else {
                console.warn(`Item not found: ${item.name}`);
            }
        } catch (error) {
            console.error(`Failed to update ${item.name}:`, error);
        }
    }

    console.log(`Finished updating images.`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
