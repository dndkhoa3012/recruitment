"use client";

export default function JobDetailPage() {
    return (
        <>
            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
                {/* Job Header Section */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm mb-6 border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="size-24 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVgt1Q5AugIQe9tcDpOl9IvmV8ufml9jOyY9L2OitO_zKgATdbWM24-bzJwD9tT30yVzFBVZYUv7CYcTvElNemVETHAqYuKeEEfXBzdmrorBdm0W1v1JCaLizf-V6GxjiYgg-_zAGEnieVai6YRoTMnrjhCXbU7WnmL-EFkcXLeO1bhLpLPs5QwattncMOdrAxdupETALmd8OGi1Pxnph-3K6ctYG_JxPfvZTJdYzhJz0PdOG4FupttOnCSYcIJp9y9slHgzxKCA')" }}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-[#13a4ec]/10 text-[#13a4ec] text-xs font-bold rounded uppercase tracking-wider">Toàn thời gian</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">Hỗ trợ chỗ ở</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Nhân viên Lễ tân</h2>
                            <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">Công ty TNHH Du lịch & Dịch vụ Phú Quốc (Resort & Spa)</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-[#13a4ec]">location_on</span>
                                    <span>Bãi Trường, Dương Tơ, Phú Quốc</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-[#13a4ec]">payments</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">8.000.000 - 12.000.000 VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Details Content */}
                <div className="space-y-6">
                    {/* Description */}
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#13a4ec]">description</span>
                            Mô tả công việc
                        </h3>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            <p>Chúng tôi đang tìm kiếm ứng viên năng động cho vị trí Nhân viên Lễ tân tại resort 5 sao. Bạn sẽ là gương mặt đại diện đón tiếp khách hàng và đảm bảo trải nghiệm nghỉ dưỡng tuyệt vời nhất.</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">check_circle</span>
                                    <span>Thực hiện thủ tục Check-in, Check-out và thanh toán cho khách hàng theo đúng tiêu chuẩn.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">check_circle</span>
                                    <span>Tiếp nhận cuộc gọi, xử lý yêu cầu đặt phòng và giải đáp thắc mắc của khách tại quầy.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">check_circle</span>
                                    <span>Phối hợp chặt chẽ với bộ phận Buồng phòng và Nhà hàng để phục vụ khách chu đáo.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">check_circle</span>
                                    <span>Cung cấp thông tin về các dịch vụ du lịch, tour tham quan tại Phú Quốc cho khách.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Requirements */}
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#13a4ec]">assignment_turned_in</span>
                            Yêu cầu công việc
                        </h3>
                        <div className="space-y-3">
                            <div className="p-4 bg-[#f6f7f8] dark:bg-gray-800 rounded-lg border-l-4 border-[#13a4ec]">
                                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">star</span>
                                        <span>Tốt nghiệp Trung cấp trở lên chuyên ngành Du lịch, Khách sạn hoặc liên quan.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">star</span>
                                        <span>Giao tiếp tiếng Anh tốt (tương đương IELTS 5.5 trở lên). Biết thêm ngoại ngữ khác là một lợi thế.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">star</span>
                                        <span>Ngoại hình ưa nhìn, tác phong chuyên nghiệp, niềm nở với khách hàng.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#13a4ec] text-lg mt-0.5">star</span>
                                        <span>Có khả năng làm việc theo ca (bao gồm ca đêm và ngày lễ).</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#13a4ec]">redeem</span>
                            Quyền lợi
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <span className="material-symbols-outlined text-[#13a4ec]">home_work</span>
                                <span className="text-gray-700 dark:text-gray-300">Hỗ trợ Ký túc xá nhân viên sạch sẽ</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <span className="material-symbols-outlined text-[#13a4ec]">restaurant</span>
                                <span className="text-gray-700 dark:text-gray-300">Hỗ trợ 03 bữa ăn mỗi ngày tại canteen</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <span className="material-symbols-outlined text-[#13a4ec]">volunteer_activism</span>
                                <span className="text-gray-700 dark:text-gray-300">Thưởng Service Charge hàng tháng</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <span className="material-symbols-outlined text-[#13a4ec]">health_and_safety</span>
                                <span className="text-gray-700 dark:text-gray-300">BHXH, BHYT theo quy định nhà nước</span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Sticky Footer Actions */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#101c22] border-t border-gray-200 dark:border-gray-800 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">chat</span>
                        Liên hệ qua Zalo
                    </button>
                    <button className="flex-[2] flex items-center justify-center gap-2 bg-[#13a4ec] hover:bg-[#13a4ec]/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-[#13a4ec]/20 transition-transform active:scale-[0.98]">
                        Ứng tuyển ngay
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </footer>
        </>
    );
}
