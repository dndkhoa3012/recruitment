"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, Tag, Popconfirm, message, Space, Modal, Form, Input } from "antd";

import { initialCategories, initialMenuItems } from "@/app/admin/menu/menu-data";

const CategoriesPage = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formCategory] = Form.useForm();

    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter(cat => cat.id !== id));
        message.success("Đã xóa danh mục");
    };

    const openCreateCategoryModal = () => {
        setEditingCategory(null);
        formCategory.resetFields();
        setIsCategoryModalOpen(true);
    };

    const openEditCategoryModal = (record: any) => {
        setEditingCategory(record);
        formCategory.setFieldsValue(record);
        setIsCategoryModalOpen(true);
    };

    const handleSaveCategory = (values: any) => {
        if (editingCategory) {
            setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, ...values } : cat));
            message.success("Đã cập nhật danh mục");
        } else {
            const newCategory = {
                id: `cat${Date.now()}`,
                name: values.name,
                color: 'default'
            };
            setCategories([...categories, newCategory]);
            message.success("Đã thêm danh mục mới");
        }
        setIsCategoryModalOpen(false);
        formCategory.resetFields();
        setEditingCategory(null);
    };

    const categoryColumns = [
        {
            title: "TÊN DANH MỤC",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span className="font-medium">{text}</span>
        },
        {
            title: "SỐ LƯỢNG MÓN",
            key: "count",
            render: (_: any, record: any) => {
                const count = initialMenuItems.filter(item => item.category === record.name).length;
                return <span className="font-semibold text-slate-600 ml-4">{count}</span>;
            }
        },
        {
            title: "MÀU SẮC",
            dataIndex: "color",
            key: "color",
            render: (color: string) => <Tag color={color}>{color}</Tag>
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
                        onClick={() => openEditCategoryModal(record)}
                    >
                        <Edit className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Popconfirm
                        title="Xóa danh mục này?"
                        onConfirm={() => handleDeleteCategory(record.id)}
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
                <Button className="gap-2 bg-green-500 hover:bg-green-600" onClick={openCreateCategoryModal}>
                    <Plus className="h-4 w-4" />
                    Thêm danh mục
                </Button>
            </div>

            <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={categoryColumns}
                    dataSource={categories}
                    rowKey="id"
                    pagination={false}
                    className="ant-table-custom"
                />
            </div>

            {/* Create/Edit Category Modal */}
            <Modal
                title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                open={isCategoryModalOpen}
                onCancel={() => setIsCategoryModalOpen(false)}
                footer={null}
            >
                <Form
                    form={formCategory}
                    layout="vertical"
                    onFinish={handleSaveCategory}
                    className="mt-4"
                >
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input placeholder="Ví dụ: Hải Sản" />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsCategoryModalOpen(false)}>Hủy</Button>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                            {editingCategory ? "Cập nhật" : "Lưu danh mục"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoriesPage;
