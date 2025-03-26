export interface ITabOptions {
  text: string;
  key?: string;
  disabled?: boolean;
  hidden?: boolean;
  children?: Array<ITabOptions>;
}
export type TTabITabOptionsEx<T> = Array<ITabOptions & { key: T }>;

export enum CATALOG_SORT_TYPE {
  PRICE = "price",
  NEW = "updatedAt",
  POPULAR = "viewsCount",
}

export type statusFetching =
  | "init"
  | "fetching"
  | "success"
  | "error"
  | "first_fetching";

export interface ICatalogEntity {
  id: string;
  title: string;
  price: number;
  color: string;
  images: string[];
  tags: string[];
  viewsCount: number;
  size: any;
  text: string;
  quantity: number;
}

export interface IOrderEntity {
  createdAt: string;
  id: string;
  address: string;
  order: string;
  carts: Array<ICatalogEntity>;
  city: string;
  email: string;
  name: string;
  phone: string;
  secondName: string;
}

export enum ModalTypes {
  LOGIN_REGISTER = "LOGIN_REGISTER",
  BUY_PRODUCTS = "BUY_PRODUCTS",
  ADD_PRODUCTS = "ADD_PRODUCTS",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  EDIT_PRODUCT = "EDIT_PRODUCT",
}

export interface IChangeEnabledModalProps {
  enabledValue: Boolean;
  id: string;
}

export enum CURRENCY_TYPE {
  UA = "₴",
  EUR = "EUR",
  USD = "USD",
}

export interface IClothes {
  title: string;
  size: string;
  text: string;
  price: number;
  color: string;
  tags: Array<string>;
  images: Array<string>;
}

interface IFilters {
  [name: string]: string;
}
export type TSorter = "none" | "asc" | "desc";

interface ISorters {
  [name: string]: TSorter;
}

interface IPagination {
  currentPage?: number;
  totalPages?: number;
  totalElements?: number;
  pageSize?: number;
}

export interface NormalizedError {
  code?: number | string;
  status?: number;
  message: string;
}

export interface IStore<T> {
  data: T[];
  common?: any;
  fetchStatus: statusFetching;
  paginationData?: IPagination;
  sorters: ISorters;
  sorter: TSorter;
  //filters: IFilters;
  filters: string;
  fetchError: NormalizedError;
  activeTab?: string;
  type?: string;
}
