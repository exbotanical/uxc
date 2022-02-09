import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Message as MessageModel, Context } from '../src/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CommunityThread = {
  __typename?: 'CommunityThread';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type JoinInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userImage?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createMessage?: Maybe<Message>;
  createThread?: Maybe<PrivateThread>;
  deleteThread?: Maybe<Scalars['ID']>;
  join?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['ID']>;
  seed?: Maybe<SeedReturnValue>;
  updateMessage?: Maybe<Scalars['ID']>;
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


export type MutationLoginArgs = {
  args?: InputMaybe<LoginInput>;
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
  getMessages?: Maybe<Array<Maybe<Message>>>;
  getThread?: Maybe<PrivateThread>;
  getThreads?: Maybe<Array<Maybe<PrivateThread>>>;
  getUser?: Maybe<User>;
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

export type SeedReturnValue = {
  __typename?: 'SeedReturnValue';
  threadIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onMessage?: Maybe<Array<Maybe<Message>>>;
  onThread?: Maybe<Array<Maybe<PrivateThread>>>;
};


export type SubscriptionOnMessageArgs = {
  threadId?: InputMaybe<Scalars['ID']>;
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
  CommunityThread: ResolverTypeWrapper<Omit<CommunityThread, 'users'> & { users?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JoinInput: JoinInput;
  LoginInput: LoginInput;
  Message: ResolverTypeWrapper<MessageModel>;
  Mutation: ResolverTypeWrapper<{}>;
  PrivateThread: ResolverTypeWrapper<Omit<PrivateThread, 'users'> & { users?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  Query: ResolverTypeWrapper<{}>;
  SeedReturnValue: ResolverTypeWrapper<Omit<SeedReturnValue, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CommunityThread: Omit<CommunityThread, 'users'> & { users?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  JoinInput: JoinInput;
  LoginInput: LoginInput;
  Message: MessageModel;
  Mutation: {};
  PrivateThread: Omit<PrivateThread, 'users'> & { users?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  Query: {};
  SeedReturnValue: Omit<SeedReturnValue, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  String: Scalars['String'];
  Subscription: {};
  User: UserModel;
};

export type CommunityThreadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommunityThread'] = ResolversParentTypes['CommunityThread']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, never>>;
  createThread?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType, RequireFields<MutationCreateThreadArgs, never>>;
  deleteThread?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteThreadArgs, never>>;
  join?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationJoinArgs, never>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  logout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  seed?: Resolver<Maybe<ResolversTypes['SeedReturnValue']>, ParentType, ContextType>;
  updateMessage?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationUpdateMessageArgs, never>>;
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
  getMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryGetMessagesArgs, never>>;
  getThread?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType, RequireFields<QueryGetThreadArgs, never>>;
  getThreads?: Resolver<Maybe<Array<Maybe<ResolversTypes['PrivateThread']>>>, ParentType, ContextType, RequireFields<QueryGetThreadsArgs, never>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, never>>;
};

export type SeedReturnValueResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SeedReturnValue'] = ResolversParentTypes['SeedReturnValue']> = {
  threadIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onMessage?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, "onMessage", ParentType, ContextType, RequireFields<SubscriptionOnMessageArgs, never>>;
  onThread?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['PrivateThread']>>>, "onThread", ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  CommunityThread?: CommunityThreadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PrivateThread?: PrivateThreadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SeedReturnValue?: SeedReturnValueResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};



      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    