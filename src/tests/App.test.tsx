import '@testing-library/jest-dom';
export * from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderTest, screen } from '../utils';

import { TodoList } from '../components';

describe('TodoList component', () => {
  it('should render the todo empty list', async () => {
    await renderTest(<TodoList />);
    expect(screen.getByText('Mindbox ToDo')).toBeInTheDocument();
    expect(screen.getByText('Список задач пуст...')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Введите текст новой задачи'),
    ).toBeInTheDocument();
  });

  it('should add new todo when clicking СОЗДАТЬ', async () => {
    const user = userEvent.setup();
    await renderTest(<TodoList />);

    const input = screen.getByPlaceholderText('Введите текст новой задачи');
    const button = screen.getByText('Создать');

    await user.type(input, 'Новая задача');
    await user.click(button);

    expect(screen.getByText('Новая задача')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should add new todo by ENTER', async () => {
    const user = userEvent.setup();
    await renderTest(<TodoList />);

    const input = screen.getByPlaceholderText('Введите текст новой задачи');

    await user.type(input, 'Новая задача{enter}');

    expect(screen.getByText('Новая задача')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should show error when trying to add todo with empty name', async () => {
    const user = userEvent.setup();
    await renderTest(<TodoList />);

    const button = screen.getByText('Создать');
    await user.click(button);

    expect(
      screen.getByText('Текст задачи не может быть пустым'),
    ).toBeInTheDocument();
  });

  it('should toggle todo completion status', async () => {
    const user = userEvent.setup();
    await renderTest(<TodoList />);

    const input = screen.getByPlaceholderText('Введите текст новой задачи');
    await user.type(input, 'Новая задача{enter}');

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    const todoText = screen.getByText('Новая задача');
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('should delete todo when clicking delete', async () => {
    const user = userEvent.setup();
    await renderTest(<TodoList />);

    const input = screen.getByPlaceholderText('Введите текст новой задачи');
    await user.type(input, 'Новая задача{enter}');

    const deleteButton = screen.getByLabelText('delete');
    await user.click(deleteButton);

    expect(screen.queryByText('Новая задача')).not.toBeInTheDocument();
  });
});
