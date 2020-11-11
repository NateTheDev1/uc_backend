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
  removeAdmin: Scalars['Boolean'];
  loginUser: LoginReturn;
  createProduct: Product;
  editProduct: Product;
  createProductGroup?: Maybe<ProductGroup>;
  deleteProduct: Scalars['Boolean'];
  editConfig: Scalars['Boolean'];
  createOrder?: Maybe<OrderReturn>;
}


interface MutationCreateUserArgs {
  user: CreateUserInput;
}


interface MutationRemoveAdminArgs {
  userId: Scalars['Int'];
}


interface MutationLoginUserArgs {
  credentials: LoginUserInput;
}


interface MutationCreateProductArgs {
  product: ProductInput;
}


interface MutationEditProductArgs {
  product: EditProductInput;
}


interface MutationCreateProductGroupArgs {
  productGroup: ProductGroupInput;
}


interface MutationDeleteProductArgs {
  productId: Scalars['Int'];
}


interface MutationEditConfigArgs {
  config: ConfigInput;
}


interface MutationCreateOrderArgs {
  order: OrderInput;
}

interface OrderReturn {
  __typename?: 'OrderReturn';
  id: Scalars['ID'];
  valid: Scalars['Boolean'];
}

interface OrderInput {
  id: Scalars['ID'];
  amount: Scalars['Int'];
  user: CustomerInput;
  shipping: ShippingInput;
  description: Scalars['String'];
  cart: Array<Maybe<CartItem>>;
}

interface CartItem {
  name: Scalars['String'];
  quantity: Scalars['Int'];
  mouse: Scalars['String'];
}

interface ShippingInput {
  zip: Scalars['String'];
  state: Scalars['String'];
  address: Scalars['String'];
}

interface CustomerInput {
  email: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['ID'];
}

interface ConfigInput {
  id: Scalars['Int'];
  value: Scalars['String'];
}

interface ProductGroupInput {
  type: Scalars['String'];
}

interface ProductInput {
  name: Scalars['String'];
  price: Scalars['Int'];
  image: Scalars['String'];
  productGroupId: Scalars['Int'];
  enabled: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}

interface EditProductInput {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['String']>;
  productGroupId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
}

interface Product {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Int'];
  image: Scalars['String'];
  productGroupId: Scalars['Int'];
  description: Scalars['String'];
  enabled: Scalars['String'];
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
  adminUsers: Array<Maybe<User>>;
  getConfig?: Maybe<Array<Maybe<Config>>>;
  allProducts?: Maybe<Array<Maybe<Product>>>;
  product?: Maybe<Product>;
}


interface QueryUserArgs {
  userId: Scalars['ID'];
}


interface QueryProductsArgs {
  productGroupId: Scalars['Int'];
}


interface QueryProductArgs {
  id: Scalars['ID'];
}

interface Config {
  __typename?: 'Config';
  id: Scalars['ID'];
  type: Scalars['String'];
  value: Scalars['String'];
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