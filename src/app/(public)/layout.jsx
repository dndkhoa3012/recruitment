"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { App } from "antd";

export default function PublicLayout({ children }) {
    const pathname = usePathname();

    return (
        <App>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="flex h-full grow flex-col">
                    {/* Navigation */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f3f4] dark:border-[#1e2d35] px-6 lg:px-40 py-4 bg-white dark:bg-[#101c22]">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative h-14 w-48">
                                <Image
                                    src="/johns-tours-logo.png"
                                    alt="John's Tours Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                        <div className="flex flex-1 justify-end gap-8 items-center">
                            <nav className="hidden md:flex items-center gap-8">
                                <Link className="text-[#111618] dark:text-gray-300 text-sm font-semibold hover:text-[#13a4ec] transition-colors" href="/">Trang chủ</Link>
                                <Link className="text-[#111618] dark:text-gray-300 text-sm font-semibold hover:text-[#13a4ec] transition-colors" href="/jobs">Việc làm</Link>
                                <Link className="text-[#111618] dark:text-gray-300 text-sm font-semibold hover:text-[#13a4ec] transition-colors" href="/about">Văn hóa</Link>
                            </nav>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </App>
    );
}
