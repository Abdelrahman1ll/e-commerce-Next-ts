export const reviewsProduct1 = {
  results: 2,
  data: {
    reviews: [
      {
        _id: "r1",
        review: "منتج ممتاز جداً، انصح بشرائه، الجودة رائعة.",
        rating: 5,
        user: { name: "أحمد محمد" },
        createdAt: new Date().toISOString(),
      },
      {
        _id: "r2",
        review: "جيد جداً، ولكن السخان يأخذ وقتاً طويلاً في التسخين.",
        rating: 4,
        user: { name: "ليلى حسن" },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
};

export const reviewsProduct2 = {
  results: 2,
  data: {
    reviews: [
      {
        _id: "r3",
        review: "السعر مرتفع قليلاً مقارنة بماركات أخرى.",
        rating: 3,
        user: { name: "محمود علي" },
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        _id: "r4",
        review: "لم يعجبني كثيراً، هناك صوت مزعج أثناء العمل.",
        rating: 2,
        user: { name: "نورا إبراهيم" },
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
    ],
  },
};

export const reviewsProduct3 = {
  results: 1,
  data: {
    reviews: [
      {
        _id: "r5",
        review: "سخان رائع وتوفير كبير في استهلاك الكهرباء.",
        rating: 5,
        user: { name: "ياسر خالد" },
        createdAt: new Date(Date.now() - 345600000).toISOString(),
      },
    ],
  },
};

export const reviewsProduct4 = {
  results: 1,
  data: {
    reviews: [
      {
        _id: "r6",
        review: "خدمة ما بعد البيع سيئة جداً، لا انصح بالتعامل معهم.",
        rating: 1,
        user: { name: "سامح مصطفى" },
        createdAt: new Date(Date.now() - 432000000).toISOString(),
      },
    ],
  },
};

export const reviewsMock = {
  results: 1,
  data: {
    reviews: [
      {
        _id: "rf1",
        review: "تقييم عام للمنتج، الجودة جيدة جداً.",
        rating: 4,
        user: { name: "مستخدم عام" },
        createdAt: new Date().toISOString(),
      },
    ],
  },
};

