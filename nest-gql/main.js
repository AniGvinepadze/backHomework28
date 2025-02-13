import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { expenses, users } from "./data.js";

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(_, args) {
      const id = Number(args.id);
      return users.find((e) => e.id === id);
    },
    expenses() {
      return expenses;
    },
  },
  Expense: {
    user(parent) {
      return users.find((e) => e.id === parent.userId);
    },
  },
  User: {
    expense(parent) {
      return expenses.filter((e) => e.userId === parent.id);
    },
  },
  Mutation: {
    createUser(_, args) {
      const { name, age } = args.createUserDto;
      const lastId = users[users.length - 1]?.id || 0;
      const newUser = {
        id: lastId + 1,
        name,
        age,
        expenses: [],
      };
      users.push(newUser);
      return newUser;
    },
    deleteUser(_, args) {
      const id = Number(args.id);
      const index = users.findIndex((e) => e.id === id);
      const deleteUser = users.splice(index, 1);
      return deleteUser[0];
    },
    updateUser(_, args) {
      const id = Number(args.id);
      const { name, age } = args.updateUserDto;
      const index = users.findIndex((e) => e.id === id);
      const updatedUser = {};

      if (name)  updatedUser.name = name;
      if (age) updatedUser.age = age;

      return updatedUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 3000 } });
console.log(`server is running on ${url}`);

// მოგესალმებით თქვენი დავალება შემდეგია

// 1) შექმენით graphQL ის CRUD
// 2) უნდა გქონდეთ users და expenses ენდფოინთები
// 3) გააკეთეთ მათ შორის რელაცია
// 4) users და expenses მასივები ჩაწერეთ მანდვე data.js ში ცვლადებში.
