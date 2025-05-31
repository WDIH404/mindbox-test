import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoItemProps } from './TodoItem.types';

export const TodoItem = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoItemProps) => {
  return (
    <ListItem
      key={todo.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDeleteTodo}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox checked={todo.completed} onChange={onToggleTodo} size="small" />
      <Typography
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'inherit',
        }}
      >
        {todo.text}
      </Typography>
    </ListItem>
  );
};
