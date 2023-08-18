export interface DatabaseQuery {
  create: (data: any) => void;
  update: (id: any, data: any) => void;
  delete: (id: any) => void;
  find: () => void;
  findById: (id: any) => void;
}
