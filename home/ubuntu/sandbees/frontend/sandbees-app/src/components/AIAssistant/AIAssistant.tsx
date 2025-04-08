import React, { useState } from 'react';
import './AIAssistant.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Mock AI agent data
const aiAgents = [
  {
    id: 'executive',
    name: 'Executive Meta-Agent',
    description: 'Coordinates all other agents and manages high-level decision making',
    status: 'active',
    capabilities: [
      'Task orchestration',
      'Decision making',
      'Resource allocation',
      'Priority management'
    ],
    model: 'gpt-4o'
  },
  {
    id: 'development',
    name: 'Development Agent',
    description: 'Handles software development tasks and technical implementations',
    status: 'active',
    capabilities: [
      'Code generation',
      'Code review',
      'Debugging',
      'Technical documentation'
    ],
    model: 'gpt-4o'
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    description: 'Manages marketing campaigns, content creation, and market analysis',
    status: 'active',
    capabilities: [
      'Content creation',
      'Campaign planning',
      'Market research',
      'Social media management'
    ],
    model: 'gpt-4o'
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    description: 'Handles financial analysis, reporting, and forecasting',
    status: 'active',
    capabilities: [
      'Financial analysis',
      'Budget planning',
      'Expense tracking',
      'Revenue forecasting'
    ],
    model: 'gpt-4o'
  },
  {
    id: 'customer',
    name: 'Customer Relations Agent',
    description: 'Manages customer interactions, support, and relationship building',
    status: 'active',
    capabilities: [
      'Customer support',
      'Relationship management',
      'Feedback analysis',
      'Communication'
    ],
    model: 'gpt-4o'
  }
];

// Mock conversation history
const initialConversation = [
  {
    id: 1,
    agent: 'executive',
    message: 'Good morning! How can I assist you today?',
    timestamp: '2025-04-07T09:00:00Z',
    type: 'agent'
  },
  {
    id: 2,
    message: 'I need help analyzing our Q1 financial performance.',
    timestamp: '2025-04-07T09:01:15Z',
    type: 'user'
  },
  {
    id: 3,
    agent: 'executive',
    message: 'I\'ll help you with that. Let me coordinate with the Finance Agent to analyze your Q1 financial data.',
    timestamp: '2025-04-07T09:01:30Z',
    type: 'agent'
  },
  {
    id: 4,
    agent: 'finance',
    message: 'I\'ve analyzed your Q1 financial data. Revenue is up 15% compared to last quarter, with a 12% increase in profit margin. Your top performing product line is showing 22% growth. Would you like me to prepare a detailed report?',
    timestamp: '2025-04-07T09:02:45Z',
    type: 'agent'
  }
];

// Mock tasks
const initialTasks = [
  {
    id: 1,
    title: 'Analyze Q1 financial performance',
    description: 'Review revenue, expenses, and profit margins for Q1 2025',
    status: 'in_progress',
    assignedAgent: 'finance',
    priority: 'high',
    createdAt: '2025-04-07T09:01:30Z',
    estimatedCompletion: '2025-04-07T10:00:00Z'
  },
  {
    id: 2,
    title: 'Draft social media content calendar',
    description: 'Create content plan for next month\'s social media posts',
    status: 'pending',
    assignedAgent: 'marketing',
    priority: 'medium',
    createdAt: '2025-04-06T14:30:00Z',
    estimatedCompletion: '2025-04-08T16:00:00Z'
  },
  {
    id: 3,
    title: 'Optimize website performance',
    description: 'Identify and fix performance bottlenecks on the company website',
    status: 'pending',
    assignedAgent: 'development',
    priority: 'medium',
    createdAt: '2025-04-05T11:15:00Z',
    estimatedCompletion: '2025-04-09T17:00:00Z'
  }
];

const AIAssistant: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('executive');
  const [conversation, setConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState('');
  const [tasks, setTasks] = useState(initialTasks);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedAgent: 'executive',
    priority: 'medium'
  });

  // Get the selected agent details
  const currentAgent = aiAgents.find(agent => agent.id === selectedAgent) || aiAgents[0];

  // Filter conversation to show only messages from selected agent and user
  const filteredConversation = conversation.filter(
    msg => msg.type === 'user' || msg.agent === selectedAgent
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message to conversation
      const userMessage = {
        id: conversation.length + 1,
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: 'user' as const
      };
      
      setConversation([...conversation, userMessage]);
      setNewMessage('');
      
      // Simulate agent response (in a real app, this would call the AI agent API)
      setTimeout(() => {
        const agentResponse = {
          id: conversation.length + 2,
          agent: selectedAgent,
          message: `I'm processing your request: "${newMessage}"`,
          timestamp: new Date().toISOString(),
          type: 'agent' as const
        };
        
        setConversation(prev => [...prev, agentResponse]);
      }, 1000);
    }
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
    if (newTask.title && newTask.description) {
      const now = new Date();
      const estimatedCompletion = new Date();
      estimatedCompletion.setHours(estimatedCompletion.getHours() + 24); // Set completion 24 hours later
      
      const newTaskItem = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        status: 'pending' as const,
        assignedAgent: newTask.assignedAgent,
        priority: newTask.priority as 'high' | 'medium' | 'low',
        createdAt: now.toISOString(),
        estimatedCompletion: estimatedCompletion.toISOString()
      };
      
      setTasks([...tasks, newTaskItem]);
      setNewTask({
        title: '',
        description: '',
        assignedAgent: 'executive',
        priority: 'medium'
      });
      setShowNewTaskForm(false);
      
      // Add a system message to the conversation
      const systemMessage = {
        id: conversation.length + 1,
        agent: 'executive',
        message: `New task created: "${newTask.title}". I've assigned it to the ${aiAgents.find(a => a.id === newTask.assignedAgent)?.name}.`,
        timestamp: now.toISOString(),
        type: 'agent' as const
      };
      
      setConversation([...conversation, systemMessage]);
    }
  };

  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <h1 className="ai-assistant-title">AI Assistant</h1>
        <div className="ai-assistant-actions">
          <GlassButton 
            variant="primary" 
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          >
            {showNewTaskForm ? 'Cancel' : 'New Task'}
          </GlassButton>
        </div>
      </div>

      <div className="ai-assistant-layout">
        <div className="ai-agents-sidebar">
          <GlassCard title="AI Agents" className="ai-agents-card">
            <div className="ai-agents-list">
              {aiAgents.map(agent => (
                <div 
                  key={agent.id}
                  className={`ai-agent-item ${selectedAgent === agent.id ? 'active' : ''}`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="ai-agent-icon">
                    {agent.name.charAt(0)}
                  </div>
                  <div className="ai-agent-info">
                    <div className="ai-agent-name">{agent.name}</div>
                    <div className="ai-agent-status">
                      <span className={`status-indicator status-${agent.status}`}></span>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard title="Active Tasks" className="active-tasks-card">
            <div className="active-tasks-list">
              {tasks.map(task => (
                <div key={task.id} className="active-task-item">
                  <div className="active-task-header">
                    <div className="active-task-title">{task.title}</div>
                    <div className={`active-task-priority priority-${task.priority}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </div>
                  </div>
                  <div className="active-task-agent">
                    Assigned to: {aiAgents.find(a => a.id === task.assignedAgent)?.name}
                  </div>
                  <div className="active-task-status">
                    Status: <span className={`task-status-${task.status}`}>
                      {task.status === 'in_progress' ? 'In Progress' : 
                       task.status === 'pending' ? 'Pending' : 'Completed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
        
        <div className="ai-conversation-container">
          {showNewTaskForm ? (
            <GlassCard title="Create New Task" className="new-task-form">
              <div className="new-task-form-content">
                <GlassInput
                  label="Task Title"
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
                  required
                  placeholder="Enter task description"
                />
                
                <div className="new-task-form-row">
                  <label className="new-task-form-label">Assign To</label>
                  <div className="new-task-form-radio-group">
                    {aiAgents.map(agent => (
                      <label key={agent.id} className="new-task-form-radio">
                        <input
                          type="radio"
                          name="assignedAgent"
                          value={agent.id}
                          checked={newTask.assignedAgent === agent.id}
                          onChange={handleNewTaskChange}
                        />
                        {agent.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="new-task-form-row">
                  <label className="new-task-form-label">Priority</label>
                  <div className="new-task-form-radio-group">
                    <label className="new-task-form-radio">
                      <input
                        type="radio"
                        name="priority"
                        value="high"
                        checked={newTask.priority === 'high'}
                        onChange={handleNewTaskChange}
                      />
                      High
                    </label>
                    <label className="new-task-form-radio">
                      <input
                        type="radio"
                        name="priority"
                        value="medium"
                        checked={newTask.priority === 'medium'}
                        onChange={handleNewTaskChange}
                      />
                      Medium
                    </label>
                    <label className="new-task-form-radio">
                      <input
                        type="radio"
                        name="priority"
                        value="low"
                        checked={newTask.priority === 'low'}
                        onChange={handleNewTaskChange}
                      />
                      Low
                    </label>
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
              </div>
            </GlassCard>
          ) : (
            <GlassCard 
              title={currentAgent.name} 
              className="conversation-card"
            >
              <div className="agent-details">
                <div className="agent-description">{currentAgent.description}</div>
                <div className="agent-capabilities">
                  <div className="agent-capabilities-title">Capabilities:</div>
                  <div className="agent-capabilities-list">
                    {currentAgent.capabilities.map((capability, index) => (
                      <div key={index} className="agent-capability">
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="agent-model">
                  <span className="agent-model-label">Model:</span>
                  <span className="agent-model-value">{currentAgent.model}</span>
                </div>
              </div>
              
              <div className="conversation-messages">
                {filteredConversation.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.type === 'user' ? 'user-message' : 'agent-message'}`}
                  >
                    <div className="message-content">{msg.message}</div>
                    <div className="message-timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="message-input-container">
                <GlassInput
                  placeholder={`Message ${currentAgent.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <GlassButton variant="primary" onClick={handleSendMessage}>
                  Send
                </GlassButton>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
