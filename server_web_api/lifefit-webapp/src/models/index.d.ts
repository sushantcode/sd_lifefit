import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class FitbitTokens {
  readonly id: string;
  readonly access_token?: string;
  readonly refresh_token?: string;
  readonly user_id?: string;
  readonly expires_in?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FitbitTokens>);
  static copyOf(source: FitbitTokens, mutator: (draft: MutableModel<FitbitTokens>) => MutableModel<FitbitTokens> | void): FitbitTokens;
}

export declare class UserDetails {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly fName: string;
  readonly lName: string;
  readonly phone?: string;
  readonly street?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zipcode?: string;
  readonly gender?: string;
  readonly profile_pic?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserDetails>);
  static copyOf(source: UserDetails, mutator: (draft: MutableModel<UserDetails>) => MutableModel<UserDetails> | void): UserDetails;
}