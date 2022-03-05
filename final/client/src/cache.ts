import { InMemoryCache, Reference, makeVar } from '@apollo/client';
import { moduleGenerations } from './utils/constants';

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
    },
    Battery: {
    fields: {
        moduleCount: {
          read(_, {variables}) {
            return 28
            // return moduleGenerations[variables.make].find(generation => generation.name = variables.generation).moduleCount
          }
        },
        shippingCost: {
          keyArgs: false,
          read(existing: any, { readField }) {
            // later use args from the second param with user's location
            // existing looks like it's always undefined, not sure why
            // keyArgs: false doesn't help, the below code runs when navigating back, don't see this field in cache on devtools
            
            return Math.round(readField('distance') as number * 0.90 )
          }
        }
      }
    }
  }
});

export const isLoggedInVar =
  makeVar<boolean>(!!localStorage.getItem('token'));
export const cartItemsVar = makeVar<string[]>([]);
export const listingFilterVar = makeVar<{model: string[], moduleId: string[], generation: string[]}>({model: [], moduleId: [], generation: []});