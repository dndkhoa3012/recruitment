"use client";

import React, { useState, useRef } from "react";
import { message, Table, Tag, Popconfirm, Space, Input, Button as AntButton } from "antd";
import type { InputRef, TableColumnType, TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { Download, Plus, Edit, Trash2, FilterX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MenuAdd } from "@/app/admin/menu/components/menu-add";
import { MenuEdit } from "@/app/admin/menu/components/menu-edit";

// --- Consolidated Mock Data ---
// --- Consolidated Mock Data ---
import { useMenu } from "./hooks/useMenu";

const MenuPage = () => {
    // ============================================================================
    // STATE MANAGEMENT
    // ============================================================================

    // --- Data State (via Hook) ---
    const { menus: menuItems, categories, loading, createMenu, updateMenu, deleteMenu } = useMenu();

    // --- Modal State ---
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // --- Table Filter & Search State ---
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
    const searchInput = useRef<InputRef>(null);

    // ============================================================================
    // HANDLERS: DATA MANIPULATION
    // ============================================================================

    const handleDeleteItem = async (id: string) => {
        await deleteMenu(id);
    };

    const openCreateItemModal = () => {
        setEditingItem(null);
        setIsItemModalOpen(true);
    };

    const openEditItemModal = (record: any) => {
        setEditingItem(record);
        setIsItemModalOpen(true);
    };

    const handleSaveItem = async (values: any) => {
        if (editingItem) {
            await updateMenu({
                ...editingItem,
                ...values,
                price: `${values.price}k`.replace('kk', 'k') // Simple format check
            });
        } else {
            await createMenu({
                name: values.name,
                category: values.category,
                price: `${values.price}k`.replace('kk', 'k'),
                desc: values.desc,
                image: values.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop"
            });
        }
        setIsItemModalOpen(false);
        setEditingItem(null);
    };

    // ============================================================================
    // HANDLERS: TABLE SEARCH & FILTER
    // ============================================================================

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: any,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleChange: TableProps<any>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    const clearAllFilters = () => {
        setFilteredInfo({});
        setSearchText('');
        setSearchedColumn('');
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchedColumn('');
    };

    const clearCategory = () => {
        const newFilteredInfo = { ...filteredInfo };
        delete newFilteredInfo.category;
        setFilteredInfo(newFilteredInfo);
    };

    // ============================================================================
    // TABLE COLUMNS CONFIGURATION
    // ============================================================================

    const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm theo tên mặt hàng`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <AntButton
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </AntButton>
                    <AntButton
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Xóa
                    </AntButton>
                    <AntButton
                        type="link"
                        size="small"
                        onClick={() => { close(); }}
                    >
                        Đóng
                    </AntButton>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const itemColumns = [
        {
            title: "HÌNH ẢNH",
            dataIndex: "image",
            key: "image",
            width: 150,
            render: (image: string) => (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img src={image} alt="food" className="w-full h-full object-cover" />
                </div>
            )
        },
        {
            title: "TÊN MÓN",
            dataIndex: "name",
            key: "name",
            width: 200,
            ...getColumnSearchProps('name'),
            filteredValue: searchText ? [searchText] : null,
        },
        {
            title: "DANH MỤC",
            dataIndex: "category",
            key: "category",
            width: 180,
            filters: categories.map(c => ({ text: c.name, value: c.name })),
            filteredValue: filteredInfo.category || null,
            onFilter: (value: any, record: any) => record.category === value,
            render: (categoryName: string) => {
                const category = categories.find(c => c.name === categoryName);
                return <Tag color={category?.color || 'default'}>{categoryName}</Tag>;
            }
        },
        {
            title: "MÔ TẢ",
            dataIndex: "desc",
            key: "desc",
            render: (text: string) => <span className="text-slate-500 line-clamp-2 max-w-[300px]">{text}</span>
        },
        {
            title: "GIÁ",
            dataIndex: "price",
            key: "price",
            width: 120,
            render: (price: string) => <span className="font-semibold text-slate-700">{price}</span>
        },
        {
            title: "",
            key: "action",
            width: 100,
            align: 'right' as const,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-slate-100 rounded-full"
                        onClick={() => openEditItemModal(record)}
                    >
                        <Edit className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Popconfirm
                        title="Xóa món này?"
                        onConfirm={() => handleDeleteItem(record.id)}
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

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* --- PAGE HEADER / TOOLBAR --- */}
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Xuất Excel
                    </Button>
                    <Button className="gap-2 bg-green-500 hover:bg-green-600" onClick={openCreateItemModal}>
                        <Plus className="h-4 w-4" />
                        Thêm món mới
                    </Button>
                </div>
            </div>

            {/* --- ACTIVE FILTERS SUMMARY --- */}
            {(searchText || (filteredInfo.category && filteredInfo.category.length > 0)) && (
                <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-slate-700">Đang lọc theo:</span>

                        {searchText && (
                            <Tag
                                closable
                                onClose={clearSearch}
                                className="flex items-center gap-1 bg-white border-blue-200 text-blue-700 m-0 py-1"
                            >
                                <span className="text-slate-500">Tên mặt hàng:</span>
                                <span className="font-medium">"{searchText}"</span>
                            </Tag>
                        )}

                        {filteredInfo.category && filteredInfo.category.length > 0 && (
                            <Tag
                                closable
                                onClose={clearCategory}
                                className="flex items-center gap-1 bg-white border-orange-200 text-orange-700 m-0 py-1"
                            >
                                <span className="text-slate-500">Danh mục:</span>
                                <span className="font-medium">
                                    {(filteredInfo.category as string[]).join(", ")}
                                </span>
                            </Tag>
                        )}
                    </div>

                    <AntButton
                        type="dashed"
                        danger
                        size="small"
                        onClick={clearAllFilters}
                        icon={<FilterX className="h-3.5 w-3.5" />}
                        className="flex items-center gap-1 bg-white"
                    >
                        Xóa tất cả bộ lọc
                    </AntButton>
                </div>
            )}

            {/* --- MAIN TABLE --- */}
            <div className="rounded-lg bg-white shadow-sm border overflow-hidden">
                <Table
                    loading={loading}
                    columns={itemColumns}
                    dataSource={menuItems}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 8,
                        showSizeChanger: true,
                        pageSizeOptions: ['8', '16', '32'],
                        locale: { items_per_page: '/ trang' },
                        showTotal: (total) => <span className="absolute left-6 font-medium text-slate-500">Có tất cả {total} mặt hàng</span>,
                        style: { paddingRight: '24px' },
                    }}
                    scroll={{ x: 1000 }}
                    className="ant-table-custom"
                    onChange={handleChange}
                />
            </div>

            {/* --- MODALS --- */}

            {/* Create/Edit Item Modal */}
            <MenuAdd
                open={isItemModalOpen && !editingItem}
                onCancel={() => {
                    setIsItemModalOpen(false);
                    setEditingItem(null);
                }}
                onSave={handleSaveItem}
                categories={categories}
            />

            {/* Edit Item Modal */}
            <MenuEdit
                open={isItemModalOpen && !!editingItem}
                onCancel={() => {
                    setIsItemModalOpen(false);
                    setEditingItem(null);
                }}
                onSave={handleSaveItem}
                initialValues={editingItem}
                categories={categories}
            />
        </div>
    );
};

export default MenuPage;
