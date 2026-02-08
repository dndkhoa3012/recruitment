"use client"

import { useState, useEffect } from "react"
import { Table, Button, Input, Select, Tag, Space, Popconfirm, message } from "antd"
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

const { Search } = Input

export default function CandidatesPage() {
    const router = useRouter()
    const [candidates, setCandidates] = useState([])
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        status: 'all',
        jobId: 'all',
        search: ''
    })

    const fetchCandidates = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (filters.status !== 'all') params.append('status', filters.status)
            if (filters.jobId !== 'all') params.append('jobId', filters.jobId)
            if (filters.search) params.append('search', filters.search)

            const response = await fetch(`/api/candidates?${params.toString()}`)
            const data = await response.json()
            setCandidates(data)
        } catch (error) {
            message.error('Không thể tải danh sách ứng viên')
            console.error('Error fetching candidates:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/jobs')
            const data = await response.json()
            setJobs(data)
        } catch (error) {
            console.error('Error fetching jobs:', error)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    useEffect(() => {
        fetchCandidates()
    }, [filters])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/candidates/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                message.success('Đã xóa ứng viên thành công')
                fetchCandidates()
            } else {
                message.error('Không thể xóa ứng viên')
            }
        } catch (error) {
            message.error('Có lỗi xảy ra')
            console.error('Error deleting candidate:', error)
        }
    }

    const handleStatusChange = async (candidateId, newStatus) => {
        try {
            const response = await fetch(`/api/candidates/${candidateId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            if (response.ok) {
                message.success('Đã cập nhật trạng thái')
                fetchCandidates()
            } else {
                message.error('Không thể cập nhật trạng thái')
            }
        } catch (error) {
            message.error('Có lỗi xảy ra')
            console.error('Error updating status:', error)
        }
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 200,
            fixed: 'left',
            render: (text, record) => (
                <Link href={`/admin/candidates/${record.id}`} className="text-blue-600 hover:underline">
                    {text}
                </Link>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 220,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 130,
        },
        {
            title: 'Vị trí ứng tuyển',
            dataIndex: ['job', 'title'],
            key: 'jobTitle',
            width: 250,
        },
        {
            title: 'Phòng ban',
            dataIndex: ['job', 'department'],
            key: 'department',
            width: 150,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status, record) => {
                const statusConfig = {
                    pending: { color: 'default', text: 'Chờ xử lý' },
                    reviewing: { color: 'blue', text: 'Đang xem xét' },
                    interviewed: { color: 'orange', text: 'Đã phỏng vấn' },
                    accepted: { color: 'green', text: 'Đã chấp nhận' },
                    rejected: { color: 'red', text: 'Từ chối' }
                }
                const config = statusConfig[status] || { color: 'default', text: status }
                return (
                    <Select
                        value={status}
                        style={{ width: '100%' }}
                        onChange={(value) => handleStatusChange(record.id, value)}
                    >
                        <Select.Option value="pending">Chờ xử lý</Select.Option>
                        <Select.Option value="reviewing">Đang xem xét</Select.Option>
                        <Select.Option value="interviewed">Đã phỏng vấn</Select.Option>
                        <Select.Option value="accepted">Đã chấp nhận</Select.Option>
                        <Select.Option value="rejected">Từ chối</Select.Option>
                    </Select>
                )
            }
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'appliedAt',
            key: 'appliedAt',
            width: 120,
            render: (date) => dayjs(date).format('DD/MM/YYYY')
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => router.push(`/admin/candidates/${record.id}`)}
                    >
                        Xem
                    </Button>
                    <Popconfirm
                        title="Xóa ứng viên"
                        description="Bạn có chắc muốn xóa ứng viên này?"
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
                <h1 className="text-2xl font-bold">Quản lý Ứng viên</h1>
            </div>

            <div className="flex gap-4 items-center bg-white p-4 rounded-lg">
                <Search
                    placeholder="Tìm kiếm theo tên, email, SĐT..."
                    allowClear
                    style={{ width: 350 }}
                    onSearch={(value) => setFilters({ ...filters, search: value })}
                />
                <Select
                    style={{ width: 150 }}
                    value={filters.status}
                    onChange={(value) => setFilters({ ...filters, status: value })}
                >
                    <Select.Option value="all">Tất cả trạng thái</Select.Option>
                    <Select.Option value="pending">Chờ xử lý</Select.Option>
                    <Select.Option value="reviewing">Đang xem xét</Select.Option>
                    <Select.Option value="interviewed">Đã phỏng vấn</Select.Option>
                    <Select.Option value="accepted">Đã chấp nhận</Select.Option>
                    <Select.Option value="rejected">Từ chối</Select.Option>
                </Select>
                <Select
                    style={{ width: 200 }}
                    value={filters.jobId}
                    onChange={(value) => setFilters({ ...filters, jobId: value })}
                >
                    <Select.Option value="all">Tất cả vị trí</Select.Option>
                    {jobs.map(job => (
                        <Select.Option key={job.id} value={job.id}>{job.title}</Select.Option>
                    ))}
                </Select>
            </div>

            <div className="bg-white rounded-lg">
                <Table
                    columns={columns}
                    dataSource={candidates}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1400 }}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} ứng viên`
                    }}
                />
            </div>
        </div>
    )
}
