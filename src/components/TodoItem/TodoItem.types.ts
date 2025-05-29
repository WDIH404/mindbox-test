import { TodoI } from '../../types';

export interface TodoItemProps {
  todo: TodoI;
  onToggleTodo: () => void;
  onDeleteTodo: () => void;
}
