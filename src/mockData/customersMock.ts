export const customersMock = {
  results: 3,
  paginationResult: {
    currentPage: 1,
    limit: 10,
    numberOfPages: 1,
  },
  data: [
    {
      _id: "user1",
      name: "Ahmed Ali",
      phoneNumber: "01000000001",
      data: "عميل مهتم بشراء سخان غاز جديد ويحتاج لمزيد من التفاصيل",
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "user2",
      name: "Mona Salem",
      phoneNumber: "01200000002",
      data: "استفسار عن أسعار السخانات الكهربائية والصيانة الدورية",
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "user3",
      name: "Khaled Hassan",
      phoneNumber: "01100000003",
      data: "طلب متابعة ما بعد البيع لسخان تورنيدو الذي تم تركيبه",
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "admin1",
      name: "Admin User",
      phoneNumber: "01012345678",
      data: "مدير النظام",
      updatedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};
