'use client';

import { useState, useEffect } from 'react';
import { Table, Button, App, Popconfirm, Input, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
    const { message } = App.useApp();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                message.error('Không thể tải danh sách danh mục');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            message.error('Có lỗi xảy ra khi tải danh mục');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                message.success('Xóa danh mục thành công');
                fetchCategories();
            } else {
                message.error(data.error || 'Không thể xóa danh mục');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            message.error('Có lỗi xảy ra');
        }
    };

    const filteredCategories = categories.filter((cat: any) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <div>
                    <div className="font-semibold">{text}</div>
                    <div className="text-gray-500 text-xs">Slug: {record.slug}</div>
                </div>
            )
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => text || <span className="text-gray-400">—</span>
        },
        {
            title: 'Số công việc',
            dataIndex: ['_count', 'jobs'],
            key: 'jobCount',
            width: 120,
            align: 'center' as const,
            render: (count: number) => (
                <Tag color={count > 0 ? 'blue' : 'default'}>{count}</Tag>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 140,
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 120,
            align: 'center' as const,
            render: (_: any, record: any) => (
                <div className="flex gap-2 justify-center">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/admin/categories/${record.id}`)}
                    />
                    <Popconfirm
                        title="Xóa danh mục"
                        description={
                            record._count.jobs > 0
                                ? `Danh mục này có ${record._count.jobs} công việc. Bạn có chắc muốn xóa?`
                                : 'Bạn có chắc muốn xóa danh mục này?'
                        }
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        disabled={record._count.jobs > 0}
                    >
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            disabled={record._count.jobs > 0}
                        />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-end items-center">
                <Link href="/admin/categories/create">
                    <Button type="primary" icon={<PlusOutlined />}>
                        Thêm danh mục
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <Input
                        placeholder="Tìm kiếm danh mục..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="max-w-md"
                        size="large"
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredCategories}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} danh mục`
                    }}
                />
            </div>
        </div>
    );
}
