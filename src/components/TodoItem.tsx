import { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 p-3 transition-colors hover:bg-muted/50">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      {isEditing ? (
        <Input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-grow"
        />
      ) : (
        <label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            'flex-grow cursor-pointer transition-colors',
            todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'
          )}
        >
          {todo.text}
        </label>
      )}
      <div className="flex items-center gap-1">
        {isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;