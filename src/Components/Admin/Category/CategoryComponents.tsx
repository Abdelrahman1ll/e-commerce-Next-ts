"use client";
import notify from "@/Components/notify";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  usePutCategoryMutation,
  usePostCategoryMutation,
} from "@/redux/Admin/ApiCategoryBrand";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

type Props = {
  _id: string;
  name: string;
};

const AddCategoryComponents = () => {
  const [open, setOpen] = useState(false);

  const [Name, setName] = useState("");
  const [nameId, setNameId] = useState("");
  const [postname, setPostname] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    postname: "",
  });
  const { data: categories, isLoading, refetch } = useGetCategoryQuery({});
  const [deleteCategory] = useDeleteCategoryMutation({});
  const [putCategory] = usePutCategoryMutation();
  const [postCategory] = usePostCategoryMutation();
  const cat = categories?.data || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      refetch();
      
    } catch {
      notify("حدث خطا ما", "error");
    }
  };
  const CatId = (id: string) => {
    setOpen(true);
    const categorie = cat?.find((item: Props) => item._id === id);
    if (categorie) {
      setNameId(categorie._id);
      setName(categorie.name);
    }
  };
  const handlePutCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (!Name.trim()) {
      newErrors.name = "لا يمكن ان يكون الاسم فارغ";
      valid = false;
    } else if (Name.length < 3) {
      newErrors.name = "الاسم غير صالح";
    } else {
      newErrors.name = "";
    }
    setErrors(newErrors);
    if (valid) {
      try {
        await putCategory({
          id: nameId,
          data: { name: Name },
        }).unwrap();
        setOpen(false);
        refetch();
      } catch  {
        notify("حدث خطا ما", "error");
      }
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (!postname.trim()) {
      newErrors.postname = "لا يمكن ان يكون الاسم فارغ";
      valid = false;
    } else if (postname.length < 3) {
      newErrors.postname = "الاسم غير صالح";
    } else {
      newErrors.postname = "";
    }
    setErrors(newErrors);

    if (valid) {
      try {
         await postCategory({
          name: postname,
        }).unwrap();
        setOpen(false);
        refetch();
        setPostname("");
      } catch  {
        notify("حدث خطا ما", "error");
      }
    }
  };

  return (
    <>
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
                    تعديل الفئة
                  </DialogTitle>
                </div>
                <div dir="rtl" className="sm:flex sm:items-start mb-2">
                  <div className="mt-2 text-right ">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        اسم الفئة
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 
                              ${
                                errors.name
                                  ? "outline-red-500"
                                  : "outline-gray-300"
                              }
                    
                    `}
                          placeholder=""
                          onChange={(e) => setName(e.target.value)}
                          value={Name}
                        />
                        {errors.name && (
                          <div className="mb-2 text-sm text-red-500">
                            {errors.name}
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
                  onClick={handlePutCategory}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  تعديل
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <div dir="rtl" className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">اضافة فئة جديد</h1>

        <div className="flex justify-center ">
          <div className="mb-8 w-full ml-2">
            <label htmlFor="productName" className="block mb-1 ">
              اسم الفئة
            </label>
            <input
              type="text"
              id="productName"
              placeholder="ادخل اسم الفئة"
              required
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6
              ${errors.postname ? "outline-red-500" : "outline-gray-300"}
              `}
              onChange={(e) => setPostname(e.target.value)}
              value={postname}
            />
            {errors.postname && (
              <div className="mb-2 text-sm text-red-500">{errors.postname}</div>
            )}
          </div>
          <div className="mt-7">
            <button
              type="submit"
              onClick={handlePost}
              className=" w-full  justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3  cursor-pointer"
            >
              اضافة
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          cat &&
          cat.map((item: Props) => (
            <div
              key={item._id}
              dir="rtl"
              className="p-2  mb-4 max-w-4xl mx-auto bg-white shadow-md rounded-md border border-gray-200 cursor-pointer"
            >
              <div className="flex  items-center justify-between ">
                <p className="font-bold">{item.name}</p>
                <div className="flex ">
                  <button
                    onClick={() => CatId(item._id)}
                    className="flex items-center space-x-2 text-blue-500 cursor-pointer"
                  >
                    <span>تعديل</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center space-x-2 text-red-500 mr-4 cursor-pointer"
                  >
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AddCategoryComponents;
