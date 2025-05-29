import { ChangeEvent, useState } from 'react';
import {
  Container,
  Title,
  TextInput,
  Button,
  Group,
  List,
  Text,
  Card,
  Select,
  Divider,
} from '@mantine/core';

import { CategoryListItemI, TodoCategories, TodoI } from './types';

import { TodoItem } from './components';

const CATEGORIES_LIST: CategoryListItemI[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
];

const App = () => {
  const [category, setCategory] = useState<TodoCategories>(
    CATEGORIES_LIST[0].value,
  );
  const [todos, setTodos] = useState<TodoI[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [inputError, setInputError] = useState('');

  const filteredTodos = todos
    .sort((a, b) => b.id - a.id)
    .filter((todo) => {
      if (category === 'all') return true;
      if (category === 'active') return !todo.completed;
      if (category === 'completed') return todo.completed;
      return true;
    });

  const todosLeftCount = todos.filter((todo) => !todo.completed).length;
  const addTodo = () => {
    if (!newTodo.trim()) {
      return setInputError('Текст задачи не может быть пустым');
    }

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputError) {
      setInputError('');
    }

    setNewTodo(e.currentTarget.value);
  };

  const handleCategoryChange = (value: TodoCategories) => {
    setCategory(value);
  };

  return (
    <Container size="sm" py="xl">
      <Title order={1} mb="lg">
        Mindbox ToDo
      </Title>

      <Card withBorder shadow="sm" radius="md">
        <Group mb="md" align="flex-start" gap={'6px'}>
          <TextInput
            placeholder="Введите текст новой задачи"
            value={newTodo}
            onChange={handleInputChange}
            style={{ flex: 1 }}
            error={inputError}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addTodo();
              }
            }}
          />
          <Button onClick={addTodo}>Создать</Button>
        </Group>

        <Divider mb="md" />

        <Group align="center" justify="space-between" mb="xs">
          <Title order={4}>Список задач</Title>
          <Select
            data={CATEGORIES_LIST}
            value={category}
            onChange={(value) => handleCategoryChange(value as TodoCategories)}
            defaultValue={CATEGORIES_LIST[0].value}
            size="xs"
            w={'120px'}
          />
        </Group>

        {todos.length === 0 ? (
          <Text c="dimmed" ml={'auto'} mr={'auto'}>
            Список задач пуст...
          </Text>
        ) : (
          <List spacing="xs" size="sm" center>
            {filteredTodos.map((todo) => (
              <TodoItem
                todo={todo}
                onDeleteTodo={() => deleteTodo(todo.id)}
                onToggleTodo={() => toggleTodo(todo.id)}
                key={todo.id}
              />
            ))}
          </List>
        )}
      </Card>

      <Group justify="space-between" gap={'12px'}>
        {todos.length > 0 && (
          <Text c="dimmed" size="sm" mt="sm">
            Невыполненные задачи: {todosLeftCount}
          </Text>
        )}

        <Text c="dimmed" opacity={0.25} size="sm" mt="sm">
          Автор: Сергей Смирнов
        </Text>
      </Group>
    </Container>
  );
};

export default App;
