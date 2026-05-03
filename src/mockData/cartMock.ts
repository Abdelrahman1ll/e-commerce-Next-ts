export const cartMock = {
  status: "success",
  numOfCartItems: 1,
  data: {
    _id: "cart1",
    cartOwner: "admin1",
    products: [
      {
        count: 1,
        _id: "cartProduct1",
        product: {
          _id: "641351649",
          title: "Mock Product 1",
          price: "100",
          images: ["https://placehold.co/150x150"],
          averageRating: 4.5,
        },
        price: 100,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
    totalCartPrice: 100,
  },
};
