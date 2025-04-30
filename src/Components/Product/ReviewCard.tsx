"use client";

import { FC, useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import {
  useDeleteReviewMutation,
  usePutReviewMutation,
} from "@/redux/Home/Product/ApiProducts";
import notify from "../notify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import StarRatings from "react-star-ratings";
type ReviewCardProps = {
  customerName: string;
  rating: number;
  reviewMessage: string;
  reviewId: string;
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`h-6 w-6 ${filled ? "text-yellow-500" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.157 3.558a1 1 0 00.95.69h3.73c.969 0 1.371 1.24.588 1.81l-3.02 2.197a1 1 0 00-.363 1.118l1.158 3.558c.3.92-.755 1.68-1.54 1.118L10 14.347l-3.02 2.197c-.784.56-1.838-.197-1.539-1.118l1.158-3.558a1 1 0 00-.363-1.118L3.215 8.985c-.783-.57-.38-1.81.588-1.81h3.73a1 1 0 00.951-.69l1.157-3.558z" />
  </svg>
);

const ReviewCard: FC<ReviewCardProps> = ({
  customerName,
  rating: initialRating, // تغيير الاسم لاستخدامه كقيمة أولية
  reviewMessage: initialReviewMessage,
  reviewId,
}) => {
  const [updateReview] = usePutReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [reviewMessage, setReviewMessage] = useState(initialReviewMessage);
  const [errors, setErrors] = useState({
    rating: "",
    reviewMessage: "",
  });
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await deleteReview(reviewId).unwrap();
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.data?.message === "غير مصرح لك بحذف هذه المراجعة") {
        notify("غير مصرح لك بحذف هذه التقييم", "error");
      }
    }
  };

  // تحديث الحالة عند تغيير القيم الأولية
  useEffect(() => {
    setRating(initialRating);
    setReviewMessage(initialReviewMessage);
  }, [initialRating, initialReviewMessage]);

  const handleEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (rating === 0) {
      newErrors.rating = "يرجى تقييم المنتج";
      valid = false;
    } else {
      newErrors.rating = "";
    }

    if (!reviewMessage.trim()) {
      newErrors.reviewMessage = "يرجى كتابة رسالة التقييم";
      valid = false;
    } else {
      newErrors.reviewMessage = "";
    }

    setErrors(newErrors);

    if (valid) {
      try {
        await updateReview({
          id: reviewId,
          data: {
            rating: rating,
            review: reviewMessage,
          },
        }).unwrap();

        setOpen(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
        if (error.data?.message === "غير مصرح لك بتعديل هذه التقييم") {
          notify("غير مصرح لك بتعديل هذه التقييم", "warn");
        } else {
          notify("فشل في التعديل", "error");
        }
      }
    }
  };
  const nameDisplay = (customerName ?? "").trim();
  const reviewDisplay = (reviewMessage ?? "").trim();
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
                    اكمل بياناتك الشخصية
                  </DialogTitle>
                </div>

                <div dir="rtl" className=" sm:items-start mb-2 gap-4">
                  {/* قسم النجوم */}
                  <div className="text-center">
                    <StarRatings
                      rating={rating}
                      starRatedColor="#ffd700"
                      numberOfStars={5}
                      starDimension="30px"
                      starSpacing="2px"
                      changeRating={setRating}
                      name="rating"
                      direction="rtl"
                    />
                    {errors?.rating && (
                      <div className="mb-2 text-sm text-red-500">
                        {errors?.rating}
                      </div>
                    )}
                  </div>

                  {/* قسم حقل التقييم */}
                  <div className=" w-full mt-4 sm:mt-0">
                    <div className="text-right">
                      <label
                        htmlFor="review"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        التقييم
                      </label>
                      <textarea
                        id="review"
                        name="review"
                        required
                        className={`w-full text-end p-3 border  rounded-md focus:outline-none focus:border-blue-400
                          ${
                            errors.reviewMessage
                              ? "border-red-500"
                              : "border-gray-300"
                          }
                          
                          `}
                        placeholder="...اكتب التقييم الجديد هنا"
                        value={reviewMessage}
                        onChange={(e) => setReviewMessage(e.target.value)}
                        rows={3}
                        style={{ textAlign: "right" }}
                      />
                      {errors.reviewMessage && (
                        <div className="mb-2 text-sm text-red-500">
                          {errors.reviewMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  تعديل
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <div className="flex flex-row-reverse items-center justify-between mb-6 mt-3">
        <div className="flex items-center">
          {/* عرض اسم العميل */}
          <p className="font-bold mr-2">{nameDisplay}</p>
          {/* دائرة تعرض أول حرف من اسم العميل */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
            {nameDisplay.trim().charAt(0).toUpperCase()}
          </div>
        </div>
        {/* أيقونات تعديل وحذف */}
        <div className="flex">
          <button onClick={() => setOpen(true)}>
            <Edit className="mr-3 h-5 w-5 text-black hover:text-blue-500 cursor-pointer" />
          </button>
          <button onClick={handleDelete}>
            <Trash className="h-5 w-5 text-black hover:text-blue-500 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* عرض النجوم */}
      <div className="flex items-center space-x-1 flex-row-reverse mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={rating >= i + 1} />
        ))}
      </div>

      {/* عرض رسالة التقييم */}
      <div className="border-b border-gray-300 text-end">
        <p className="text-2xl mb-4">{reviewDisplay}</p>
      </div>
    </>
  );
};

export default ReviewCard;
