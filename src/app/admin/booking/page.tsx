"use client";

import React, { useState } from "react";
import {
    Download,
    Plus,
    MoreVertical,
    Check,
    X,
    FileText,
    CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Might be unused if filters are gone
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table } from "antd";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const bookings = [
    {
        id: 1,
        customer: {
            name: "Nguyễn Văn Minh",
            phone: "090 123 4567",
            avatar: "NM",
            color: "bg-blue-500",
        },
        date: "24/10/2023",
        time: "19:30",
        guests: 4,
        area: "VIP Sofa",
        note: "Sinh nhật, cần bánh kem",
        status: "pending", // pending, confirmed, cancelled
    },
    {
        id: 2,
        customer: {
            name: "Trần Thị Hương",
            phone: "091 234 5678",
            avatar: "/avatars/02.png", // Assuming image exists, using fallback if not
            isImage: true,
        },
        date: "24/10/2023",
        time: "20:00",
        guests: 2,
        area: "Beach Front",
        note: "-",
        status: "confirmed",
    },
    {
        id: 3,
        customer: {
            name: "John Lee",
            phone: "098 765 4321",
            avatar: "JL",
            color: "bg-purple-500",
        },
        date: "24/10/2023",
        time: "18:00",
        guests: 6,
        area: "Garden Area",
        note: "Cần ghế trẻ em",
        status: "confirmed",
    },
    {
        id: 4,
        customer: {
            name: "Phạm Văn Đức",
            phone: "093 333 4444",
            avatar: "/avatars/04.png",
            isImage: true,
        },
        date: "24/10/2023",
        time: "21:00",
        guests: 2,
        area: "Bar Counter",
        note: "-",
        status: "cancelled",
    },
    {
        id: 5,
        customer: {
            name: "Lê Thị Hoa",
            phone: "096 789 0123",
            avatar: "LH",
            color: "bg-emerald-500",
        },
        date: "24/10/2023",
        time: "20:30",
        guests: 8,
        area: "Party Zone",
        note: "Đặt cọc trước 50%",
        status: "pending",
    },
];

const BookingPage = () => {
    const [filterStatus, setFilterStatus] = useState("all");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50 flex gap-1 items-start w-fit"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                        <div className="flex flex-col text-xs leading-tight">
                            <span>Chờ</span>
                            <span>xác nhận</span>
                        </div>
                    </Badge>
                );
            case "confirmed":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 flex gap-1 items-start w-fit"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                        <div className="flex flex-col text-xs leading-tight">
                            <span>Đã</span>
                            <span>xác nhận</span>
                        </div>
                    </Badge>
                );
            case "cancelled":
                return (
                    <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100 flex gap-1 items-start w-fit px-3"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5"></span>
                        <div className="flex flex-col text-xs leading-tight">
                            <span>Đã</span>
                            <span>hủy</span>
                        </div>
                    </Badge>
                );
            default:
                return null;
        }
    };

    const columns = [
        {
            title: "KHÁCH HÀNG",
            dataIndex: "customer",
            key: "customer",
            render: (customer: any) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        {customer.isImage ? (
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                        ) : null}
                        <AvatarFallback className={`${customer.color} text-white`}>
                            {customer.avatar}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.phone}</div>
                    </div>
                </div>
            ),
        },
        {
            title: "THỜI GIAN",
            key: "time",
            render: (_: any, record: any) => (
                <div>
                    <div className="font-medium text-sm">{record.date}</div>
                    <div className="text-xs text-muted-foreground">{record.time}</div>
                </div>
            ),
        },
        {
            title: "SỐ KHÁCH",
            dataIndex: "guests",
            key: "guests",
            render: (guests: number) => (
                <Badge variant="secondary" className="font-normal bg-gray-100">
                    {guests} người
                </Badge>
            ),
        },
        {
            title: "KHU VỰC",
            dataIndex: "area",
            key: "area",
            render: (area: string) => <span className="text-sm">{area}</span>,
        },
        {
            title: "GHI CHÚ",
            dataIndex: "note",
            key: "note",
            render: (note: string) => (
                <span className="text-sm text-muted-foreground block max-w-[200px] truncate">
                    {note}
                </span>
            ),
        },
        {
            title: "TRẠNG THÁI",
            dataIndex: "status",
            key: "status",
            align: "center" as const,
            render: (status: string) => (
                <div className="flex justify-center">{getStatusBadge(status)}</div>
            ),
        },
        {
            title: "HÀNH ĐỘNG",
            key: "action",
            align: "right" as const,
            render: (_: any, record: any) => (
                <div className="flex items-center justify-end gap-2">
                    {record.status === "pending" && (
                        <>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    {record.status === "confirmed" && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                        </Button>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-gray-100"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Chi tiết</DropdownMenuItem>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div></div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Xuất Excel
                    </Button>
                    <Button className="gap-2 bg-green-500 hover:bg-green-600">
                        <Plus className="h-4 w-4" />
                        Tạo đặt bàn
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-3xl border-none shadow-sm drop-shadow-sm">
                    <CardContent className="p-5 flex flex-row items-center gap-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Tổng đặt bàn
                            </p>
                            <h3 className="text-2xl font-bold">24</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-3xl border-none shadow-sm ring-1 ring-green-100 bg-green-50/30">
                    <CardContent className="p-5 flex flex-row items-center gap-4">
                        <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                            <MoreVertical className="h-5 w-5 rotate-90" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Chờ xác nhận
                            </p>
                            <h3 className="text-2xl font-bold text-green-600">5</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-3xl border-none shadow-sm drop-shadow-sm">
                    <CardContent className="p-5 flex flex-row items-center gap-4">
                        <div className="p-2 bg-green-100 text-green-600 rounded-full">
                            <Check className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Đã xác nhận
                            </p>
                            <h3 className="text-2xl font-bold">18</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-3xl border-none shadow-sm drop-shadow-sm">
                    <CardContent className="p-5 flex flex-row items-center gap-4">
                        <div className="p-2 bg-red-100 text-red-600 rounded-full">
                            <X className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Đã hủy
                            </p>
                            <h3 className="text-2xl font-bold">1</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>


            {/* Booking Table */}
            <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={bookings}
                    rowKey="id"
                    pagination={false}
                    className="ant-table-custom"
                />
            </div>
        </div>
    );
};

export default BookingPage;
