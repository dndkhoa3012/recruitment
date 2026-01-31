"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

export const MenuSection = ({ title, items, layoutType = "SQUARE" }) => {
    const INITIAL_COUNT = layoutType === 'PORTRAIT' ? 4 : 6;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const handleSeeMore = () => {
        setVisibleCount(items.length); // Show all
    };

    const handleCollapse = () => {
        setVisibleCount(INITIAL_COUNT);
    };

    const displayedItems = items.slice(0, visibleCount);
    const hasMore = items.length > visibleCount;

    // Helper to format price
    const formatPrice = (price) => {
        if (!price || price === "0") return "";
        if (/^\d+$/.test(price)) {
            return (parseInt(price) / 1000).toLocaleString('vi-VN') + "k";
        }
        return price;
    };

    // Card Layout for PORTRAIT (Cocktails, Beverages)
    // Vertical Card with Large Rounded Corners + Green Plus Button
    const PortraitCard = ({ item }) => (
        <div className="group flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] bg-slate-100 mb-4 shadow-sm">
                {item.image ? (
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url("${item.image}")` }}
                    ></div>
                ) : (
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl">image</span>
                    </div>
                )}


                {/* Floating Plus Button - Hidden temporarily
                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-10">
                    <Plus className="w-6 h-6" />
                </button>
                */}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-slate-900 font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {item.name}
                    </h3>
                    {/* Price - Hidden temporarily
                    {item.price && item.price !== "0" && (
                        <span className="text-green-500 font-bold text-lg whitespace-nowrap">
                            {formatPrice(item.price)}
                        </span>
                    )}
                    */}
                </div>
                {(item.desc || item.description) && (
                    <p className="text-slate-400 text-sm font-normal leading-relaxed line-clamp-2">
                        {item.desc || item.description}
                    </p>
                )}
            </div>
        </div>
    );

    // Card Layout for SQUARE (Food, Main Courses)
    // Horizontal Card + "Thêm vào giỏ" Text Button
    const SquareCard = ({ item }) => (
        <div className="group flex items-center gap-5 p-4 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
            {/* Image - Circle */}
            <div className="shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-[57px] overflow-hidden bg-slate-100 shadow-md">
                {item.image ? (
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url("${item.image}")` }}
                    ></div>
                ) : (
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl">image</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-slate-900 font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 mb-1">
                        {item.name}
                    </h3>
                    {/* Price - Hidden temporarily
                    {item.price && item.price !== "0" && (
                        <span className="text-green-500 font-bold text-lg whitespace-nowrap ml-2">
                            {formatPrice(item.price)}
                        </span>
                    )}
                    */}
                </div>

                {(item.desc || item.description) && (
                    <p className="text-slate-400 text-sm font-normal leading-relaxed line-clamp-2 mb-2">
                        {item.desc || item.description}
                    </p>
                )}

                {/* Add Button - Hidden temporarily
                <button className="self-start text-xs font-bold text-green-500 hover:text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 mt-auto">
                    Thêm vào giỏ
                </button>
                */}
            </div>
        </div>
    );


    return (
        <div className="mb-12 animate-in fade-in zoom-in duration-300">
            {/* Section Header */}
            <div className="flex items-center gap-4 px-4 pb-8 pt-2">
                <h2 className="text-slate-900 tracking-tight text-[28px] md:text-[32px] font-bold leading-tight">{title}</h2>
                <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            {/* Grid Container */}
            <div className={`
                grid gap-x-6 gap-y-10 px-4
                ${layoutType === 'PORTRAIT'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                }
            `}>
                {displayedItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {layoutType === 'PORTRAIT'
                            ? <PortraitCard item={item} />
                            : <SquareCard item={item} />
                        }
                    </React.Fragment>
                ))}
            </div>

            {items.length > INITIAL_COUNT && (
                <div className="flex justify-center mt-10">
                    {hasMore ? (
                        <Button
                            variant="outline"
                            onClick={handleSeeMore}
                            className="gap-2 px-8 py-6 rounded-full text-base font-medium border-slate-200 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
                        >
                            Xem thêm
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={handleCollapse}
                            className="gap-2 px-8 py-6 rounded-full text-base font-medium border-slate-200 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                            Thu gọn
                            <ChevronDown className="w-4 h-4 rotate-180" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
