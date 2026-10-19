/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */

// Mock dish records
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

// In-memory orders store
const mockOrders = [
  {
    id: "ord_165",
    userId: "user_addis_101",
    items: [
      {
        dishId: "dish_1",
        name: "Doro Wat",
        price: 350,
        quantity: 2,
      },
      {
        dishId: "dish_2",
        name: "Beyaynetu",
        price: 220,
        quantity: 1,
      },
    ],
    total: 920,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ord_166",
    userId: "user_addis_101",
    items: [
      {
        dishId: "dish_3",
        name: "Kitfo",
        price: 400,
        quantity: 1,
      },
    ],
    total: 400,
    status: "PREPARING",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ord_167",
    userId: "user_addis_101",
    items: [
      {
        dishId: "dish_4",
        name: "Shiro Tegabeno",
        price: 180,
        quantity: 2,
      },
    ],
    total: 360,
    status: "READY",
    createdAt: new Date().toISOString(),
  },
];

// Mock authenticated user session
const mockSessionUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
};

/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
}

/**
 * Create a new order in memory
 */
export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    userId: mockSessionUser.id,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}

/**
 * Retrieve a specific order by ID
 */
export async function getOrder(id) {
  const order = mockOrders.find((o) => o.id === id);
  return mockOrders || null;
}

/**
 * Mark an order as cancelled
 */
export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}

/**
 * Read current authenticated user session
 */
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