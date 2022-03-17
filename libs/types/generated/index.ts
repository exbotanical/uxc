import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig
} from 'graphql';
import {
	User as UserModel,
	Message as MessageModel,
	Context
} from '../node/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Date: any;
};

export type Friend = {
	__typename?: 'Friend';
	_id?: Maybe<Scalars['ID']>;
	partnerA?: Maybe<User>;
	partnerB?: Maybe<User>;
};

export type FriendRequest = {
	__typename?: 'FriendRequest';
	_id?: Maybe<Scalars['ID']>;
	recipient?: Maybe<User>;
	requester?: Maybe<User>;
	status?: Maybe<FriendRequestStatus>;
};

export enum FriendRequestStatus {
	Accepted = 'ACCEPTED',
	Pending = 'PENDING',
	Rejected = 'REJECTED'
}

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

export type Mutation = {
	__typename?: 'Mutation';
	createFriendRequest?: Maybe<Scalars['ID']>;
	createMessage?: Maybe<Message>;
	createThread?: Maybe<PrivateThread>;
	deleteThread?: Maybe<Scalars['ID']>;
	join?: Maybe<User>;
	purge?: Maybe<Scalars['Boolean']>;
	seed?: Maybe<SeedReturnValue>;
	signin?: Maybe<User>;
	signout?: Maybe<Scalars['ID']>;
	updateFriendRequest?: Maybe<Scalars['ID']>;
	updateMessage?: Maybe<Message>;
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
	getFriendRequests?: Maybe<Array<Maybe<FriendRequest>>>;
	getMessages?: Maybe<Array<Maybe<Message>>>;
	getThread?: Maybe<PrivateThread>;
	getThreads?: Maybe<Array<Maybe<PrivateThread>>>;
	getUser?: Maybe<User>;
	search?: Maybe<Array<Maybe<Result>>>;
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

export type Result = Message | User;

export type SeedReturnValue = {
	__typename?: 'SeedReturnValue';
	threadIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	user?: Maybe<User>;
	userIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type SigninInput = {
	email?: InputMaybe<Scalars['String']>;
	password?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
	__typename?: 'Subscription';
	onAnyMessageCreated?: Maybe<Message>;
	onFriendRequestSaved?: Maybe<Array<Maybe<FriendRequest>>>;
	onThreadCreated?: Maybe<Array<Maybe<PrivateThread>>>;
	onThreadMessageCreated?: Maybe<Array<Maybe<Message>>>;
};

export type SubscriptionOnThreadMessageCreatedArgs = {
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
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
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
	Friend: ResolverTypeWrapper<
		Omit<Friend, 'partnerA' | 'partnerB'> & {
			partnerA?: Maybe<ResolversTypes['User']>;
			partnerB?: Maybe<ResolversTypes['User']>;
		}
	>;
	FriendRequest: ResolverTypeWrapper<
		Omit<FriendRequest, 'recipient' | 'requester'> & {
			recipient?: Maybe<ResolversTypes['User']>;
			requester?: Maybe<ResolversTypes['User']>;
		}
	>;
	FriendRequestStatus: FriendRequestStatus;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	JoinInput: JoinInput;
	Message: ResolverTypeWrapper<MessageModel>;
	Mutation: ResolverTypeWrapper<{}>;
	PrivateThread: ResolverTypeWrapper<
		Omit<PrivateThread, 'users'> & {
			users?: Maybe<Array<Maybe<ResolversTypes['User']>>>;
		}
	>;
	Query: ResolverTypeWrapper<{}>;
	Result: ResolversTypes['Message'] | ResolversTypes['User'];
	SeedReturnValue: ResolverTypeWrapper<
		Omit<SeedReturnValue, 'user'> & { user?: Maybe<ResolversTypes['User']> }
	>;
	SigninInput: SigninInput;
	String: ResolverTypeWrapper<Scalars['String']>;
	Subscription: ResolverTypeWrapper<{}>;
	User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean'];
	Date: Scalars['Date'];
	Friend: Omit<Friend, 'partnerA' | 'partnerB'> & {
		partnerA?: Maybe<ResolversParentTypes['User']>;
		partnerB?: Maybe<ResolversParentTypes['User']>;
	};
	FriendRequest: Omit<FriendRequest, 'recipient' | 'requester'> & {
		recipient?: Maybe<ResolversParentTypes['User']>;
		requester?: Maybe<ResolversParentTypes['User']>;
	};
	ID: Scalars['ID'];
	JoinInput: JoinInput;
	Message: MessageModel;
	Mutation: {};
	PrivateThread: Omit<PrivateThread, 'users'> & {
		users?: Maybe<Array<Maybe<ResolversParentTypes['User']>>>;
	};
	Query: {};
	Result: ResolversParentTypes['Message'] | ResolversParentTypes['User'];
	SeedReturnValue: Omit<SeedReturnValue, 'user'> & {
		user?: Maybe<ResolversParentTypes['User']>;
	};
	SigninInput: SigninInput;
	String: Scalars['String'];
	Subscription: {};
	User: UserModel;
};

export interface DateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
	name: 'Date';
}

export type FriendResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	partnerA?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	partnerB?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['FriendRequest'] = ResolversParentTypes['FriendRequest']
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	recipient?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	requester?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	status?: Resolver<
		Maybe<ResolversTypes['FriendRequestStatus']>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
	sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	threadId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	createFriendRequest?: Resolver<
		Maybe<ResolversTypes['ID']>,
		ParentType,
		ContextType,
		Partial<MutationCreateFriendRequestArgs>
	>;
	createMessage?: Resolver<
		Maybe<ResolversTypes['Message']>,
		ParentType,
		ContextType,
		Partial<MutationCreateMessageArgs>
	>;
	createThread?: Resolver<
		Maybe<ResolversTypes['PrivateThread']>,
		ParentType,
		ContextType,
		Partial<MutationCreateThreadArgs>
	>;
	deleteThread?: Resolver<
		Maybe<ResolversTypes['ID']>,
		ParentType,
		ContextType,
		Partial<MutationDeleteThreadArgs>
	>;
	join?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		Partial<MutationJoinArgs>
	>;
	purge?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	seed?: Resolver<
		Maybe<ResolversTypes['SeedReturnValue']>,
		ParentType,
		ContextType
	>;
	signin?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		Partial<MutationSigninArgs>
	>;
	signout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	updateFriendRequest?: Resolver<
		Maybe<ResolversTypes['ID']>,
		ParentType,
		ContextType,
		Partial<MutationUpdateFriendRequestArgs>
	>;
	updateMessage?: Resolver<
		Maybe<ResolversTypes['Message']>,
		ParentType,
		ContextType,
		Partial<MutationUpdateMessageArgs>
	>;
};

export type PrivateThreadResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['PrivateThread'] = ResolversParentTypes['PrivateThread']
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
	updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
	users?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['User']>>>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	getCurrentUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType
	>;
	getFriendRequests?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>,
		ParentType,
		ContextType
	>;
	getMessages?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['Message']>>>,
		ParentType,
		ContextType,
		Partial<QueryGetMessagesArgs>
	>;
	getThread?: Resolver<
		Maybe<ResolversTypes['PrivateThread']>,
		ParentType,
		ContextType,
		Partial<QueryGetThreadArgs>
	>;
	getThreads?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['PrivateThread']>>>,
		ParentType,
		ContextType,
		Partial<QueryGetThreadsArgs>
	>;
	getUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		Partial<QueryGetUserArgs>
	>;
	search?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['Result']>>>,
		ParentType,
		ContextType,
		Partial<QuerySearchArgs>
	>;
};

export type ResultResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']
> = {
	__resolveType: TypeResolveFn<'Message' | 'User', ParentType, ContextType>;
};

export type SeedReturnValueResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['SeedReturnValue'] = ResolversParentTypes['SeedReturnValue']
> = {
	threadIds?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['ID']>>>,
		ParentType,
		ContextType
	>;
	user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
	userIds?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['ID']>>>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
	onAnyMessageCreated?: SubscriptionResolver<
		Maybe<ResolversTypes['Message']>,
		'onAnyMessageCreated',
		ParentType,
		ContextType
	>;
	onFriendRequestSaved?: SubscriptionResolver<
		Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>,
		'onFriendRequestSaved',
		ParentType,
		ContextType
	>;
	onThreadCreated?: SubscriptionResolver<
		Maybe<Array<Maybe<ResolversTypes['PrivateThread']>>>,
		'onThreadCreated',
		ParentType,
		ContextType
	>;
	onThreadMessageCreated?: SubscriptionResolver<
		Maybe<Array<Maybe<ResolversTypes['Message']>>>,
		'onThreadMessageCreated',
		ParentType,
		ContextType,
		Partial<SubscriptionOnThreadMessageCreatedArgs>
	>;
};

export type UserResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	userImage?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
	Date?: GraphQLScalarType;
	Friend?: FriendResolvers<ContextType>;
	FriendRequest?: FriendRequestResolvers<ContextType>;
	Message?: MessageResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	PrivateThread?: PrivateThreadResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Result?: ResultResolvers<ContextType>;
	SeedReturnValue?: SeedReturnValueResolvers<ContextType>;
	Subscription?: SubscriptionResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};

export interface PossibleTypesResultData {
	possibleTypes: {
		[key: string]: string[];
	};
}
const result: PossibleTypesResultData = {
	possibleTypes: {
		Result: ['Message', 'User']
	}
};
export default result;
