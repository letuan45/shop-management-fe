export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  image: string;
  status: number;
  importPrice: number;
  exportPrice: number;
  stock: number;
  discount: number;
  category?: ICategory;
}
