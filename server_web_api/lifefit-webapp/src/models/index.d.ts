import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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