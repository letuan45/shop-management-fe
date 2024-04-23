export interface ISupplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface ICreateSupplier {
  name: string;
  email: string;
  phone: string;
  address: string;
}
