import React, { useState, ReactNode } from "react";

export type FormRenderProps<T> = {
  value: any;
  onChange: (value: unknown) => void;
  formState: Partial<T>;
};

export type Column<T> = {
  header: string;
  accessor: keyof T;
  disabled?: boolean;
  readOnly?: boolean;
  template?: ReactNode | ((data: any) => ReactNode);
};

export type AddItemFormProps<T extends { [key: string]: unknown }> = {
  columns: Column<T>[];
  data?: { [key: string]: unknown };
  onSubmit?: (item: T) => void;
  title?: string;
  action?: (formData: FormData, id: number | undefined) => Promise<void> | void
};

export default function Form<T extends { [key: string]: unknown }>({ children, columns, onSubmit, data, title, action }: React.PropsWithChildren<AddItemFormProps<T>>) {
  const [formState, setFormState] = useState<Partial<T>>(data as Partial<T>);

  React.useEffect(() => {
    setFormState(data as Partial<T>);
  }, [data]);

  const getNestedValue = (obj: any, path: string): any => {
    if (!path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleChange = (key: keyof T, value: unknown) => {
    const path = String(key);
    if (!path.includes('.')) {
      setFormState((prev) => ({ ...prev, [key]: value }));
      return;
    }

    setFormState((prev) => {
      const newState = JSON.parse(JSON.stringify(prev ?? {}));
      const keys = path.split('.');
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = current[keys[i]] || {};
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit?.(formState as T);
    await action?.(formData, getNestedValue(formState, 'id'));
    setFormState({} as Partial<T>); // Reset form state after submission
    console.log('Form submitted:', formState);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <form onSubmit={handleAction} className="space-y-4">
          {columns.map((col, i) => {
            if (col.readOnly) return null; // Skip read-only columns
            const value = getNestedValue(formState, String(col.accessor)) ?? "";
            const template = typeof col.template === "function" ? <col.template data={value} /> : col.template

            return (
              <div key={i}>
                <label htmlFor={String(col.accessor)} className="block text-sm font-medium mb-1">{col.header}</label>
                {template || (
                  <input
                    id={String(col.accessor)}
                    type="text"
                    name={String(col.accessor)}
                    className="border rounded px-3 py-2 w-full text-sm"
                    value={value}
                    onChange={(e) => handleChange(col.accessor, e.target.value)}
                    disabled={col.disabled}
                    required
                  />
                )
                }
              </div>
            );
          })}
          {children}
        </form>
      </div>
    </div>
  );
}