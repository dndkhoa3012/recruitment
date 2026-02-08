"use client";

export default function JobsPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="bg-[#f6f7f8] dark:bg-[#101c22] text-center py-12">
                <h1 className="text-[#111618] dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Cơ hội việc làm tại Phú Quốc</h1>
                <p className="text-[#617c89] dark:text-gray-400 text-lg max-w-2xl mx-auto px-4">Gia nhập đội ngũ năng động và phát triển sự nghiệp cùng công ty du lịch hàng đầu đảo Ngọc.</p>
            </div>

            {/* Main Content */}
            <main className="max-w-[960px] mx-auto px-4 py-8 md:py-12">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#617c89]">
                            <span className="material-symbols-outlined !text-[20px]">search</span>
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-3 border-none bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-[#13a4ec] dark:text-white placeholder:text-[#617c89] text-base"
                            placeholder="Tìm kiếm vị trí công việc..."
                            type="text"
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
                        <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#13a4ec] text-white px-5 text-sm font-semibold shadow-sm">
                            Tất cả
                        </button>
                        <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#111618] dark:text-gray-300 px-5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Nhà hàng
                        </button>
                        <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#111618] dark:text-gray-300 px-5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Khách sạn
                        </button>
                        <button className="flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#111618] dark:text-gray-300 px-5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Hướng dẫn viên
                        </button>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="space-y-4">
                    {/* Job Card 1 */}
                    <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#13a4ec]/30 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex gap-5">
                                <div className="size-14 md:size-16 rounded-xl bg-[#13a4ec]/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined !text-[32px] text-[#13a4ec]">concierge</span>
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-[#111618] dark:text-white text-xl font-bold group-hover:text-[#13a4ec] transition-colors">Lễ tân (Receptionist)</h3>
                                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">location_on</span>
                                            <span>Phú Quốc</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">work</span>
                                            <span>Toàn thời gian</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#13a4ec] text-sm font-semibold">
                                            <span className="material-symbols-outlined !text-[18px]">payments</span>
                                            <span>8 - 12 triệu VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex-1 md:flex-none min-w-[140px] px-6 py-2.5 bg-[#13a4ec]/10 text-[#13a4ec] hover:bg-[#13a4ec] hover:text-white text-sm font-bold rounded-xl transition-all duration-200">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Job Card 2 */}
                    <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#13a4ec]/30 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex gap-5">
                                <div className="size-14 md:size-16 rounded-xl bg-[#13a4ec]/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined !text-[32px] text-[#13a4ec]">restaurant</span>
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-[#111618] dark:text-white text-xl font-bold group-hover:text-[#13a4ec] transition-colors">Nhân viên nhà hàng</h3>
                                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">location_on</span>
                                            <span>Phú Quốc</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">work</span>
                                            <span>Toàn thời gian</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#13a4ec] text-sm font-semibold">
                                            <span className="material-symbols-outlined !text-[18px]">payments</span>
                                            <span>7 - 10 triệu VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex-1 md:flex-none min-w-[140px] px-6 py-2.5 bg-[#13a4ec]/10 text-[#13a4ec] hover:bg-[#13a4ec] hover:text-white text-sm font-bold rounded-xl transition-all duration-200">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Job Card 3 */}
                    <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#13a4ec]/30 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex gap-5">
                                <div className="size-14 md:size-16 rounded-xl bg-[#13a4ec]/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined !text-[32px] text-[#13a4ec]">bed</span>
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-[#111618] dark:text-white text-xl font-bold group-hover:text-[#13a4ec] transition-colors">Nhân viên buồng phòng</h3>
                                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">location_on</span>
                                            <span>Phú Quốc</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">work</span>
                                            <span>Toàn thời gian</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#13a4ec] text-sm font-semibold">
                                            <span className="material-symbols-outlined !text-[18px]">payments</span>
                                            <span>Thoả thuận</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex-1 md:flex-none min-w-[140px] px-6 py-2.5 bg-[#13a4ec]/10 text-[#13a4ec] hover:bg-[#13a4ec] hover:text-white text-sm font-bold rounded-xl transition-all duration-200">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Job Card 4 */}
                    <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#13a4ec]/30 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex gap-5">
                                <div className="size-14 md:size-16 rounded-xl bg-[#13a4ec]/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined !text-[32px] text-[#13a4ec]">map</span>
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-[#111618] dark:text-white text-xl font-bold group-hover:text-[#13a4ec] transition-colors">Hướng dẫn viên du lịch</h3>
                                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">location_on</span>
                                            <span>Phú Quốc</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 text-sm">
                                            <span className="material-symbols-outlined !text-[18px]">work</span>
                                            <span>Toàn thời gian</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#13a4ec] text-sm font-semibold">
                                            <span className="material-symbols-outlined !text-[18px]">payments</span>
                                            <span>10 - 15 triệu VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex-1 md:flex-none min-w-[140px] px-6 py-2.5 bg-[#13a4ec]/10 text-[#13a4ec] hover:bg-[#13a4ec] hover:text-white text-sm font-bold rounded-xl transition-all duration-200">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Load More Section */}
                <div className="mt-12 text-center">
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-[#13a4ec] text-[#13a4ec] font-bold hover:bg-[#13a4ec]/5 transition-colors">
                        Xem thêm công việc
                        <span className="material-symbols-outlined">expand_more</span>
                    </button>
                    <p className="mt-4 text-[#617c89] text-sm">Hiển thị 4 trên 24 vị trí đang tuyển dụng</p>
                </div>
            </main>
        </>
    );
}
