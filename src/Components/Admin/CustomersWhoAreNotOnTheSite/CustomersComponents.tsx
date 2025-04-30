"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import UseCustomersComponents from "./Customers-Components";
type Props = {
  _id: string;
  name: string;
  phoneNumber: string;
  data: string;
  updatedAt: string;
};
const CustomersComponents = () => {
  const {
    handleDelete,
    openDeleteDialog,
    handleEdit,
    handleUpdate,
    openEdit,
    NameEdit,
    PhoneEdit,
    DataEdit,
    open,
    Name,
    Phone,
    Data,
    Putloading,
    Customers,
    handleSubmit,
    Dataloading,
    errors,
    Postloading,
    Deleteloading,
    setOpen,
    setOpenEdit,
    setNameEdit,
    setPhoneEdit,
    setDataEdit,
    setName,
    setData,
    setPhone,
  } = UseCustomersComponents();

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mb-50">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      حذف العميل
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        هل انت متاكد من حذف العميل؟
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={Deleteloading}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {Deleteloading ? "جاري الحذف..." : "حذف"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed  inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mb-20">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4  sm:pb-4">
                <div  className="sm:flex sm:items-start w-full">
                  {" "}
                  {/* Added w-full here */}
                  <div className="mt-3 text-center w-full sm:mt-0 sm:ml-0 sm:text-left">
                    {" "}
                    {/* Modified here */}
                    <DialogTitle
                      as="h3"
                      className="text-base text-center font-semibold text-gray-900 "
                    >
                      تعديل العميل
                    </DialogTitle>
                    <div dir="rtl">
                    <form  className="space-y-4 w-full">
                      <div className="w-full">
                        {" "}
                        {/* Added w-full here */}
                        <label htmlFor="Name" className="block mb-1 text-right">
                          اسم العميل
                        </label>
                        <input
                          type="text"
                          id="Name"
                          placeholder="ادخل اسم العميل"
                          required
                          className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${
                        errors.NameEdit ? "outline-red-500" : "outline-gray-300"
                      }
                    `}
                          onChange={(e) => setNameEdit(e.target.value)}
                          value={NameEdit}
                        />
                        {errors.NameEdit && (
                          <div className="text-right mb-2 text-sm text-red-500">
                            {errors.NameEdit}
                          </div>
                        )}
                      </div>
                      {/* التعديلات المشابهة لباقي الحقول */}
                      <div className="w-full">
                        {" "}
                        {/* Added w-full here */}
                        <div>
                          <label
                            htmlFor="phoneNumber"
                            className="block mb-1 text-right"
                          >
                            رقم العميل
                          </label>
                          <input
                            type="phone"
                            id="phoneNumber"
                            placeholder="ادخل رقم الجوال"
                            required
                            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              
                ${errors.PhoneEdit ? "outline-red-500" : "outline-gray-300"}
              `}
                            onChange={(e) => setPhoneEdit(e.target.value)}
                            value={PhoneEdit}
                          />
                          {errors.PhoneEdit && (
                            <div className="text-right mb-2 text-sm text-red-500">
                              {errors.PhoneEdit}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full">
                        {" "}
                        {/* Added w-full here */}
                        <label
                          htmlFor="productDetails"
                          className="block mb-1 text-right"
                        >
                          تفاصيل الطلب
                        </label>
                        <textarea
                          id="productDetails"
                          placeholder="ادخل تفاصيل الطلب"
                          rows={4}
                          required
                          className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                      ${
                        errors.DataEdit ? "outline-red-500" : "outline-gray-300"
                      }
                    `}
                          onChange={(e) => setDataEdit(e.target.value)}
                          value={DataEdit}
                        />
                        {errors.DataEdit && (
                          <div className="text-right mb-2 text-sm text-red-500">
                            {errors.DataEdit}
                          </div>
                        )}
                      </div>
                    </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 mt-2 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={handleUpdate}
                        disabled={Putloading}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {Putloading ? "جاري تعديل..." : "تعديل"}
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpenEdit(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ... باقي الكود ... */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <div dir="rtl" className="max-w-2xl mx-auto p-4 ">
        <h1 className="text-3xl font-bold text-center mb-6">اضافة عميل</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="Name" className="block mb-1 ">
              اسم العميل
            </label>
            <input
              type="text"
              id="Name"
              placeholder="ادخل اسم العميل"
              required
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
                ${errors.Name ? "outline-red-500" : "outline-gray-300"}
              `}
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
            {errors.Name && (
              <div className="mb-2 text-sm text-red-500">{errors.Name}</div>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-1 ">
              رقم العميل
            </label>
            <input
              type="phone"
              id="phoneNumber"
              placeholder="ادخل رقم الجوال"
              required
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              
                ${errors.Phone ? "outline-red-500" : "outline-gray-300"}
              `}
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
            />
            {errors.Phone && (
              <div className="mb-2 text-sm text-red-500">{errors.Phone}</div>
            )}
          </div>
          {/* تفاصيل المنتج */}
          <div>
            <label htmlFor="productDetails" className="block mb-1 ">
              تفاصيل الطلب
            </label>
            <textarea
              id="productDetails"
              placeholder="ادخل تفاصيل الطلب"
              rows={4}
              required
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.Data ? "outline-red-500" : "outline-gray-300"}

            `}
              onChange={(e) => setData(e.target.value)}
              value={Data}
            />
            {errors.Data && (
              <div className="mb-2 text-sm text-red-500">{errors.Data}</div>
            )}
          </div>

          <div className="text-center">
            <button
              disabled={Postloading}
              onClick={handleSubmit}
              type="submit"
              className="flex justify-center items-center bg-blue-700 w-full text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
              {Postloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>اضافة عميل</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {Customers && Customers.length === 0 ? (
        <div className="text-center text-2xl">لا يوجد عملاء</div>
      ) : Dataloading ? (
        <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        Customers.map((item: Props) => {
          let dateOnly;
          if (item?.updatedAt) {
            const isoString = item?.updatedAt;
            const dateObject = new Date(isoString);
            dateOnly = dateObject.toISOString().split("T")[0];
          }
          return (
            <div key={item._id} className="mt-4 mb-4 w-full">
              <div
                dir="rtl"
                className="max-w-2xl  mx-auto p-2  bg-white shadow-md rounded-md border border-gray-200 "
              >
                <div className="flex  items-center justify-between ">
                  <p className="text-sm text-gray-500 mb-2">
                    {" "}
                    تريخ الطلب : {dateOnly}
                  </p>

                  <div className="flex ">
                    <button
                      onClick={() => handleEdit(item?._id)}
                      className="flex items-center space-x-2 text-blue-500 cursor-pointer"
                    >
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => openDeleteDialog(item?._id)}
                      className="flex items-center space-x-2 text-red-500 mr-4 cursor-pointer"
                    >
                      <span>حذف</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4  ">
                  <div className="flex-shrink-0">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full pb-1 bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                      {item?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{item?.name}</p>
                    <p className="text-sm text-gray-500">{item?.phoneNumber}</p>
                  </div>
                </div>

                <div className="w-full border-t border-gray-200 mt-2 text-xl break-words">
                  {item?.data}
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default CustomersComponents;
