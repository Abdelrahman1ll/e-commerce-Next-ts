"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import UseAddressComponents from "./Address-Components";
interface Address {
  _id: string;
  alias: string;
  details: string;
  phone: string;
  city: string;
  user: string;  
}

const AddressComponents = () => {
  const {
    handleAddress,
    handleEdit,
    Edit,
    handleDelete,
    isLoading,
    addresses,
    open,
    setOpen,
    Editopen,
    setEditopen,
    error,
    setSelected,
    selected,
    Governorate,
    setGovernorate,
    Addresses,
    setAddresses,
    Number,
    setNumber,
    EditNumber,
    setEditNumber,
    EditGovernorate,
    setEditGovernorate,
    EditAddresses,
    setEditAddresses,
    Editselected,
    setEditselected,
    errors,
  } = UseAddressComponents();

  return (
    <div dir="rtl" className="w-full p-4">
      <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                    اضافة عنوان
                  </DialogTitle>
                </div>

                <div dir="rtl">
                  <div className="flex w-30 mb-2 justify-between">
                    <div
                      onClick={() => setSelected("المنزل")}
                      className={`border-2 py-1 px-2 cursor-pointer mx-2 rounded-full 
                        
                        ${
                          selected === "المنزل"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
                    >
                      المنزل
                    </div>
                    <div
                      onClick={() => setSelected("العمل")}
                      className={`border-2 py-1 px-2 cursor-pointer mx-2 rounded-full ${
                        selected === "العمل"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }
                      `}
                    >
                      العمل
                    </div>
                  </div>
                  {errors.selected && (
                    <div className="mt-2 text-right text-sm text-red-500">
                      {errors.selected}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm/6 font-medium text-gray-900 text-right"
                    >
                      العنوان
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
                          ${
                            errors.Address
                              ? "outline-red-500"
                              : "outline-gray-300"
                          }
                          
                          `}
                        placeholder="ادخل العنوان"
                        onChange={(e) => setAddresses(e.target.value)}
                        value={Addresses}
                      />
                      {errors.Address && (
                        <div className="mt-2 text-right text-sm text-red-500">
                          {errors.Address}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="number"
                      className="block text-sm/6 font-medium text-gray-900 text-right"
                    >
                      رقم الهاتف
                    </label>
                    <div className="mt-2">
                      <input
                        id="number"
                        name="number"
                        type="phone"
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
                          ${
                            errors.Number
                              ? "outline-red-500"
                              : "outline-gray-300"
                          }
                          
                          `}
                        placeholder="ادخل رقم الهاتف "
                        onChange={(e) => setNumber(e.target.value)}
                        value={Number}
                      />
                      {errors.Number && (
                        <div className="mt-2 text-right text-sm text-red-500">
                          {errors.Number}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="Governorate"
                      className="block text-sm/6 font-medium text-gray-900 text-right"
                    >
                      المحافظة
                    </label>
                    <div className="mt-2">
                      <input
                        id="Governorate"
                        name="Governorate"
                        type="text"
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
                          ${
                            errors.Governorate
                              ? "outline-red-500"
                              : "outline-gray-300"
                          }
                          
                          `}
                        placeholder="ادخل المحافظة"
                        onChange={(e) => setGovernorate(e.target.value)}
                        value={Governorate}
                      />
                      {errors.Governorate && (
                        <div className="mt-2 text-right text-sm text-red-500">
                          {errors.Governorate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleAddress}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-8 py-2 text-base font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

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
                    تحديث العنوان
                  </DialogTitle>
                </div>

                <div dir="rtl">
                  <div className="flex w-30 mb-2 justify-between">
                    <div
                      onClick={() => setEditselected("المنزل")}
                      className={`border-2 py-1 px-2 cursor-pointer mx-2 rounded-full 
                        
                        ${
                          Editselected === "المنزل"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                        `}
                    >
                      المنزل
                    </div>
                    <div
                      onClick={() => setEditselected("العمل")}
                      className={`border-2 py-1 px-2 cursor-pointer mx-2 rounded-full ${
                        Editselected === "العمل"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }
                      `}
                    >
                      العمل
                    </div>
                  </div>
                  {errors.selected && (
                    <div className="mt-2 text-right text-sm text-red-500">
                      {errors.selected}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm/6 font-medium text-gray-900 text-right"
                    >
                      العنوان
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
                          ${
                            errors.Address
                              ? "outline-red-500"
                              : "outline-gray-300"
                          }
                          
                          `}
                        placeholder="ادخل العنوان"
                        onChange={(e) => setEditAddresses(e.target.value)}
                        value={EditAddresses}
                      />
                      {errors.Address && (
                        <div className="mt-2 text-right text-sm text-red-500">
                          {errors.Address}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="number"
                      className="block text-sm/6 font-medium text-gray-900 text-right"
                    >
                      رقم الهاتف
                    </label>
                    <div className="mt-2">
                      <input
                        id="number"
                        name="number"
                        type="phone"
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
                          ${
                            errors.Number
                              ? "outline-red-500"
                              : "outline-gray-300"
                          }
                          
                          `}
                        placeholder="ادخل رقم الهاتف "
                        onChange={(e) => setEditNumber(e.target.value)}
                        value={EditNumber}
                      />
                      {errors.Number && (
                        <div className="mt-2 text-right text-sm text-red-500">
                          {errors.Number}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="Governorate"
                      className="block text-sm/6 font-medium text-gray-900 text-right"
                    >
                      المحافظة
                    </label>
                    <div className="mt-2">
                      <input
                        id="Governorate"
                        name="Governorate"
                        type="text"
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600
                          ${
                            errors.Governorate
                              ? "outline-red-500"
                              : "outline-gray-300"
                          }
                          
                          `}
                        placeholder="ادخل المحافظة"
                        onChange={(e) => setEditGovernorate(e.target.value)}
                        value={EditGovernorate}
                      />
                      {errors.Governorate && (
                        <div className="mt-2 text-right text-sm text-red-500">
                          {errors.Governorate}
                        </div>
                      )}
                    </div>
                  </div>
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

      <button
        onClick={() => setOpen(true)}
        className="bg-white border border-blue-500 text-blue-500 w-full p-1  rounded-md mb-4 text-base cursor-pointer"
      >
        اضافة عنوان جديد
      </button>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        // حالة الخطأ
        <div className="text-red-500 text-center py-4 ">
          حدث خطأ في جلب البيانات، يرجى المحاولة لاحقًا
        </div>
      ) : addresses?.length > 0 ? (
        addresses.map((item: Address) => (
          <div
            key={item._id}
            className="bg-white rounded-lg mb-4 shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                  {item.alias}
                </span>
              </div>

              <div
                onClick={() => Edit(item._id)}
                className="text-sm text-gray-600 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
              >
                تعديل
              </div>
            </div>

            <div className="mb-3">
              <span className="font-semibold text-gray-700 ml-1">العنوان:</span>
              <span className="text-gray-800 block">{item.details}</span>
            </div>

            <div className="flex items-center mb-3">
              <span className="font-semibold text-gray-700 ml-1">
                رقم الهاتف :
              </span>
              <span className="text-gray-800">{item.phone}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 ml-1">
                  المحافظه:
                </span>
                <span className="text-gray-800">{item.city}</span>
              </div>
              <div
                onClick={() => handleDelete(item._id)}
                className="text-sm  text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
              >
                حذف
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">لا توجد عناوين مضافه</p>
      )}
    </div>
  );
};

export default AddressComponents;
