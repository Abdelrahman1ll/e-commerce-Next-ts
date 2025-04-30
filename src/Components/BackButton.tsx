"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // أو أي أيقونة للسهم تفضلها

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center mx-9  text-blue-600 hover:text-blue-800 cursor-pointer"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;
