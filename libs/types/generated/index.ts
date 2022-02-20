import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

import { User as UserModel, Message as MessageModel, Context } from '../src/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
}

export interface CommunityThread {
  __typename?: 'CommunityThread';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Maybe<User>[]>;
}

export interface JoinInput {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userImage?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}

export interface Message {
  __typename?: 'Message';
  _id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  sender?: Maybe<User>;
  threadId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  createMessage?: Maybe<Message>;
  createThread?: Maybe<PrivateThread>;
  deleteThread?: Maybe<Scalars['ID']>;
  join?: Maybe<User>;
  seed?: Maybe<SeedReturnValue>;
  signin?: Maybe<User>;
  signout?: Maybe<Scalars['ID']>;
  updateMessage?: Maybe<Message>;
}


export interface MutationCreateMessageArgs {
  body?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['ID']>;
}


export interface MutationCreateThreadArgs {
  receiverId?: InputMaybe<Scalars['ID']>;
}


export interface MutationDeleteThreadArgs {
  threadId?: InputMaybe<Scalars['ID']>;
}


export interface MutationJoinArgs {
  args?: InputMaybe<JoinInput>;
}


export interface MutationSigninArgs {
  args?: InputMaybe<SigninInput>;
}


export interface MutationUpdateMessageArgs {
  body?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['ID']>;
}

export interface PrivateThread {
  __typename?: 'PrivateThread';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Maybe<User>[]>;
}

export interface Query {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getMessages?: Maybe<Maybe<Message>[]>;
  getThread?: Maybe<PrivateThread>;
  getThreads?: Maybe<Maybe<PrivateThread>[]>;
  getUser?: Maybe<User>;
}


export interface QueryGetMessagesArgs {
  threadId?: InputMaybe<Scalars['ID']>;
}


export interface QueryGetThreadArgs {
  threadId?: InputMaybe<Scalars['ID']>;
}


export interface QueryGetThreadsArgs {
  userId?: InputMaybe<Scalars['ID']>;
}


export interface QueryGetUserArgs {
  userId?: InputMaybe<Scalars['ID']>;
}

export interface SeedReturnValue {
  __typename?: 'SeedReturnValue';
  threadIds?: Maybe<Maybe<Scalars['ID']>[]>;
  user?: Maybe<User>;
}

export interface SigninInput {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}

export interface Subscription {
  __typename?: 'Subscription';
  onAnyMessageCreated?: Maybe<Maybe<Message>[]>;
  onThreadCreated?: Maybe<Maybe<PrivateThread>[]>;
  onThreadMessageCreated?: Maybe<Maybe<Message>[]>;
}


export interface SubscriptionOnThreadMessageCreatedArgs {
  threadId?: InputMaybe<Scalars['ID']>;
}

export interface User {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  userImage?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export interface ResolverWithResolve<TResult, TParent, TContext, TArgs> {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
}
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
) => Promise<TResult> | TResult;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  SubscriptionResolverObject<TResult, TParent, TContext, TArgs> | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  SubscriptionObject<TResult, TKey, TParent, TContext, TArgs> | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>);

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => Promise<boolean> | boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

/** Mapping between all available schema types and the resolvers types */
export interface ResolversTypes {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CommunityThread: ResolverTypeWrapper<Omit<CommunityThread, 'users'> & { users?: Maybe<Maybe<ResolversTypes['User']>[]> }>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JoinInput: JoinInput;
  Message: ResolverTypeWrapper<MessageModel>;
  Mutation: ResolverTypeWrapper<{}>;
  PrivateThread: ResolverTypeWrapper<Omit<PrivateThread, 'users'> & { users?: Maybe<Maybe<ResolversTypes['User']>[]> }>;
  Query: ResolverTypeWrapper<{}>;
  SeedReturnValue: ResolverTypeWrapper<Omit<SeedReturnValue, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  SigninInput: SigninInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<UserModel>;
}

/** Mapping between all available schema types and the resolvers parents */
export interface ResolversParentTypes {
  Boolean: Scalars['Boolean'];
  CommunityThread: Omit<CommunityThread, 'users'> & { users?: Maybe<Maybe<ResolversParentTypes['User']>[]> };
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  JoinInput: JoinInput;
  Message: MessageModel;
  Mutation: {};
  PrivateThread: Omit<PrivateThread, 'users'> & { users?: Maybe<Maybe<ResolversParentTypes['User']>[]> };
  Query: {};
  SeedReturnValue: Omit<SeedReturnValue, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  SigninInput: SigninInput;
  String: Scalars['String'];
  Subscription: {};
  User: UserModel;
}

export interface CommunityThreadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommunityThread'] = ResolversParentTypes['CommunityThread']> {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Maybe<ResolversTypes['User']>[]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface MessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}

export interface MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> {
  createMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, Partial<MutationCreateMessageArgs>>;
  createThread?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType, Partial<MutationCreateThreadArgs>>;
  deleteThread?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteThreadArgs>>;
  join?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationJoinArgs>>;
  seed?: Resolver<Maybe<ResolversTypes['SeedReturnValue']>, ParentType, ContextType>;
  signin?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationSigninArgs>>;
  signout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updateMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, Partial<MutationUpdateMessageArgs>>;
}

export interface PrivateThreadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PrivateThread'] = ResolversParentTypes['PrivateThread']> {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Maybe<ResolversTypes['User']>[]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}

export interface QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> {
  getCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getMessages?: Resolver<Maybe<Maybe<ResolversTypes['Message']>[]>, ParentType, ContextType, Partial<QueryGetMessagesArgs>>;
  getThread?: Resolver<Maybe<ResolversTypes['PrivateThread']>, ParentType, ContextType, Partial<QueryGetThreadArgs>>;
  getThreads?: Resolver<Maybe<Maybe<ResolversTypes['PrivateThread']>[]>, ParentType, ContextType, Partial<QueryGetThreadsArgs>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
}

export interface SeedReturnValueResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SeedReturnValue'] = ResolversParentTypes['SeedReturnValue']> {
  threadIds?: Resolver<Maybe<Maybe<ResolversTypes['ID']>[]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}

export interface SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> {
  onAnyMessageCreated?: SubscriptionResolver<Maybe<Maybe<ResolversTypes['Message']>[]>, "onAnyMessageCreated", ParentType, ContextType>;
  onThreadCreated?: SubscriptionResolver<Maybe<Maybe<ResolversTypes['PrivateThread']>[]>, "onThreadCreated", ParentType, ContextType>;
  onThreadMessageCreated?: SubscriptionResolver<Maybe<Maybe<ResolversTypes['Message']>[]>, "onThreadMessageCreated", ParentType, ContextType, Partial<SubscriptionOnThreadMessageCreatedArgs>>;
}

export interface UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}

export interface Resolvers<ContextType = Context> {
  CommunityThread?: CommunityThreadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PrivateThread?: PrivateThreadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SeedReturnValue?: SeedReturnValueResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}



      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    