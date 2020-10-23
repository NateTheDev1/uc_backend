import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
declare global { namespace Resolvers {
type Maybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

interface Mutation {
  __typename?: 'Mutation';
  createUser: User;
  loginUser: LoginReturn;
  createProduct: Product;
  createProductGroup?: Maybe<ProductGroup>;
  deleteProduct: Scalars['Boolean'];
}


interface MutationCreateUserArgs {
  user: CreateUserInput;
}


interface MutationLoginUserArgs {
  credentials: LoginUserInput;
}


interface MutationCreateProductArgs {
  product: ProductInput;
}


interface MutationCreateProductGroupArgs {
  productGroup: ProductGroupInput;
}


interface MutationDeleteProductArgs {
  productId: Scalars['Int'];
}

interface ProductGroupInput {
  type: Scalars['String'];
}

interface ProductInput {
  name: Scalars['String'];
  price: Scalars['Int'];
  image: Scalars['String'];
  productGroupId: Scalars['Int'];
}

interface Product {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Int'];
  image: Scalars['String'];
  productGroupId: Scalars['Int'];
}

interface ProductGroup {
  __typename?: 'ProductGroup';
  id: Scalars['ID'];
  type: Scalars['String'];
  products: Array<Maybe<Product>>;
}

interface Query {
  __typename?: 'Query';
  user?: Maybe<User>;
  products?: Maybe<Array<Maybe<Product>>>;
  productGroups?: Maybe<Array<Maybe<ProductGroup>>>;
}


interface QueryUserArgs {
  userId: Scalars['ID'];
}


interface QueryProductsArgs {
  productGroupId: Scalars['Int'];
}

interface LoginReturn {
  __typename?: 'LoginReturn';
  user: User;
  token: Scalars['String'];
}

interface CreateUserInput {
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  type?: Maybe<Scalars['String']>;
}

interface LoginUserInput {
  username: Scalars['String'];
  password: Scalars['String'];
}

interface User {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  username: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['String'];
}

interface Schema {
  __typename?: 'schema';
  query?: Maybe<Query>;
  mutation?: Maybe<Mutation>;
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ProductGroupInput: ProductGroupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  ProductInput: ProductInput;
  Product: ResolverTypeWrapper<Product>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ProductGroup: ResolverTypeWrapper<ProductGroup>;
  Query: ResolverTypeWrapper<{}>;
  LoginReturn: ResolverTypeWrapper<LoginReturn>;
  CreateUserInput: CreateUserInput;
  LoginUserInput: LoginUserInput;
  User: ResolverTypeWrapper<User>;
  schema: ResolverTypeWrapper<Schema>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  ProductGroupInput: ProductGroupInput;
  String: Scalars['String'];
  ProductInput: ProductInput;
  Product: Product;
  ID: Scalars['ID'];
  ProductGroup: ProductGroup;
  Query: {};
  LoginReturn: LoginReturn;
  CreateUserInput: CreateUserInput;
  LoginUserInput: LoginUserInput;
  User: User;
  schema: Schema;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  loginUser?: Resolver<ResolversTypes['LoginReturn'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'credentials'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'product'>>;
  createProductGroup?: Resolver<Maybe<ResolversTypes['ProductGroup']>, ParentType, ContextType, RequireFields<MutationCreateProductGroupArgs, 'productGroup'>>;
  deleteProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'productId'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productGroupId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductGroup'] = ResolversParentTypes['ProductGroup']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'productGroupId'>>;
  productGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductGroup']>>>, ParentType, ContextType>;
};

export type LoginReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginReturn'] = ResolversParentTypes['LoginReturn']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['schema'] = ResolversParentTypes['schema']> = {
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  mutation?: Resolver<Maybe<ResolversTypes['Mutation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductGroup?: ProductGroupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  LoginReturn?: LoginReturnResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  schema?: SchemaResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

} } export {};