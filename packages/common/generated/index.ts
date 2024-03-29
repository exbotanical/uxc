import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Message as MessageModel, Friend as FriendModel, FriendRequestStatus as FriendRequestStatusModel, FriendRequestOptions as FriendRequestOptionsModel, Context } from '../node/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export enum FriendRequestOptions {
  Both = 'BOTH',
  Recv = 'RECV',
  Sent = 'SENT'
}

export type FriendRequestResult = ReceivedFriendRequest | SentFriendRequest;

export enum FriendRequestStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type FriendRequestUser = {
  __typename?: 'FriendRequestUser';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  requestId?: Maybe<Scalars['String']>;
  userImage?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type JoinInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userImage?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  _id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  sender?: Maybe<User>;
  threadId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type MessageResult = {
  __typename?: 'MessageResult';
  _id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  sender?: Maybe<User>;
  threadId?: Maybe<PrivateThread>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelFriendRequest?: Maybe<Scalars['ID']>;
  createFriendRequest?: Maybe<Scalars['ID']>;
  createMessage?: Maybe<Message>;
  createThread?: Maybe<PrivateThread>;
  deleteThread?: Maybe<Scalars['ID']>;
  join?: Maybe<User>;
  purge?: Maybe<Scalars['Boolean']>;
  removeFriend?: Maybe<Scalars['ID']>;
  seed?: Maybe<SeedReturnValue>;
  signin?: Maybe<User>;
  signout?: Maybe<Scalars['ID']>;
  updateFriendRequest?: Maybe<Scalars['ID']>;
  updateMessage?: Maybe<Message>;
};


export type MutationCancelFriendRequestArgs = {
  requestId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateFriendRequestArgs = {
  recipientId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateMessageArgs = {
  body?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateThreadArgs = {
  receiverId?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteThreadArgs = {
  threadId?: InputMaybe<Scalars['ID']>;
};


export type MutationJoinArgs = {
  args?: InputMaybe<JoinInput>;
};


export type MutationRemoveFriendArgs = {
  friendId?: InputMaybe<Scalars['ID']>;
};


export type MutationSigninArgs = {
  args?: InputMaybe<SigninInput>;
};


export type MutationUpdateFriendRequestArgs = {
  requestId?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<FriendRequestStatus>;
};


export type MutationUpdateMessageArgs = {
  body?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['ID']>;
};

export type PrivateThread = {
  __typename?: 'PrivateThread';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getFriendRequests?: Maybe<Array<Maybe<FriendRequestResult>>>;
  getFriends?: Maybe<Array<Maybe<User>>>;
  getMessages?: Maybe<Array<Maybe<Message>>>;
  getThread?: Maybe<PrivateThread>;
  getThreads?: Maybe<Array<Maybe<PrivateThread>>>;
  getUser?: Maybe<User>;
  search?: Maybe<Array<Maybe<Result>>>;
  searchFriends?: Maybe<SearchFriendsResult>;
};


export type QueryGetFriendRequestsArgs = {
  type?: InputMaybe<FriendRequestOptions>;
};


export type QueryGetMessagesArgs = {
  threadId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetThreadArgs = {
  threadId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetThreadsArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QuerySearchArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QuerySearchFriendsArgs = {
  query?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<FriendRequestOptions>;
};

export type ReceivedFriendRequest = {
  __typename?: 'ReceivedFriendRequest';
  _id?: Maybe<Scalars['ID']>;
  recipient?: Maybe<Scalars['ID']>;
  requester?: Maybe<User>;
  status?: Maybe<FriendRequestStatus>;
};

export type Result = MessageResult | PrivateThread;

export type SearchFriendsResult = {
  __typename?: 'SearchFriendsResult';
  friends?: Maybe<Array<Maybe<User>>>;
  received?: Maybe<Array<Maybe<FriendRequestUser>>>;
  sent?: Maybe<Array<Maybe<FriendRequestUser>>>;
};

export type SeedReturnValue = {
  __typename?: 'SeedReturnValue';
  threadIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  user?: Maybe<TestUser>;
  users?: Maybe<Array<Maybe<TestUser>>>;
};

export type SentFriendRequest = {
  __typename?: 'SentFriendRequest';
  _id?: Maybe<Scalars['ID']>;
  recipient?: Maybe<User>;
  requester?: Maybe<Scalars['ID']>;
  status?: Maybe<FriendRequestStatus>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAnyMessageCreated?: Maybe<Message>;
  onFriendRequestSaved?: Maybe<Array<Maybe<FriendRequestResult>>>;
  onThreadCreated?: Maybe<Array<Maybe<PrivateThread>>>;
  onThreadMessageCreated?: Maybe<Array<Maybe<Message>>>;
};


export type SubscriptionOnThreadMessageCreatedArgs = {
  threadId?: InputMaybe<Scalars['ID']>;
};

export type TestUser = {
  __typename?: 'TestUser';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  userImage?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  FriendRequestOptions: ResolverTypeWrapper<FriendRequestOptionsModel>;
  FriendRequestResult: ResolversTypes['ReceivedFriendRequest'] | ResolversTypes['SentFriendRequest'];
  FriendRequestStatus: ResolverTypeWrapper<FriendRequestStatusModel>;
  FriendRequestUser: ResolverTypeWrapper<FriendRequestUser>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JoinInput: JoinInput;
  Message: ResolverTypeWrapper<MessageModel>;
  MessageResult: ResolverTypeWrapper<Omit<MessageResult, 'sender' | 'threadId'> & { sender?: Maybe<ResolversTypes['User']>, threadId?: Maybe<ResolversTypes['PrivateThread']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  PrivateThread: ResolverTypeWrapper<Omit<PrivateThread, 'users'> & { users?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  Query: ResolverTypeWrapper<{}>;
  ReceivedFriendRequest: ResolverTypeWrapper<Omit<ReceivedFriendRequest, 'requester' | 'status'> & { requester?: Maybe<ResolversTypes['User']>, status?: Maybe<ResolversTypes['FriendRequestStatus']> }>;
  Result: ResolversTypes['MessageResult'] | ResolversTypes['PrivateThread'];
  SearchFriendsResult: ResolverTypeWrapper<Omit<SearchFriendsResult, 'friends'> & { friends?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  SeedReturnValue: ResolverTypeWrapper<SeedReturnValue>;
  SentFriendRequest: ResolverTypeWrapper<Omit<SentFriendRequest, 'recipient' | 'status'> & { recipient?: Maybe<ResolversTypes['User']>, status?: Maybe<ResolversTypes['FriendRequestStatus']> }>;
  SigninInput: SigninInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TestUser: ResolverTypeWrapper<TestUser>;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  FriendRequestResult: ResolversParentTypes['ReceivedFriendRequest'] | ResolversParentTypes['SentFriendRequest'];
  FriendRequestUser: FriendRequestUser;
  ID: Scalars['ID'];
  JoinInput: JoinInput;
  Message: MessageModel;
  MessageResult: Omit<MessageResult, 'sender' | 'threadId'> & { sender?: Maybe<ResolversParentTypes['User']>, threadId?: Maybe<ResolversParentTypes['PrivateThread']> };
  Mutation: {};
  PrivateThread: Omit<PrivateThread, 'users'> & { users?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  Query: {};
  ReceivedFriendRequest: Omit<ReceivedFriendRequest, 'requester'> & { requester?: Maybe<ResolversParentTypes['User']> };
  Result: ResolversParentTypes['MessageResult'] | ResolversParentTypes['PrivateThread'];
  SearchFriendsResult: Omit<SearchFriendsResult, 'friends'> & { friends?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  SeedReturnValue: SeedReturnValue;
  SentFriendRequest: Omit<SentFriendRequest, 'recipient'> & { recipient?: Maybe<ResolversParentTypes['User']> };
  SigninInput: SigninInput;
  String: Scalars['String'];
  Subscription: {};
  TestUser: TestUser;
  User: UserModel;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FriendRequestOptionsResolvers = EnumResolverSignature<{ BOTH?: any, RECV?: any, SENT?: any }, ResolversTypes['FriendRequestOptions']>;

export type FriendRequestResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FriendRequestResult'] = ResolversParentTypes['FriendRequestResult']> = {
  __resolveType: TypeResolveFn<'ReceivedFriendRequest' | 'SentFriendRequest', ParentType, ContextType>;
};

export type FriendRequestStatusResolvers = EnumResolverSignature<{ ACCEPTED?: any, PENDING?: any, REJECTED?: any }, ResolversTypes['FriendRequestStatus']>;

export type FriendRequestUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FriendRequestUser'] = ResolversParentTypes['FriendRequestUser']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MessageResult'] = ResolversParentTypes['MessageResult']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  cancelFriendRequest?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationCancelFriendRequestArgs>>;
  createFriendRequest?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationCreateFriendRequestArgs>>;
  createMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, Partial<MutationCreateMessageArgs>>;
  createThread?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType, Partial<MutationCreateThreadArgs>>;
  deleteThread?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteThreadArgs>>;
  join?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationJoinArgs>>;
  purge?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  removeFriend?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationRemoveFriendArgs>>;
  seed?: Resolver<Maybe<ResolversTypes['SeedReturnValue']>, ParentType, ContextType>;
  signin?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationSigninArgs>>;
  signout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updateFriendRequest?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationUpdateFriendRequestArgs>>;
  updateMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, Partial<MutationUpdateMessageArgs>>;
};

export type PrivateThreadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PrivateThread'] = ResolversParentTypes['PrivateThread']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getFriendRequests?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequestResult']>>>, ParentType, ContextType, Partial<QueryGetFriendRequestsArgs>>;
  getFriends?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, Partial<QueryGetMessagesArgs>>;
  getThread?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType, Partial<QueryGetThreadArgs>>;
  getThreads?: Resolver<Maybe<Array<Maybe<ResolversTypes['PrivateThread']>>>, ParentType, ContextType, Partial<QueryGetThreadsArgs>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  search?: Resolver<Maybe<Array<Maybe<ResolversTypes['Result']>>>, ParentType, ContextType, Partial<QuerySearchArgs>>;
  searchFriends?: Resolver<Maybe<ResolversTypes['SearchFriendsResult']>, ParentType, ContextType, Partial<QuerySearchFriendsArgs>>;
};

export type ReceivedFriendRequestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReceivedFriendRequest'] = ResolversParentTypes['ReceivedFriendRequest']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  requester?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FriendRequestStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  __resolveType: TypeResolveFn<'MessageResult' | 'PrivateThread', ParentType, ContextType>;
};

export type SearchFriendsResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchFriendsResult'] = ResolversParentTypes['SearchFriendsResult']> = {
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  received?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequestUser']>>>, ParentType, ContextType>;
  sent?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequestUser']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedReturnValueResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SeedReturnValue'] = ResolversParentTypes['SeedReturnValue']> = {
  threadIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['TestUser']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestUser']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentFriendRequestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SentFriendRequest'] = ResolversParentTypes['SentFriendRequest']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requester?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FriendRequestStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onAnyMessageCreated?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "onAnyMessageCreated", ParentType, ContextType>;
  onFriendRequestSaved?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['FriendRequestResult']>>>, "onFriendRequestSaved", ParentType, ContextType>;
  onThreadCreated?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['PrivateThread']>>>, "onThreadCreated", ParentType, ContextType>;
  onThreadMessageCreated?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, "onThreadMessageCreated", ParentType, ContextType, Partial<SubscriptionOnThreadMessageCreatedArgs>>;
};

export type TestUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestUser'] = ResolversParentTypes['TestUser']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  FriendRequestOptions?: FriendRequestOptionsResolvers;
  FriendRequestResult?: FriendRequestResultResolvers<ContextType>;
  FriendRequestStatus?: FriendRequestStatusResolvers;
  FriendRequestUser?: FriendRequestUserResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageResult?: MessageResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PrivateThread?: PrivateThreadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReceivedFriendRequest?: ReceivedFriendRequestResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  SearchFriendsResult?: SearchFriendsResultResolvers<ContextType>;
  SeedReturnValue?: SeedReturnValueResolvers<ContextType>;
  SentFriendRequest?: SentFriendRequestResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TestUser?: TestUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};



      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "FriendRequestResult": [
      "ReceivedFriendRequest",
      "SentFriendRequest"
    ],
    "Result": [
      "MessageResult",
      "PrivateThread"
    ]
  }
};
      export default result;
    