"use client";
import { FC } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import SlidingPanelElement from "./slidingPanelElement";
interface SlidingPanelProps {
  open: boolean;
  togglePanel: () => void;
}

// مكون اللوحة المنزلقة
const SlidingPanel: FC<SlidingPanelProps> = ({ open, togglePanel }) => {
  // حالة لتخزين إحداثيات الماوس
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // دالة تحدث حالة الإحداثيات عند حركة الماوس
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // إضافة المستمع لحدث حركة الماوس على مستوى النافذة
    window.addEventListener("mousemove", handleMouseMove);

    // إزالة المستمع عند إلغاء تركيب المكون
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    // مكون Dialog من Headless UI، نستخدم onClose دالة فارغة لمنع الإغلاق عند النقر خارج اللوحة
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0 "
      >
        <div>
          {/* العنصر الذي يتبع الماوس */}
          <div
            style={{
              position: "fixed",
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)", // ليكون العنصر متمركز حول الماوس
              pointerEvents: "none", // حتى لا يمنع تفاعل المستخدم مع عناصر أخرى
              background: "white",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              transformOrigin: "center", // ليكون الماوس متمركز حول المعنصر
            }}
          >
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </div>
        </div>
      </DialogBackdrop>

      {/* الحاويات لضبط موضع وحجم محتوى الحوار */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* اللوحة المنزلقة */}
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-90 transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700 "
            >
              {/* محتوى اللوحة */}
              <div className="flex h-full mt-7 flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-2 bg-gray-200">
                    <div onClick={togglePanel}>
                      <XMarkIcon
                        aria-hidden="true"
                        className="pr-5 ml-3 mt-4 h-10 w-11 hover:text-blue-600 cursor-pointer"
                      />
                    </div>
                    <div className="flex mt-4 mr- rounded-sm px-1 py-1 text-gray-800">
                      <div className="mr-4 text-base font-bold text-gray-800">
                        فلتر
                      </div>
                    </div>
                  </div>

                  <SlidingPanelElement />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SlidingPanel;
