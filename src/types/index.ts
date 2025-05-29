import { ComboboxItem } from '@mantine/core';

export interface TodoI {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoCategories = 'all' | 'active' | 'completed';

export interface CategoryListItemI extends ComboboxItem {
  value: TodoCategories;
}
