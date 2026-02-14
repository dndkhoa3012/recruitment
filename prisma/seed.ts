import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const initialJobs = [
    {
        title: "Full Stack Developer",
        department: "Technology",
        location: "Hồ Chí Minh",
        type: "full-time",
        salary: "20-30 triệu VNĐ",
        description: "Chúng tôi đang tìm kiếm một Full Stack Developer có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
        requirements: "- 2+ năm kinh nghiệm với React và Node.js\n- Thành thạo TypeScript\n- Kinh nghiệm với PostgreSQL/MySQL\n- Hiểu biết về Git và CI/CD",
        benefits: "- Lương cạnh tranh\n- Bảo hiểm sức khỏe\n- 13th month salary\n- Team building hàng quý",
        status: "active",
        publishedAt: new Date(),
        deadline: new Date('2026-03-31T23:59:59')
    },
    {
        title: "Marketing Manager",
        department: "Marketing",
        location: "Hà Nội",
        type: "full-time",
        salary: "25-35 triệu VNĐ",
        description: "Quản lý và phát triển các chiến dịch marketing, xây dựng thương hiệu cho công ty.",
        requirements: "- 3+ năm kinh nghiệm trong lĩnh vực Marketing\n- Kỹ năng lập kế hoạch và quản lý dự án tốt\n- Thành thạo các công cụ Digital Marketing\n- Khả năng làm việc nhóm và lãnh đạo",
        benefits: "- Lương thưởng hấp dẫn\n- Cơ hội thăng tiến rõ ràng\n- Đào tạo chuyên môn\n- Môi trường làm việc năng động",
        status: "active",
        publishedAt: new Date(),
        deadline: new Date('2026-04-15T23:59:59')
    },
    {
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "full-time",
        salary: "15-25 triệu VNĐ",
        description: "Thiết kế giao diện người dùng và trải nghiệm người dùng cho các sản phẩm web và mobile.",
        requirements: "- 1+ năm kinh nghiệm thiết kế UI/UX\n- Thành thạo Figma, Adobe XD\n- Hiểu biết về design system\n- Portfolio ấn tượng",
        benefits: "- Làm việc từ xa\n- Thiết bị làm việc hiện đại\n- Work-life balance\n- Đào tạo và phát triển kỹ năng",
        status: "active",
        publishedAt: new Date(),
        deadline: new Date('2026-02-28T23:59:59')
    },
    {
        title: "Sales Executive",
        department: "Sales",
        location: "Phú Quốc",
        type: "full-time",
        salary: "12-18 triệu VNĐ + thưởng",
        description: "Tìm kiếm và phát triển khách hàng tiềm năng, chăm sóc khách hàng hiện tại.",
        requirements: "- Kinh nghiệm bán hàng từ 1 năm trở lên\n- Kỹ năng giao tiếp và thuyết phục tốt\n- Năng động, nhiệt tình\n- Có laptop và phương tiện đi lại",
        benefits: "- Hoa hồng hấp dẫn\n- Thưởng KPI hàng tháng\n- Đào tạo kỹ năng bán hàng\n- Cơ hội phát triển nghề nghiệp",
        status: "active",
        publishedAt: new Date(),
        deadline: new Date('2026-05-31T23:59:59')
    },
    {
        title: "HR Intern",
        department: "Human Resources",
        location: "Hồ Chí Minh",
        type: "internship",
        salary: "5-8 triệu VNĐ",
        description: "Hỗ trợ các hoạt động nhân sự, tuyển dụng và đào tạo nhân viên.",
        requirements: "- Sinh viên năm cuối hoặc mới tốt nghiệp\n- Nhiệt tình, ham học hỏi\n- Kỹ năng giao tiếp tốt\n- Thành thạo MS Office",
        benefits: "- Trợ cấp thực tập\n- Học hỏi kinh nghiệm thực tế\n- Cơ hội trở thành nhân viên chính thức\n- Môi trường trẻ trung, năng động",
        status: "active",
        publishedAt: new Date(),
        deadline: new Date('2026-03-15T23:59:59')
    }
];

async function main() {
    console.log(`Start seeding recruitment data...`)

    // Seed Jobs
    for (const job of initialJobs) {
        const existingJob = await prisma.job.findFirst({ where: { title: job.title } });
        if (!existingJob) {
            const createdJob = await prisma.job.create({
                data: job
            });
            console.log(`Created job: ${createdJob.title}`);
        } else {
            console.log(`Job ${job.title} already exists`);
        }
    }



    // Seed Admin User
    const adminUser = await prisma.user.findUnique({ where: { username: 'admin' } });
    if (!adminUser) {
        // Only create if not exists
        // In a real app, password should be hashed. Here we store plain text for simplicity or use a hash function if bcrypt is available.
        // Assuming simple usage or bcrypt logic to be added later in auth flow.
        // For now, let's store it as is or a placeholder hash. 
        // Let's use a simple placeholder or clear text if user hasn't set up hashing yet.
        await prisma.user.create({
            data: {
                username: 'admin',
                password: 'admin123', // TODO: Hash this in production!
                role: 'admin'
            }
        });
        console.log('Created admin user: admin');
    } else {
        console.log('Admin user already exists');
    }

    console.log(`Seeding finished.`)
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
