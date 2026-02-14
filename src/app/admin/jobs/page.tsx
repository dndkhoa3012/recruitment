"use client"

import { useState, useEffect } from "react"
import { Table, Button, Input, Select, Tag, Space, Popconfirm, message } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

const { Search } = Input

export default function JobsPage() {
    const router = useRouter()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        status: 'all',
        department: 'all',
        search: ''
    })

    const fetchJobs = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (filters.status !== 'all') params.append('status', filters.status)
            if (filters.department !== 'all') params.append('department', filters.department)
            if (filters.search) params.append('search', filters.search)

            const response = await fetch(`/api/jobs?${params.toString()}`)
            if (!response.ok) {
                throw new Error('Failed to fetch jobs')
            }
            const data = await response.json()
            setJobs(Array.isArray(data) ? data : [])
        } catch (error) {
            message.error('Không thể tải danh sách việc làm')
            console.error('Error fetching jobs:', error)
            setJobs([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [filters])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/jobs/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                message.success('Đã xóa việc làm thành công')
                fetchJobs()
            } else {
                message.error('Không thể xóa việc làm')
            }
        } catch (error) {
            message.error('Có lỗi xảy ra')
            console.error('Error deleting job:', error)
        }
    }

    const handleToggleStatus = async (job) => {
        try {
            const newStatus = job.status === 'active' ? 'inactive' : 'active'
            const response = await fetch(`/api/jobs/${job.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            if (response.ok) {
                message.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'tắt'} việc làm`)
                fetchJobs()
            } else {
                message.error('Không thể cập nhật trạng thái')
            }
        } catch (error) {
            message.error('Có lỗi xảy ra')
            console.error('Error toggling status:', error)
        }
    }

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            fixed: 'left' as const,
            render: (text, record) => (
                <Link href={`/admin/jobs/${record.id}`} className="text-blue-600 hover:underline">
                    {text}
                </Link>
            )
        },
        {
            title: 'Phòng ban',
            dataIndex: 'department',
            key: 'department',
            width: 150,
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
            width: 150,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type) => {
                const typeMap = {
                    'full-time': 'Toàn thời gian',
                    'part-time': 'Bán thời gian',
                    'contract': 'Hợp đồng',
                    'internship': 'Thực tập'
                }
                return typeMap[type] || type
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status, record) => {
                const statusConfig = {
                    active: { color: 'green', text: 'Đang tuyển' },
                    inactive: { color: 'default', text: 'Tạm dừng' },
                    closed: { color: 'red', text: 'Đã đóng' }
                }
                const config = statusConfig[status] || { color: 'default', text: status }
                return (
                    <Tag
                        color={config.color}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleStatus(record)}
                    >
                        {config.text}
                    </Tag>
                )
            }
        },
        {
            title: 'Ứng viên',
            dataIndex: ['_count', 'candidates'],
            key: 'candidates',
            width: 100,
            render: (count) => count || 0
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            width: 120,
            render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-'
        },
        {
            title: 'Hạn nộp',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 120,
            render: (date) => {
                if (!date) return '-'
                const isExpired = dayjs(date).isBefore(dayjs())
                return (
                    <span className={isExpired ? 'text-red-500' : ''}>
                        {dayjs(date).format('DD/MM/YYYY')}
                    </span>
                )
            }
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 150,
            fixed: 'right' as const,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/admin/jobs/${record.id}`)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa việc làm"
                        description="Bạn có chắc muốn xóa việc làm này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className="flex flex-col gap-4 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý Việc làm</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => router.push('/admin/jobs/create')}
                >
                    Tạo việc làm mới
                </Button>
            </div>

            <div className="flex gap-4 items-center bg-white p-4 rounded-lg">
                <Search
                    placeholder="Tìm kiếm theo tiêu đề..."
                    allowClear
                    style={{ width: 300 }}
                    onSearch={(value) => setFilters({ ...filters, search: value })}
                />
                <Select
                    style={{ width: 150 }}
                    value={filters.status}
                    onChange={(value) => setFilters({ ...filters, status: value })}
                >
                    <Select.Option value="all">Tất cả trạng thái</Select.Option>
                    <Select.Option value="active">Đang tuyển</Select.Option>
                    <Select.Option value="inactive">Tạm dừng</Select.Option>
                    <Select.Option value="closed">Đã đóng</Select.Option>
                </Select>
                <Select
                    style={{ width: 150 }}
                    value={filters.department}
                    onChange={(value) => setFilters({ ...filters, department: value })}
                >
                    <Select.Option value="all">Tất cả phòng ban</Select.Option>
                    <Select.Option value="Technology">Technology</Select.Option>
                    <Select.Option value="Marketing">Marketing</Select.Option>
                    <Select.Option value="Sales">Sales</Select.Option>
                    <Select.Option value="Design">Design</Select.Option>
                    <Select.Option value="Human Resources">Human Resources</Select.Option>
                </Select>
            </div>

            <div className="bg-white rounded-lg">
                <Table
                    columns={columns}
                    dataSource={jobs}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1500 }}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} việc làm`
                    }}
                />
            </div>
        </div>
    )
}
