import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user";
import { Tweet } from "./tweet";
import cors from "cors";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../interface";

export async function initServer() {
  const app = express();

  app.use(cors());
  app.get("/", (req, res) =>
    res.status(200).json({ message: "Server is up and running" })
  );

  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
    ${User.types}
    ${Tweet.types}


     type Query {
       ${User.queries}
       ${Tweet.queries}
       
    }

    type Mutation{
    ${Tweet.muatations}
    ${User.mutations}
    }



   `,

    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Tweet.resolvers.queries,
      },
      Mutation: {
        ...Tweet.resolvers.mutations,
        ...User.resolvers.mutations,
      },
      ...Tweet.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers,
    },
  });

  await graphqlServer.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
                req.headers.authorization.split("Bearer ")[1]
              )
            : undefined,
        };
      },
    })
  );

  return app;
}
