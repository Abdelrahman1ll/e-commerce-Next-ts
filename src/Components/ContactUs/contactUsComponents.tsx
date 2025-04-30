"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

// تحميل Lottie ديناميكياً مع تعطيل SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Animations = {
  contact?: unknown;
  done?: unknown;
};

const ContactUsComponents: React.FC = () => {
  const [state, handleSubmit] = useForm("xanerolq");
  const [animations, setAnimations] = useState<Animations>({});

  // جلب ملفات JSON الخاصة بالأنيميشن عند التحميل على المتصفح فقط
  useEffect(() => {
    if (typeof window === "undefined") return;

    Promise.all([
      import("../../animation/Animation - 1724626250746.json"),
      import("../../animation/Animation - 1724623929549.json"),
    ]).then(([contact, done]) => {
      setAnimations({ contact: contact.default, done: done.default });
    });
  }, []);

  // إذا لم يتم تحميل الأنيميشن بعد، نعرض فارغ أو سبينر
  if (!animations.contact || !animations.done) {
    return null;
  }

  return (
    <div dir="rtl" className="flex items-center">
      <section className="max-w-3xl mx-auto p-4">
        <h1 id="Contact" className="text-3xl font-bold text-center mb-5">
          اتصل بنا
        </h1>
        <p className="text-base text-center text-gray-600 mb-10">
          أدخل بريدك الإلكتروني وطلبك أو استفسارك، وسنرد عليك في أقرب وقت.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* الأنميشن: يظهر أولاً على شاشات الموبايل */}
          <div className="order-1 md:order-2 flex-1 flex justify-center items-center mb-5 md:mb-0">
            <div className="w-80 h-64 md:w-[355px] md:h-[355px]">
              <Lottie animationData={animations.contact} loop />
            </div>
          </div>

          {/* النموذج: يظهر بعد الأنميشن على الموبايل */}
          <form
            onSubmit={handleSubmit}
            className="order-2 md:order-1 w-full min-[767px]:w-100"
          >
            {state.succeeded ? (
              <div className="mt-5 text-lg text-green-500 flex items-center">
                <Lottie
                  animationData={animations.done}
                  loop={false}
                  style={{ height: 50 }}
                />
                <span className="ml-2">تم إرسال رسالتك بنجاح 👌</span>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-gray-800">
                    البريد الإلكتروني:
                  </label>
                  <input
                    autoComplete="email"
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="w-full p-2 border border-gray-500 rounded text-base focus:border-teal-400 hover:border-teal-400 focus:outline-none"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block mb-1 text-gray-800">
                    رسالتك:
                  </label>
                  <textarea
                    required
                    name="message"
                    id="message"
                    className="w-full p-2 border border-gray-500 rounded text-base focus:border-teal-400 hover:border-teal-400 focus:outline-none"
                    rows={5}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="bg-[#242540] text-white px-6 py-2 rounded mt-5 hover:opacity-90 disabled:opacity-50"
                >
                  {state.submitting ? "جاري الإرسال..." : "إرسال"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsComponents;
