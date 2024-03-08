import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export class GraphQLClient {
  private static instance: ApolloClient<NormalizedCacheObject>;

  private constructor() {}

  public static async getInstance(): Promise<
    ApolloClient<NormalizedCacheObject>
  > {
    if (!GraphQLClient.instance) {
      const endpoint = process.env.GRAPHQL_ENDPOINT as string;

      const graphQLClient = new ApolloClient({
        uri: endpoint,
        cache: new InMemoryCache(),
        headers: {
          "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
        },
      });

      GraphQLClient.instance = graphQLClient;
    }

    return GraphQLClient.instance;
  }
}
