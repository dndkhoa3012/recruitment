import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/jobs - Get all jobs with filtering/search
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const department = searchParams.get('department')
        const search = searchParams.get('search')

        const where: any = {}

        if (status && status !== 'all') {
            where.status = status
        }

        if (department && department !== 'all') {
            where.department = department
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ]
        }

        const jobs = await prisma.job.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { candidates: true }
                }
            }
        })

        return NextResponse.json(jobs)
    } catch (error) {
        console.error('Error fetching jobs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        )
    }
}

// POST /api/jobs - Create new job
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            title,
            department,
            location,
            type,
            salary,
            description,
            requirements,
            benefits,
            deadline
        } = body

        const job = await prisma.job.create({
            data: {
                title,
                department,
                location,
                type: type || 'full-time',
                salary,
                description,
                requirements,
                benefits,
                status: 'active',
                publishedAt: new Date(),
                deadline: deadline ? new Date(deadline) : null
            }
        })

        return NextResponse.json(job, { status: 201 })
    } catch (error) {
        console.error('Error creating job:', error)
        return NextResponse.json(
            { error: 'Failed to create job' },
            { status: 500 }
        )
    }
}
