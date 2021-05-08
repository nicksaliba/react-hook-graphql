import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    categories: [Category!]
    getCategory(id:ID!):Category
  }
  type Error{
    message:String
  }
  type CategoryResponse{
    ok:Boolean
    errors:[Error]
  }
  type Category {
    id: ID
    term: String
    keywords:[String]
  }
  type Mutation {
    createCategory(term: String,keywords:[String]): Category
    updateCategory(term: String,keywords:[String]): Category
    deleteCategory(term: String): Category
  }
`;