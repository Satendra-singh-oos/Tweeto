import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export async function initServer() {
  const app = express();
  const graphqlServer = new ApolloServer({
    typeDefs: `type Query {
      sayHello:String
      sayHelloToMe(name:String!):String
      sayHelloToMeNotNull(name:String!):String!
    }
     
    `,
    resolvers: {
      Query: {
        sayHello: () => "Hello From Graphql Server",
        sayHelloToMe: (parent: any, { name }: { name: string }) => null,
        sayHelloToMeNotNull: (parent: any, { name }: { name: string }) =>
          `Hey ${name}`,
      },
    },
  });

  await graphqlServer.start();

  app.use("/graphql", express.json(), expressMiddleware(graphqlServer));

  return app;
}
