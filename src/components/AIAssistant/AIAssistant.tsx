import React, { useState, useEffect } from 'react';
import './AIAssistant.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';
import AIIntegrationService from '../../services/AIIntegrationService';

// Define interface for AIAssistant component props
interface AIAssistantProps {
  onMount?: () => void;
}

// Initialize AI service
const aiService = new AIIntegrationService();

// Sample data for AI agents
const initialAgents = [
  {
    id: 'executive',
    name: 'Executive Meta-Agent',
    description: 'Coordinates all other agents and handles high-level decision making',
    status: 'active',
    capabilities: [
      'Task prioritization',
      'Resource allocation',
      'Decision making',
      'Agent coordination'
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
  }
];

// Sample data for AI tasks
const initialTasks = [
  {
    id: 1,
    title: 'Analyze Q1 Financial Performance',
    description: 'Review Q1 financial data and provide insights on performance trends and areas for improvement.',
    assignedAgent: 'executive',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-04-05T09:00:00Z'
  },
  {
    id: 2,
    title: 'Optimize Website Performance',
    description: 'Identify and fix performance bottlenecks in the company website to improve load times and user experience.',
    assignedAgent: 'development',
    status: 'todo',
    priority: 'medium',
    createdAt: '2025-04-06T14:30:00Z'
  },
  {
    id: 3,
    title: 'Draft Social Media Content Calendar',
    description: 'Create a content calendar for social media posts for the next month based on upcoming product launches and industry trends.',
    assignedAgent: 'marketing',
    status: 'completed',
    priority: 'medium',
    createdAt: '2025-04-02T11:15:00Z'
  }
];

// Sample data for conversation history
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
    agent: 'executive',
    message: 'I\'ve analyzed your Q1 financial data. Revenue is up 15% compared to last quarter, with a 12% increase in profit margin. Your top performing product line is showing 22% growth. Would you like me to prepare a detailed report?',
    timestamp: '2025-04-07T09:02:45Z',
    type: 'agent'
  }
];

const AIAssistant: React.FC<AIAssistantProps> = ({ onMount }) => {
  const [aiAgents, setAiAgents] = useState(initialAgents);
  const [currentAgentId, setCurrentAgentId] = useState('executive');
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
  const [isLoading, setIsLoading] = useState(false);

  // Call onMount callback when component mounts
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // Load agents from API on component mount
  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agents = await aiService.getAvailableAgents();
        if (agents && agents.length > 0) {
          setAiAgents(agents);
        }
      } catch (error) {
        console.error('Error loading AI agents:', error);
      }
    };
    
    loadAgents();
  }, []);

  // Get current agent details
  const currentAgent = aiAgents.find(agent => agent.id === currentAgentId) || aiAgents[0];

  // Filter conversation for current agent
  const filteredConversation = conversation.filter(msg => 
    msg.type === 'user' || msg.agent === currentAgentId
  );

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      id: conversation.length + 1,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'user' as const
    };
    
    setConversation([...conversation, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Send request to AI service
      const response = await aiService.sendRequest({
        agentId: currentAgentId,
        message: newMessage,
        userId: 'current-user', // In a real app, this would be the actual user ID
        context: {}
      });
      
      // Add agent response to conversation
      const agentMessage = {
        id: conversation.length + 2,
        agent: response.agentId,
        message: response.message,
        timestamp: response.timestamp,
        type: 'agent' as const
      };
      
      setConversation(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message to AI agent:', error);
      
      // Add error message to conversation
      const errorMessage = {
        id: conversation.length + 2,
        agent: currentAgentId,
        message: 'Sorry, there was an error processing your request. Please try again later.',
        timestamp: new Date().toISOString(),
        type: 'agent' as const
      };
      
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for new task form
  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Handle new task submission
  const handleNewTaskSubmit = () => {
    const newTaskWithId = {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id)) + 1,
      status: 'todo',
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTaskWithId]);
    setShowNewTaskForm(false);
    setNewTask({
      title: '',
      description: '',
      assignedAgent: 'executive',
      priority: 'medium'
    });
  };

  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <h1 className="ai-assistant-title">AI Assistant</h1>
        <GlassButton 
          variant="primary" 
          onClick={() => setShowNewTaskForm(true)}
        >
          New AI Task
        </GlassButton>
      </div>
      
      <div className="ai-assistant-content">
        <div className="ai-sidebar">
          <GlassCard title="AI Agents" className="ai-agents-card">
            <div className="ai-agents-list">
              {aiAgents.map(agent => (
                <div 
                  key={agent.id}
                  className={`ai-agent-item ${agent.id === currentAgentId ? 'active' : ''}`}
                  onClick={() => setCurrentAgentId(agent.id)}
                >
                  <div className="ai-agent-name">{agent.name}</div>
                  <div className="ai-agent-status">
                    <span className={`status-indicator status-${agent.status}`}></span>
                    {agent.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard title="Active Tasks" className="ai-tasks-card">
            <div className="ai-tasks-list">
              {tasks.length === 0 ? (
                <div className="no-tasks-message">No active AI tasks.</div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="ai-task-item">
                    <div className="ai-task-header">
                      <div className="ai-task-title">{task.title}</div>
                      <div className={`ai-task-priority priority-${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </div>
                    </div>
                    <div className="ai-task-details">
                      <div className="ai-task-assigned">
                        <span className="ai-task-label">Assigned to:</span>
                        <span className="ai-task-agent">
                          {aiAgents.find(a => a.id === task.assignedAgent)?.name || task.assignedAgent}
                        </span>
                      </div>
                      <div className="ai-task-status">
                        <span className="ai-task-label">Status:</span>
                        <span className={`ai-task-status-value status-${task.status}`}>
                          {task.status === 'in_progress' ? 'In Progress' : 
                           task.status === 'todo' ? 'To Do' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <GlassButton 
              variant="default" 
              fullWidth 
              onClick={() => setShowNewTaskForm(true)}
            >
              Create New Task
            </GlassButton>
          </GlassCard>
        </div>
        
        <div className="ai-main-content">
          {showNewTaskForm ? (
            <GlassCard title="Create New AI Task" className="new-task-card">
              <div className="new-task-form">
                <label className="new-task-form-label">Title</label>
                <GlassInput
                  name="title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  placeholder="Enter task title"
                  required
                />
                
                <label className="new-task-form-label">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  className="glass-textarea"
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
