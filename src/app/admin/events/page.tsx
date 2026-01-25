"use client";

import React, { useState } from "react";
import { Download, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, Tag, Popconfirm, message, Space, Modal, Form, Input } from "antd";
import { events as initialEvents } from "@/data/events";

const EventsPage = () => {
    // Transform initial data if necessary or use as is. 
    // Note: The public data file is read-only in this context, 
    // so we use it to initialize local state.
    const [events, setEvents] = useState(initialEvents);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [formEvent] = Form.useForm();

    const handleDeleteEvent = (id: string) => {
        setEvents(events.filter(item => item.id !== id));
        message.success("Đã xóa sự kiện");
    };

    const openCreateEventModal = () => {
        setEditingEvent(null);
        formEvent.resetFields();
        setIsEventModalOpen(true);
    };

    const openEditEventModal = (record: any) => {
        setEditingEvent(record);
        formEvent.setFieldsValue(record);
        setIsEventModalOpen(true);
    };

    const handleSaveEvent = (values: any) => {
        if (editingEvent) {
            setEvents(events.map(item => item.id === editingEvent.id ? { ...item, ...values } : item));
            message.success("Đã cập nhật sự kiện");
        } else {
            const newEvent = {
                id: `evt-${Date.now()}`,
                ...values,
                itinerary: [] // Default empty itinerary for new events
            };
            setEvents([newEvent, ...events]);
            message.success("Đã thêm sự kiện mới");
        }
        setIsEventModalOpen(false);
        formEvent.resetFields();
        setEditingEvent(null);
    };

    const columns = [
        {
            title: "HÌNH ẢNH",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                    <img src={image} alt="event" className="w-full h-full object-cover" />
                </div>
            )
        },
        {
            title: "SỰ KIỆN",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <span className="font-bold text-slate-900">{text}</span>
        },
        {
            title: "DANH MỤC",
            dataIndex: "category",
            key: "category",
            render: (category: string) => <Tag color="blue">{category}</Tag> // Simple tag for now
        },
        {
            title: "THỜI GIAN",
            key: "schedule",
            render: (_: any, record: any) => (
                <div className="flex flex-col text-sm">
                    <span className="font-medium">{record.date}</span>
                    <span className="text-slate-500">{record.time}</span>
                </div>
            )
        },
        {
            title: "ĐỊA ĐIỂM",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "GIÁ VÉ",
            dataIndex: "price",
            key: "price",
            render: (price: string) => <span className="font-medium text-slate-700">{price}</span>
        },
        {
            title: "",
            key: "action",
            align: 'right' as const,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-slate-100 rounded-full"
                        onClick={() => openEditEventModal(record)}
                    >
                        <Edit className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Popconfirm
                        title="Xóa sự kiện này?"
                        onConfirm={() => handleDeleteEvent(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-500 rounded-full">
                            <Trash2 className="h-4 w-4 text-slate-400" />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Xuất Excel
                    </Button>
                    <Button className="gap-2 bg-green-500 hover:bg-green-600" onClick={openCreateEventModal}>
                        <Plus className="h-4 w-4" />
                        Thêm sự kiện
                    </Button>
                </div>
            </div>

            <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={events}
                    rowKey="id"
                    pagination={{ pageSize: 8 }}
                    className="ant-table-custom"
                />
            </div>

            {/* Create/Edit Event Modal */}
            <Modal
                title={editingEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
                open={isEventModalOpen}
                onCancel={() => setIsEventModalOpen(false)}
                footer={null}
                width={700}
                style={{ top: 20 }}
            >
                <Form
                    form={formEvent}
                    layout="vertical"
                    onFinish={handleSaveEvent}
                    className="mt-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="title"
                            label="Tên sự kiện"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
                            className="col-span-2"
                        >
                            <Input placeholder="Ví dụ: Full Moon Party" />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Danh mục (Tag)"
                            rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
                        >
                            <Input placeholder="Ví dụ: Party, Live Show..." />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Giá vé"
                            rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}
                        >
                            <Input placeholder="Ví dụ: 199.000đ hoặc Miễn phí" />
                        </Form.Item>

                        <Form.Item
                            name="date"
                            label="Ngày diễn ra"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày!' }]}
                        >
                            <Input placeholder="Ví dụ: 24/10/2023" />
                        </Form.Item>

                        <Form.Item
                            name="time"
                            label="Thời gian"
                            rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                        >
                            <Input placeholder="Ví dụ: 20:00 - 02:00" />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label="Địa điểm"
                            rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
                            className="col-span-2"
                        >
                            <Input placeholder="Ví dụ: Bãi biển chính" />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="URL Hình ảnh"
                            className="col-span-2"
                        >
                            <Input placeholder="https://..." />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Mô tả ngắn"
                            className="col-span-2"
                        >
                            <Input.TextArea rows={2} placeholder="Mô tả ngắn hiển thị trên thẻ..." />
                        </Form.Item>

                        <Form.Item
                            name="longDescription"
                            label="Chi tiết sự kiện"
                            className="col-span-2"
                        >
                            <Input.TextArea rows={4} placeholder="Nội dung chi tiết (HTML hoặc text)..." />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => setIsEventModalOpen(false)}>Hủy</Button>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                            {editingEvent ? "Cập nhật" : "Lưu sự kiện"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default EventsPage;
