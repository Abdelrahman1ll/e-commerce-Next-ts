"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // ref لتخزين ما إذا كان أول تحميل
  const firstMount = useRef(true);
  // ref لتخزين الحالة السابقة
  const prevOnline = useRef<boolean>(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);

      if (!online) {
        // عند الانقطاع دائماً نظهر خطأ
        toast.error("لا يوجد اتصال بالإنترنت", {
          position: "top-center",
          autoClose: false,
          toastId: "offline-toast",
        });
      } else {
        // إذا لم تكن أول مرة وكاننا جينا من أوفلاين
        if (!firstMount.current && prevOnline.current === false) {
          toast.dismiss("offline-toast");
          toast.success("تم استعادة الاتصال", {
            position: "top-center",
            autoClose: 2000,
            toastId: "online-toast",
          });
        }
      }

      // بعد كل مرة، نحدّث المراجع
      firstMount.current = false;
      prevOnline.current = online;
    };

    // نفّذ للمرة الأولى
    updateStatus();

    // استمع للأحداث
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  // إذا أونلاين، ما نعرض البانر
  if (isOnline) return null;

  // بانر أعلى الشاشة عند الانقطاع
  return (
    <div className="fixed top-0 inset-x-0 bg-red-600 text-white text-center py-2 z-50">
      لا يوجد اتصال بالإنترنت
    </div>
  );
}
