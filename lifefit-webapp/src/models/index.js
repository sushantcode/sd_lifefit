// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FitbitTokens, UserDetails } = initSchema(schema);

export {
  FitbitTokens,
  UserDetails
};