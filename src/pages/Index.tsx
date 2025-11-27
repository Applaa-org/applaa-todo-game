import { useState } from 'react';
import { Todo } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Header from '@/components/Header';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-background/80 backdrop-blur-lg border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <TodoForm onAdd={addTodo} />
              <div className="border-t pt-4">
                {filteredTodos.length > 0 ? (
                  <div className="space-y-2">
                     <AnimatePresence>
                      {filteredTodos.map((todo) => (
                         <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TodoItem
                              todo={todo}
                              onToggle={toggleTodo}
                              onDelete={deleteTodo}
                              onEdit={editTodo}
                            />
                         </motion.div>
                      ))}
                     </AnimatePresence>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    You're all caught up!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <MadeWithApplaa />
    </div>
  );
};

export default Index;