import React, { useState, useEffect } from 'react';
import './TaskManagement.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Define interface for TaskManagement component props
interface TaskManagementProps {
  onMount?: () => void;
}

// Sample data for tasks
const initialTasks = [
  {
    id: 1,
    title: 'Complete Q1 Financial Report',
    description: 'Analyze Q1 financial data and prepare comprehensive report for stakeholders.',
    status: 'in_progress',
    dueDate: '2025-04-15',
    assignedTo: 'John Smith',
    project: 'Financial Reporting',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Client Meeting - TechCorp',
    description: 'Prepare presentation and meet with TechCorp executives to discuss new partnership opportunities.',
    status: 'todo',
    dueDate: '2025-04-20',
    assignedTo: 'Sarah Johnson',
    project: 'Business Development',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Update Marketing Materials',
    description: 'Refresh brochures, website content, and social media profiles with new branding guidelines.',
    status: 'completed',
    dueDate: '2025-04-05',
    assignedTo: 'Michael Brown',
    project: 'Marketing',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Develop New Feature - AI Assistant',
    description: 'Implement and test the new AI assistant feature for the dashboard.',
    status: 'in_progress',
    dueDate: '2025-04-25',
    assignedTo: 'Emily Chen',
    project: 'Product Development',
    priority: 'high'
  },
  {
    id: 5,
    title: 'Quarterly Team Review',
    description: 'Conduct performance reviews for all team members and set goals for next quarter.',
    status: 'todo',
    dueDate: '2025-04-30',
    assignedTo: 'John Smith',
    project: 'HR Management',
    priority: 'low'
  }
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const TaskManagement: React.FC<TaskManagementProps> = ({ onMount }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: new Date().toISOString().split('T')[0],
    assignedTo: '',
    project: '',
    priority: 'medium'
  });

  // Call onMount callback when component mounts
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Handle status change for a task
  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Handle input change for new task form
  const handleNewTaskInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Handle new task submission
  const handleNewTaskSubmit = () => {
    const newTaskWithId = {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id)) + 1
    };
    setTasks([...tasks, newTaskWithId]);
    setShowNewTaskForm(false);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      dueDate: new Date().toISOString().split('T')[0],
      assignedTo: '',
      project: '',
      priority: 'medium'
    });
  };

  return (
    <div className="task-management">
      <div className="task-management-header">
        <h1 className="task-management-title">Task Management</h1>
        <GlassButton 
          variant="primary" 
          onClick={() => setShowNewTaskForm(true)}
        >
          New Task
        </GlassButton>
      </div>
      
      {showNewTaskForm && (
        <GlassCard title="Create New Task" className="new-task-form-card">
          <div className="new-task-form">
            <div className="new-task-form-row">
              <div className="new-task-form-field">
                <label>Title</label>
                <GlassInput
                  name="title"
                  value={newTask.title}
                  onChange={handleNewTaskInputChange}
                  placeholder="Task title"
                  required
                />
              </div>
            </div>
            <div className="new-task-form-row">
              <div className="new-task-form-field">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleNewTaskInputChange}
                  placeholder="Task description"
                  className="glass-textarea"
                />
              </div>
            </div>
            <div className="new-task-form-row">
              <div className="new-task-form-field">
                <label>Due Date</label>
                <GlassInput
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleNewTaskInputChange}
                />
              </div>
              <div className="new-task-form-field">
                <label>Assigned To</label>
                <GlassInput
                  name="assignedTo"
                  value={newTask.assignedTo}
                  onChange={handleNewTaskInputChange}
                  placeholder="Team member name"
                />
              </div>
            </div>
            <div className="new-task-form-row">
              <div className="new-task-form-field">
                <label>Project</label>
                <GlassInput
                  name="project"
                  value={newTask.project}
                  onChange={handleNewTaskInputChange}
                  placeholder="Project name"
                />
              </div>
              <div className="new-task-form-field">
                <label>Priority</label>
                <div className="priority-options">
                  {priorityOptions.map(option => (
                    <label key={option.value} className="priority-option">
                      <input
                        type="radio"
                        name="priority"
                        value={option.value}
                        checked={newTask.priority === option.value}
                        onChange={handleNewTaskInputChange}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
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
