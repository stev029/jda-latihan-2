
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  template?: ((data: any) => React.ReactNode) | React.ReactNode;
  writeOnly?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchPlaceholder?: string;
  addButton?: boolean;
  addButtonLabel?: string;
  footer?: React.ReactNode;
  onAdd?: (formData: FormData) => Promise<boolean> | boolean;
  onEdit?: (formData: FormData, id: number | undefined) => Promise<boolean> | boolean;
  onDelete?: (item: T) => Promise<boolean> | boolean;
  action?: (formData: FormData) => Promise<void> | void;
};