import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { tkUiReactV2ServiceSchema } from './tk-ui-react-v2-service.graphql.js';
import { TkUiReactV2Service } from './tk-ui-react-v2-service.js';

export async function run() {
  // ports are injects by Bit to `process.env.PORT`
  const port = parseInt(process.env.PORT, 10) || 3000;
  const tkUiReactV2Service = TkUiReactV2Service.from();
  
  const { typeDefs, resolvers } = tkUiReactV2ServiceSchema(tkUiReactV2Service);
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers })
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: {
      port
    }
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  GraphQL Server ready at: ${url}`);

  return {
    port,
    stop: async () => {
      await server.stop();
    }
  }
}
