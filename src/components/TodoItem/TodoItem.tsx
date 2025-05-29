import { List, Checkbox, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { TodoItemProps } from './TodoItem.types';

export const TodoItem = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoItemProps) => {
  return (
    <List.Item
      key={todo.id}
      icon={
        <Checkbox checked={todo.completed} onChange={onToggleTodo} size="sm" />
      }
    >
      <Group>
        <Text
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'gray' : 'inherit',
          }}
        >
          {todo.text}
        </Text>
        <ActionIcon color="red" onClick={onDeleteTodo} variant="light">
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    </List.Item>
  );
};
