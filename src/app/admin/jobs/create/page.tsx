"use client"

import { Form, Input, Select, DatePicker, Button, message } from "antd"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

const { TextArea } = Input

export default function CreateJobPage() {
    const router = useRouter()
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
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
                <h1 className="text-2xl font-bold">Tạo việc làm mới</h1>
            </div>

            <div className="bg-white p-6 rounded-lg max-w-4xl">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        type: 'full-time',
                        status: 'active'
                    }}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input placeholder="VD: Full Stack Developer" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label="Phòng ban"
                            name="department"
                        >
                            <Input placeholder="VD: Technology" />
                        </Form.Item>

                        <Form.Item
                            label="Địa điểm"
                            name="location"
                            rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
                        >
                            <Input placeholder="VD: Hồ Chí Minh" />
                        </Form.Item>
                    </div>

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
                        <TextArea
                            rows={4}
                            placeholder="Nhập mô tả chi tiết về công việc..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Yêu cầu"
                        name="requirements"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Nhập các yêu cầu về kỹ năng, kinh nghiệm..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quyền lợi"
                        name="benefits"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Nhập các quyền lợi, phúc lợi..."
                        />
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
