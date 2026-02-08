export default function AdminDashboard() {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Tổng quan hệ thống tuyển dụng</h1>
                    <p className="text-muted-foreground">
                        Quản lý việc làm và ứng viên
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Tổng việc làm</span>
                            <span className="text-3xl font-bold">5</span>
                            <span className="text-xs text-green-600">+2 trong tháng này</span>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Đang tuyển</span>
                            <span className="text-3xl font-bold">5</span>
                            <span className="text-xs text-muted-foreground">Vị trí mở</span>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Tổng ứng viên</span>
                            <span className="text-3xl font-bold">0</span>
                            <span className="text-xs text-muted-foreground">Chờ xử lý: 0</span>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Đã tuyển</span>
                            <span className="text-3xl font-bold">0</span>
                            <span className="text-xs text-green-600">Trong tháng này</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Bắt đầu</h2>
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Chào mừng đến với hệ thống quản lý tuyển dụng. Bạn có thể:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Quản lý các vị trí tuyển dụng tại mục <a href="/admin/jobs" className="text-blue-600 hover:underline">Việc làm</a></li>
                            <li>Xem và quản lý ứng viên tại mục <a href="/admin/candidates" className="text-blue-600 hover:underline">Ứng viên</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
