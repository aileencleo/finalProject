const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "123",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "lostinthecity",
    email: "capriccio_000@yahoo.com",
    password: "",
    role: "user",
  },
];

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const userModel = {
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  updateOne: (id: number, update: any) => {
    const userIndex = database.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const updatedUser = { ...database[userIndex], ...update };
      database[userIndex] = updatedUser;
      return updatedUser;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  getAllUsers: () => {
    return database;
  },
};

export { database, userModel, User };
