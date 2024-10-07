import type { CodegenConfig } from "@graphql-codegen/cli";

//! make this false for local devlopment
const awsDeploy = true;

const config: CodegenConfig = {
  overwrite: true,
  schema: awsDeploy
    ? (process.env.NEXT_PUBLIC_API_DEPLOY_URL as string)
    : (process.env.NEXT_PUBLIC_API_LOCAL_URL as string),
  documents: "**/*.{tsx,ts}",
  generates: {
    "src/lib/gql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
