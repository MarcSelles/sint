import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const getPreprClient = (preview) => {
  const { PREPR_ACCESS_TOKEN: accessToken, PREPR_PREVIEW_ACCESS_TOKEN: previewToken } = process.env;

  const token = preview ? previewToken : accessToken;

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };
  });

  const httpLink = createHttpLink({
    uri: `https://graphql.prepr.io/${token}`
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};

export const errorHandling = async (error) => {
  if (error.networkError && error.networkError.statusCode === 429) {
    return false;
  }
  throw error;
};

export default getPreprClient;
