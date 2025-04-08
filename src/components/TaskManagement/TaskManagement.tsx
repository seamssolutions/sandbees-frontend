import React, { useState } from 'react';
import './TaskManagement.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Mock data for tasks
const initialTasks = [
  { 
    id: 1, 
    title: 'Complete quarterly report', 
    description: 'Finalize the Q1 financial report for stakeholders',
    dueDate: '2025-04-15', 
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'John Doe',
    project: 'Finance'
  },
  { 
    id: 2, 
    title: 'Review marketing campaign', 
    description: 'Analyze results of recent social media campaign',
    dueDate: '2025-04-20', 
    status: 'todo',
    priority: 'medium',
    assignedTo: 'Sarah Smith',
    project: 'Marketing'
  },
  { 
    id: 3, 
    title: 'Client meeting preparation', 
    description: 'Prepare presentation and talking points for client meeting',
    dueDate: '2025-04-10', 
    status: 'completed',
    priority: 'high',
    assignedTo: 'John Doe',
    project: 'Sales'
  },
  { 
    id: 4, 
    title: 'Update website content', 
    description: 'Refresh product descriptions and add new testimonials',
    dueDate: '2025-04-25', 
    status: 'todo',
    priority: 'low',
    assignedTo: 'Sarah Smith',
    project: 'Marketing'
  },
  { 
    id: 5, 
    title: 'Vendor contract negotiation', 
    description: 'Renegotiate terms with office supply vendor',
    dueDate: '2025-04-18', 
    status: 'todo',
    priority: 'medium',
    assignedTo: 'John Doe',
    project: 'Operations'
  }
];

// Task status options
const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

// Priority options
const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo',
    priority: 'medium',
    assignedTo: '',
    project: ''
  });

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle task status change
  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Handle new task form input changes
  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  // Handle new task submission
  const handleNewTaskSubmit = () => {
    if (newTask.title && newTask.dueDate) {
      const newTaskWithId = {
        ...newTask,
        id: tasks.length + 1
      };
      setTasks([...tasks, newTaskWithId]);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'todo',
        priority: 'medium',
        assignedTo: '',
        project: ''
      });
      setShowNewTaskForm(false);
    }
  };

  return (
    <div className="task-management">
      <div className="task-management-header">
        <h1 className="task-management-title">Task Management</h1>
        <div className="task-management-actions">
          <GlassButton 
            variant="primary" 
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          >
            {showNewTaskForm ? 'Cancel' : 'New Task'}
          </GlassButton>
        </div>
      </div>

      {showNewTaskForm && (
        <GlassCard title="Create New Task" className="new-task-form">
          <div className="new-task-form-grid">
            <GlassInput
              label="Title"
              name="title"
              value={newTask.title}
              onChange={handleNewTaskChange}
              required
              placeholder="Enter task title"
            />
            <GlassInput
              label="Description"
              name="description"
              value={newTask.description}
              onChange={handleNewTaskChange}
              placeholder="Enter task description"
            />
            <GlassInput
              label="Due Date"
              name="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={handleNewTaskChange}
              required
            />
            <GlassInput
              label="Assigned To"
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleNewTaskChange}
              placeholder="Enter assignee name"
            />
            <GlassInput
              label="Project"
              name="project"
              value={newTask.project}
              onChange={handleNewTaskChange}
              placeholder="Enter project name"
            />
            <div className="new-task-form-row">
              <label className="new-task-form-label">Priority</label>
              <div className="new-task-form-radio-group">
                {priorityOptions.map(option => (
                  <label key={option.value} className="new-task-form-radio">
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={newTask.priority === option.value}
                      onChange={handleNewTaskChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="new-task-form-actions">
            <GlassButton variant="secondary" onClick={() => setShowNewTaskForm(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={handleNewTaskSubmit}>
              Create Task
            </GlassButton>
          </div>
        </GlassCard>
      )}

      <div className="task-management-filters">
        <div className="task-filter-buttons">
          <GlassButton 
            variant={filter === 'all' ? 'primary' : 'default'} 
            onClick={() => setFilter('all')}
          >
            All
          </GlassButton>
          <GlassButton 
            variant={filter === 'todo' ? 'primary' : 'default'} 
            onClick={() => setFilter('todo')}
          >
            To Do
          </GlassButton>
          <GlassButton 
            variant={filter === 'in_progress' ? 'primary' : 'default'} 
            onClick={() => setFilter('in_progress')}
          >
            In Progress
          </GlassButton>
          <GlassButton 
            variant={filter === 'completed' ? 'primary' : 'default'} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </GlassButton>
        </div>
        <div className="task-search">
          <GlassInput
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <GlassCard title="No Tasks Found" className="no-tasks-card">
            <p className="no-tasks-message">
              {searchTerm 
                ? `No tasks matching "${searchTerm}" in ${filter === 'all' ? 'any status' : filter} status.` 
                : `No tasks in ${filter === 'all' ? 'any status' : filter} status.`}
            </p>
            <GlassButton variant="primary" onClick={() => setShowNewTaskForm(true)}>
              Create a New Task
            </GlassButton>
          </GlassCard>
        ) : (
          filteredTasks.map(task => (
            <GlassCard key={task.id} title={task.title} className="task-card">
              <div className="task-card-content">
                <div className="task-card-details">
                  <p className="task-description">{task.description}</p>
                  <div className="task-metadata">
                    <div className="task-metadata-item">
                      <span className="task-metadata-label">Due Date:</span>
                      <span className="task-metadata-value">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="task-metadata-item">
                      <span className="task-metadata-label">Assigned To:</span>
                      <span className="task-metadata-value">{task.assignedTo}</span>
                    </div>
                    <div className="task-metadata-item">
                      <span className="task-metadata-label">Project:</span>
                      <span className="task-metadata-value">{task.project}</span>
                    </div>
                    <div className="task-metadata-item">
                      <span className="task-metadata-label">Priority:</span>
                      <span className={`task-priority task-priority-${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="task-card-actions">
                  <div className="task-status-selector">
                    <span className="task-status-label">Status:</span>
                    <div className="task-status-buttons">
                      {statusOptions.map(option => (
                        <button
                          key={option.value}
                          className={`task-status-button task-status-${option.value} ${task.status === option.value ? 'active' : ''}`}
                          onClick={() => handleStatusChange(task.id, option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="task-action-buttons">
                    <GlassButton variant="secondary" size="sm">Edit</GlassButton>
                    <GlassButton variant="danger" size="sm">Delete</GlassButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
