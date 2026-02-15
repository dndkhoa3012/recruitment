"use client"

import { useState, useEffect } from "react"
import { Form, Input, Select, DatePicker, Button, App, Alert, InputNumber } from "antd"
import { useRouter } from "next/navigation"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Link from "next/link"
import dayjs from "dayjs"
import DescriptionEditor from "@/components/admin/DescriptionEditor"
import RequirementsEditor from "@/components/admin/RequirementsEditor"
import BenefitsEditor from "@/components/admin/BenefitsEditor"

export default function CreateJobPage() {
    const { message } = App.useApp()
    const router = useRouter()
    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories')
            if (response.ok) {
                const data = await response.json()
                setCategories(data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setLoadingCategories(false)
        }
    }

    const onFinish = async (values) => {
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    // Convert structured data to JSON strings
                    description: JSON.stringify(values.description),
                    requirements: JSON.stringify(values.requirements),
                    benefits: JSON.stringify(values.benefits),
                    deadline: values.deadline ? values.deadline.toISOString() : null
                })
            })

            if (response.ok) {
                message.success('Tạo việc làm thành công')
                router.push('/admin/jobs')
            } else {
                message.error('Không thể tạo việc làm')
            }
        } catch (error) {
            message.error('Có lỗi xảy ra')
            console.error('Error creating job:', error)
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                >
                    Quay lại
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg max-w-4xl">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        type: 'full-time',
                        status: 'active',
                        description: { intro: '', points: [''] },
                        requirements: [''],
                        benefits: [{ icon: 'home_work', text: '' }]
                    }}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input placeholder="VD: Nhân viên kinh doanh" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label="Danh mục"
                            name="categoryId"
                        >
                            <Select
                                placeholder="Chọn danh mục"
                                loading={loadingCategories}
                                allowClear
                            >
                                {categories.map((cat: any) => (
                                    <Select.Option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Địa điểm"
                            name="location"
                            rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
                        >
                            <Input placeholder="VD: Dương Đông" />
                        </Form.Item>
                    </div>

                    {categories.length === 0 && !loadingCategories && (
                        <Alert
                            message="Chưa có danh mục nào"
                            description={
                                <span>
                                    Bạn cần tạo danh mục trước. <Link href="/admin/categories/create" className="text-blue-600 hover:underline">Tạo danh mục ngay</Link>
                                </span>
                            }
                            type="info"
                            showIcon
                            className="mb-4"
                        />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label="Loại"
                            name="type"
                        >
                            <Select>
                                <Select.Option value="full-time">Toàn thời gian</Select.Option>
                                <Select.Option value="part-time">Bán thời gian</Select.Option>
                                <Select.Option value="contract">Hợp đồng</Select.Option>
                                <Select.Option value="internship">Thực tập</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Mức lương"
                            name="salary"
                        >
                            <Input placeholder="VD: 20-30 triệu VNĐ" />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng tuyển"
                            name="quantity"
                            initialValue={1}
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} placeholder="VD: 5" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Hạn nộp hồ sơ"
                        name="deadline"
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày hết hạn"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả công việc"
                        name="description"
                    >
                        <DescriptionEditor />
                    </Form.Item>

                    <Form.Item
                        label="Yêu cầu"
                        name="requirements"
                    >
                        <RequirementsEditor />
                    </Form.Item>

                    <Form.Item
                        label="Quyền lợi"
                        name="benefits"
                    >
                        <BenefitsEditor />
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <div className="flex gap-2 justify-end">
                            <Button onClick={() => router.back()}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Tạo việc làm
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
