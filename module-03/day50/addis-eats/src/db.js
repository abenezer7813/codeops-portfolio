
const MENU_API = "https://addis-eats-backend.onrender.com/menu/";

export async function getDishes() {
  const response = await fetch(MENU_API, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dishes");
  }

  const result = await response.json();

  if (result.status !== "ok" || !Array.isArray(result.data)) {
    throw new Error("Invalid menu API response");
  }

  return result.data;
}

export async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((dish) => dish.id === id) || null;
}

export const db = {
  dish: {
    findMany: async () => getDishes(),

    findUnique: async ({ where }) => getDish(where.id),
  },

  order: {
    findMany: async () => [...mockOrders],
  },
};

const mockOrders = [
  {
    id: "ord_168",
    userId: "user_addis_101",
    customer: {
      name: "Abebe Bikila",
      email: "abebe@example.com",
      phone: "911234567",
    },
    delivery: {
      subCity: "Bole",
      street: "Near Edna Mall",
      landmark: "Opposite the mall",
      deliveryTime: "immediate",
    },
    paymentMethod: "telebirr",
    items: [
      {
        dishId: "dish_1",
        name: "Doro Wat",
        price: 350,
        quantity: 2,
      },
    ],
    total: 850,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
];

const mockSessionUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
};

export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    userId: mockSessionUser.id,

    customer: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },

    delivery: {
      subCity: data.subCity,
      street: data.street,
      landmark: data.landmark,
      deliveryTime: data.deliveryTime,
    },

    paymentMethod: data.paymentMethod,
    items: data.items,
    total: data.total,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);

  return newOrder;
}

export async function getOrder(id) {
  return mockOrders.find((order) => order.id === id) || null;
}

export async function markCancelled(id) {
  const order = mockOrders.find((order) => order.id === id);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();

  return order;
}

export async function getSession() {
  return mockSessionUser;
}

const mockUsers = [];

export async function createUser(data) {
  const exists = mockUsers.some(
    (user) => user.email === data.email
  );

  if (exists) {
    throw new Error("An account with this email already exists");
  }

  const newUser = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password,
  };

  mockUsers.push(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

export async function findUserByEmail(email) {
  return mockUsers.find((user) => user.email === email) || null;
}
