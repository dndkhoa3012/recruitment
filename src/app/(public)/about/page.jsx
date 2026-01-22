"use client";
import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";

export default function AboutPage() {
    const { hero, story } = aboutData;

    return (
        <div className="w-full bg-white min-h-screen pt-32 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 text-center md:text-left">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Về chúng tôi</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                        {hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                        {hero.subtitle}
                    </p>
                </header>

                <div className="w-full h-[1px] bg-slate-100 mb-12"></div>

                {/* Main Content */}
                <div className="max-w-none">

                    {/* Story Image */}
                    <div className="my-10 rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={story.image}
                            alt="Airwave Story"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Story Text */}
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{story.heading}</h2>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600 mb-8 text-xl">
                        {story.subheading}
                    </blockquote>
                    <div
                        className="text-slate-600 text-lg leading-relaxed flex flex-col gap-6"
                        dangerouslySetInnerHTML={{ __html: story.content }}
                    ></div>



                    <div className="w-full h-[1px] bg-slate-100 my-16"></div>

                    {/* Simple CTA */}
                    <div className="text-center bg-slate-50 rounded-2xl p-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Bạn đã sẵn sàng trải nghiệm?</h2>
                        <p className="text-slate-600 mb-8">Hãy ghé thăm và cảm nhận không gian tuyệt vời tại Airwave Beach Club.</p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/booking" className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30">
                                Đặt Bàn Ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
