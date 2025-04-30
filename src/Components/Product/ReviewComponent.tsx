"use client";
// import StarRatings from "react-star-ratings";
import dynamic from "next/dynamic";
const StarRatings = dynamic(
  () => import('react-star-ratings'),
  { ssr: false }
);
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  useGetReviewsQuery,
  usePostReviewMutation,
} from "@/redux/Home/Product/ApiProducts";
import notify from "../notify";
const ReviewComponent = ({ id }: { id: string }) => {
  const { data: reviews, refetch } = useGetReviewsQuery(id);
  const reviewsData = reviews?.data?.reviews;
  const [postReview, { isLoading }] = usePostReviewMutation();
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [errors, setErrors] = useState({
    rating: "",
    reviewMessage: "",
  });
  const changeRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        await postReview({
          product: id,
          review: reviewMessage,
          rating: rating,
        }).unwrap();
        setReviewMessage("");
        setRating(0);
        refetch();
      } catch (error) {
        
        if (error.data?.message === "لقد قمت بتقييم هذا المنتج من قبل") {
          notify("لقد قمت بتقييم هذا المنتج من قبل", "warn");
        }else if (error.data?.message === "You do not have permission to access this path.") {
          notify("غير مصرح للادمن بالتقييم", "error");
        }else if(error.data?.message === "You are not logged in. Please log in to access this page."){
          notify("يرجى تسجيل الدخول ", "error");
        }
      }
    }
  };

  return (
    <>
      {/* قسم نموذج التقييم */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full  p-4 border border-gray-200 rounded-md shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-1 text-center">تقييم المنتج</h2>
          <form className="text-end">
            {/* تقييم النجوم */}
            <div className="text-end">
              <p className="mb-2">اختر عدد النجوم</p>
              <div className="flex mb-3 justify-end">
                <div>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffd700"
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="2px"
                    changeRating={changeRating}
                    name="rating"
                    direction="rtl"
                  />
                  {errors.rating && (
                    <div className="mb-2 text-sm text-red-500">
                      {errors.rating}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* حقل رسالة التقييم */}
            <div className="mb-4">
              <label htmlFor="review" className="block mb-2 font-medium">
                رسالتك
              </label>
              <textarea
                id="review"
                placeholder="...اكتب تقييمك هنا"
                className={`w-full text-end p-3 border  rounded-md focus:outline-none focus:border-blue-400
                  ${errors.reviewMessage ? "border-red-500" : "border-gray-300"}
                  
                  `}
                rows={2}
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
              ></textarea>
              {errors.reviewMessage && (
                <div className="mb-2 text-sm text-red-500">
                  {errors.reviewMessage}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="submit"
                className="min-w-[120px] h-10 flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  <span>ارسال التقييم</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* قسم عرض التعليقات */}

{
  reviewsData?.length !== 0 ? (
    <div className="mb-4 p-6 border border-gray-200 rounded-md shadow-md bg-white ml-4 mr-4">
    {/* صف يحتوي على اسم العميل مع الدائرة وأيقونات التعديل والحذف */}

    {reviewsData &&
      reviewsData.map((re) => (
        <ReviewCard
          key={re?._id}
          customerName={re.user?.name}
          rating={re?.rating}
          reviewMessage={re?.review}
          reviewId={re?._id}
        />
      ))}
  </div>
  ):(
    ''
  )
}
     
    </>
  );
};

export default ReviewComponent;
