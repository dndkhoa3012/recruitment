"use client";

import Link from "next/link";

export default function PublicLayout({ children }) {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <div className="flex h-full grow flex-col">
                {/* Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f3f4] dark:border-[#1e2d35] px-6 lg:px-40 py-4 bg-white dark:bg-[#101c22]">
                    <Link href="/" className="flex items-center gap-3 text-[#13a4ec]">
                        <div className="size-8 flex items-center justify-center bg-[#13a4ec]/10 rounded-lg">
                            <span className="material-symbols-outlined text-[#13a4ec]">sailing</span>
                        </div>
                        <h2 className="text-[#111618] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Phu Quoc Travel</h2>
                    </Link>
                    <div className="flex flex-1 justify-end gap-8 items-center">
                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-[#111618] dark:text-gray-300 text-sm font-semibold hover:text-[#13a4ec] transition-colors" href="/">Trang chủ</Link>
                            <Link className="text-[#111618] dark:text-gray-300 text-sm font-semibold hover:text-[#13a4ec] transition-colors" href="/jobs">Việc làm</Link>
                            <Link className="text-[#111618] dark:text-gray-300 text-sm font-semibold hover:text-[#13a4ec] transition-colors" href="/about">Văn hóa</Link>
                        </nav>
                        <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-[#13a4ec] text-white text-sm font-bold shadow-md shadow-[#13a4ec]/20 hover:bg-[#13a4ec]/90 transition-all">
                            <span className="truncate">Đăng nhập</span>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
