// src/components/KanbanBoard.tsx
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const KanbanBoard: React.FC = () => {
  const tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'in-progress' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'done' },
  ];

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Update task status on server
    const task = tasks.find((task) => task.id.toString() === draggableId);
    if (task) {
      try {
        await axios.put(`http://localhost:5000/tasks/${task.id}`, { status: destination.droppableId });
        console.log(`Task ${task.id} moved to ${destination.droppableId}`);
      } catch (error) {
        console.error('Failed to update task status:', error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <Column title="To Do" tasks={tasks.filter((task) => task.status === 'todo')} />
        <Column title="In Progress" tasks={tasks.filter((task) => task.status === 'in-progress')} />
        <Column title="Done" tasks={tasks.filter((task) => task.status === 'done')} />
      </div>
    </DragDropContext>
  );
};

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      <Droppable droppableId={title.toLowerCase()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task"
                  >
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanBoard;
