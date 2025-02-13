export const typeDefs = `#graphql
  
  type User{
    id:ID
    name:String
    age:Int
    expense:[Expense]
  }

  type Expense{
    id:ID
    price:Int
    category:String,
    user:User
  }
  type Query{
    users:[User]
    user(id:ID!):User
    expenses:[Expense]


}

  input CreateUserDto{
    name:String
    age:Int
  }

type Mutation{
    createUser(createUserDto:CreateUserDto!): User
    deleteUser(id:ID!):User
    updateUser(updateUserDto:CreateUserDto!,id:ID!): User
}

`;
