export const userListMock = {
  data: {
    users: [
      {
        _id: "u1",
        name: "Omar",
        lastName: "Farouk",
        email: "omar@example.com",
        number: "01000000001",
        date: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "u2",
        name: "Laila",
        lastName: "Ahmed",
        email: "laila@example.com",
        number: "01100000002",
        date: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: "u3",
        name: "Tarek",
        lastName: "Hassan",
        email: "tarek@example.com",
        number: "01200000003",
        date: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ],
  },
};
