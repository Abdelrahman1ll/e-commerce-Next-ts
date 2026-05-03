export const maintenanceMock = {
  results: 2,
  paginationResult: {
    currentPage: 1,
    limit: 10,
    numberOfPages: 1,
  },
  data: [
    {
      _id: "maint1",
      orderNumber: 2001,
      title: "سخان مياه كهربائي تورنيدو 50 لتر",
      description: "السخان لا يسخن المياه بشكل كافي، يرجى الفحص.",
      image: "https://m.media-amazon.com/images/I/51B00AJdN4L._AC_SX466_.jpg",
      alias: "المنزل",
      details: "شارع مكرم عبيد",
      city: "القاهرة",
      phone: "01000000001",
      user: {
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        number: "01000000001",
      },
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "maint2",
      orderNumber: 2002,
      title: "سخان مياه غاز أوليمبيك 10 لتر",
      description: "يوجد تسريب مياه من الجزء السفلي للسخان.",
      image: "https://m.media-amazon.com/images/I/51GPNcxvXSL._AC_SY450_.jpg",
      alias: "العمل",
      details: "شارع التحرير",
      city: "الجيزة",
      phone: "01500000004",
      user: {
        name: "Hassan Youssef",
        email: "hassan@example.com",
        number: "01500000004",
      },
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
};
