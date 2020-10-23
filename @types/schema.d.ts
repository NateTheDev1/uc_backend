declare global { namespace Schema {
type Maybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

} } export {};