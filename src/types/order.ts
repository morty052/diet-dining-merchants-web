export type Torder = {
  store: "Papa johns";
  status: {
    pending: boolean;
    completed: boolean;
    cancelled: boolean;
    waiting: boolean;
  };
  _id: string;
  products: [
    {
      name: string;
      price: number;
      quantity: number;
      _id: string;
      extras: string[];
      image: string;
    }
  ];
  customer: {
    name: string;
    email: string;
  };
  total: number;
  note: string;
  _createdAt: string;
};
