"use client";

import React from "react";
import ReactStars from "react-stars";

interface RatingProps {
  rating: number;
  size: number; // قيمة التقييم (مثلاً 3.5)
}

const RatingComponent: React.FC<RatingProps> = ({ rating,size }) => {
  return (
    <div className="flex items-center">
      <ReactStars
        count={5}         // عدد النجوم الإجمالي
        value={rating}    // قيمة التقييم
        size={size}         // حجم النجمة
        color2="#ffd700"  // اللون النشط (ذهبي)
        edit={false}      // عرض فقط، بدون تعديل
      />
      
    </div>
  );
};

export default RatingComponent;
