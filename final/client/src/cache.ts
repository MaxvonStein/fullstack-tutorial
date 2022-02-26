import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            // field policy read functions override values in the cache or the server
            return isLoggedInVar();
          }
        },
        cartItems: {
          read() {
            return cartItemsVar();
          }
        },
        listingFilter: {
          read() {
            // don't add a __typename field here
            return listingFilterVar();
          }
        },
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            // field policy specific function tat specifies wat appens wen a field's value is written
            let launches: Reference[] = [];
            // typed
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          }
        }
      }
    }
  }
});

export const isLoggedInVar =
  makeVar<boolean>(!!localStorage.getItem('token'));
export const cartItemsVar = makeVar<string[]>([]);
export const listingFilterVar = makeVar<{model: string[]}>({model: []});