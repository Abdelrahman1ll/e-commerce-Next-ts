"use client";
import { FC } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import UseProfileComponents from "./Profile-Components";

const ProfileComponents: FC = () => {
  const {
    NAME,
    name,
    setName,
    setLastName,
    email,
    setEmail,
    ToNumber,
    setToNumber,
    handleEdit,
    Editopen,
    setEditopen,
    handlePhone,
    Number,
    setNumber,
    errors,
    open,
    setOpen,
    lastName,
    FirstLetter,
    Email,
    Phone,
    dateOnly,
    phoneValue,
    LastName,
    handleChangePassword,
    passwordNew,
    setPasswordNew,
    passwordCurrent,
    setPasswordCurrent,
  } = UseProfileComponents();

  
  return (
    <div className=" max-[950px]:m-4">
      {/[a-zA-Z]/.test(phoneValue) ? (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0 ">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-2">
                  <div className="flex justify-center">
                    <DialogTitle
                      as="h3"
                      className="trxe-center text-base font-semibold text-gray-900  pb-4"
                    >
                      اكمل بياناتك الشخصية
                    </DialogTitle>
                  </div>
                  <div dir="rtl" className="sm:flex sm:items-start mb-2">
                    <div className="mt-2 text-right ">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          رقم الجوال
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            name="phone"
                            type="phone"
                            required
                            autoComplete="phone"
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 
                              ${
                                errors.number
                                  ? "outline-red-500"
                                  : "outline-gray-300"
                              }
                    
                    `}
                            placeholder="ادخل رقم الجوال"
                            onChange={(e) => setNumber(e.target.value)}
                            value={Number}
                          />
                          {errors.number && (
                            <div className="mb-2 text-sm text-red-500">
                              {errors.number}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                  <button
                    type="button"
                    onClick={handlePhone}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                  >
                    حفظ
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      ) : null}

      <Dialog open={Editopen} onClose={setEditopen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center p-4 text-center sm:p-0 ">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg w-full h-full bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-2">
                <div className="flex justify-center">
                  <DialogTitle
                    as="h3"
                    className="trxe-center text-base font-semibold text-gray-900  pb-4"
                  >
                    تعديل الحساب
                  </DialogTitle>
                </div>

                <div dir="rtl" className=" sm:mx-auto sm:w-full sm:max-w-sm">
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <div className="flex items-center gap-4 ">
                        <div className="w-50">
                          <label
                            htmlFor="name"
                            className="block text-right text-sm/6 font-medium text-gray-900"
                          >
                            الاسم الاول
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              autoComplete="name"
                              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                        ${errors.name ? "outline-red-500" : "outline-gray-300"}
                        `}
                              placeholder="الاسم الاول"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                            {errors.name && (
                              <div className="text-right mb-2 text-sm text-red-500">
                                {errors.name}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-50">
                          <label
                            htmlFor="name2"
                            className="block text-right text-sm/6 font-medium text-gray-900"
                          >
                            الاسم الثاني
                          </label>
                          <div className="mt-2">
                            <input
                              id="name2"
                              name="name2"
                              type="text"
                              required
                              autoComplete="name"
                              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                        ${
                          errors.LastName
                            ? "outline-red-500"
                            : "outline-gray-300"
                        }
                        `}
                              placeholder="الاسم الثاني"
                              onChange={(e) => setLastName(e.target.value)}
                              value={LastName}
                            />
                            {errors.LastName && (
                              <div className="text-right mb-2 text-sm text-red-500">
                                {errors.LastName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-right text-sm/6 font-medium text-gray-900"
                        >
                          عنوان البريد الإلكتروني
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={`block  w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${errors.email ? "outline-red-500" : "outline-gray-300"}
                      
                      `}
                            placeholder="عنوان البريد الإلكتروني"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                          {errors.email && (
                            <div className="text-right mb-2 text-sm text-red-500">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-right text-sm/6 font-medium text-gray-900"
                        >
                          رقم الهاتف
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            name="phone"
                            type="phone"
                            required
                            autoComplete="phone"
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${errors.number ? "outline-red-500" : "outline-gray-300"}
                      
                      `}
                            placeholder="رقم الهاتف"
                            onChange={(e) => setToNumber(e.target.value)}
                            value={ToNumber}
                          />
                          {errors.Tonumber && (
                            <div className="text-right mb-2 text-sm text-red-500">
                              {errors.Tonumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-8 py-2 text-base font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  تحديث
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setEditopen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      
      {/* عنوان الحساب */}
      <div>
        <div className="text-center mb-4 text-2xl font-bold">الحساب الشخصي</div>
      </div>

      {/* بطاقة المعلومات الشخصية */}
      <div
        dir="rtl"
        className="p-2 mt-1 mx-auto bg-white shadow-md rounded-md border border-gray-200 "
      >
        {/* معلومات العميل الأساسية */}
        <div className="border-b border-gray-200 pb-4 px-4">
          <div className="flex items-center space-x-2 ">
            <div className="flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                {FirstLetter}
              </div>
            </div>
            <div>
              <p className="font-bold">
              {NAME} {lastName}
              </p>
              <p className="text-sm text-gray-500">تاريخ التسجيل: {dateOnly}</p>
            </div>
          </div>
        </div>

        {/* تفاصيل إضافية عن الحساب */}
        <div className="pt-4 px-4">
          <h3 className="text-lg font-semibold mb-2">تفاصيل الحساب</h3>

          <div className="mb-2">
            <span className="font-semibold ml-1 text-gray-700">
              البريد الالكتروني:
            </span>
            <span className="text-gray-600">{Email}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold ml-1 text-gray-700">
              رقم الهاتف:
            </span>
            <span className="text-gray-600">{Phone}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold ml-1 text-gray-700">
              كلمة المرور:
            </span>
            <span className="text-gray-600 ">********</span>
          </div>
          <button
            onClick={() => setEditopen(true)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
          >
            تعديل الحساب
          </button>
        </div>
      </div>

      {/* تغيير كلمة المرور */}
      <div>
        <div
          dir="rtl"
          className="p-2 mt-4  bg-white shadow-md rounded-md border border-gray-200 "
        >
          <div className="pt-1 px-4">
            <h3 className="text-lg font-semibold mb-2">تغيير كلمة المرور</h3>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                كلمة المرور الحاليه
              </label>
              <input
                type="password"
                id="password"
                className={`block w-full mt-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                ${
                  errors.passwordcurrent
                    ? "outline-red-500"
                    : "outline-gray-300"
                }

              `}
                placeholder="ادخل كلمة المرور الحاليه"
                onChange={(e) => setPasswordCurrent(e.target.value)}
                value={passwordCurrent}
              />
              {errors.passwordcurrent && (
                <div className="mb-2 text-sm text-red-500">
                  {errors.passwordcurrent}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                كلمة المرور الجديده
              </label>
              <input
                type="password"
                id="password"
                className={`block w-full mt-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                ${errors.passwordnew ? "outline-red-500" : "outline-gray-300"}

              `}
                placeholder="ادخل كلمة المرور الجديده"
                onChange={(e) => setPasswordNew(e.target.value)}
                value={passwordNew}
              />
              {errors.passwordnew && (
                <div className="mb-2 text-sm text-red-500">
                  {errors.passwordnew}
                </div>
              )}
            </div>

            <button
              onClick={handleChangePassword}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
            >
              تغيير كلمة المرور
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponents;
