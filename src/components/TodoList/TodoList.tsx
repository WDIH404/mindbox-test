import { ChangeEvent, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import { CategoryListItemI, TodoCategories, TodoI } from '../../types';

import { TodoItem } from '../TodoItem';

const CATEGORIES_LIST: CategoryListItemI[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export const TodoList = () => {
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

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Mindbox ToDo
      </Typography>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="flex-start" gap={1} mb={2}>
            <TextField
              placeholder="Введите текст новой задачи"
              value={newTodo}
              onChange={handleInputChange}
              error={!!inputError}
              helperText={inputError}
              fullWidth
              size="small"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addTodo();
                }
              }}
            />
            <Button variant="contained" onClick={addTodo}>
              Создать
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Список задач</Typography>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{ width: 120 }}
            >
              {CATEGORIES_LIST.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {todos.length === 0 ? (
            <Typography color="text.secondary" align="center">
              Список задач пуст...
            </Typography>
          ) : (
            <List>
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
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between" mt={2}>
        {todos.length > 0 && (
          <Typography color="text.secondary" variant="body2">
            Невыполненные задачи: {todosLeftCount}
          </Typography>
        )}
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{ opacity: 0.25, marginLeft: 'auto' }}
        >
          Автор: Сергей Смирнов
        </Typography>
      </Box>
    </Container>
  );
};
