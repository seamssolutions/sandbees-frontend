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

// Sample data for AI agents
const aiAgents = [
  {
    id: 1,
    name: 'Executive Meta-Agent',
    role: 'Coordination & Strategy',
    description: 'Oversees all other agents and coordinates their activities. Handles high-level business strategy and decision-making.',
    capabilities: ['Business strategy', 'Resource allocation', 'Performance monitoring', 'Inter-agent coordination'],
    active: true
  },
  {
    id: 2,
    name: 'Development Agent',
    role: 'Technical Development',
    description: 'Specializes in software development, technical problem-solving, and system architecture.',
    capabilities: ['Code generation', 'Technical documentation', 'Bug fixing', 'Architecture design'],
    active: true
  },
  {
    id: 3,
    name: 'Marketing Agent',
    role: 'Marketing & Promotion',
    description: 'Handles marketing strategy, content creation, and promotional activities.',
    capabilities: ['Content creation', 'Marketing strategy', 'Social media management', 'Analytics interpretation'],
    active: true
  },
  {
    id: 4,
    name: 'Sales Agent',
    role: 'Sales & Client Relations',
    description: 'Manages sales processes, client relationships, and lead generation.',
    capabilities: ['Lead qualification', 'Sales outreach', 'Client relationship management', 'Deal negotiation'],
    active: false
  },
  {
    id: 5,
    name: 'Finance Agent',
    role: 'Financial Management',
    description: 'Handles financial planning, accounting, and financial analysis.',
    capabilities: ['Financial reporting', 'Budget planning', 'Cash flow management', 'Financial forecasting'],
    active: false
  }
];

// Sample data for active tasks
const activeTasks = [
  {
    id: 1,
    title: 'Develop Q2 Marketing Strategy',
    description: 'Create a comprehensive marketing strategy for Q2 focusing on new product launch.',
    assignedTo: 'Marketing Agent',
    status: 'in-progress',
    progress: 65,
    dueDate: '2025-04-15'
  },
  {
    id: 2,
    title: 'Optimize Website Performance',
    description: 'Identify and fix performance bottlenecks in the company website.',
    assignedTo: 'Development Agent',
    status: 'in-progress',
    progress: 40,
    dueDate: '2025-04-20'
  },
  {
    id: 3,
    title: 'Quarterly Business Review',
    description: 'Prepare a comprehensive review of Q1 performance and Q2 projections.',
    assignedTo: 'Executive Meta-Agent',
    status: 'in-progress',
    progress: 80,
    dueDate: '2025-04-10'
  }
];

// Sample conversation history
const initialConversation = [
  {
    id: 1,
    sender: 'user',
    message: 'Can you help me prepare a marketing plan for our new product launch?',
    timestamp: '2025-04-05T09:30:00'
  },
  {
    id: 2,
    sender: 'agent',
    agent: 'Executive Meta-Agent',
    message: 'I\'ll help you with that. Let me assign the Marketing Agent to create a detailed plan. What are the key features of the new product and the target launch date?',
    timestamp: '2025-04-05T09:30:15'
  },
  {
    id: 3,
    sender: 'user',
    message: 'It\'s a new project management tool with AI capabilities. We\'re targeting a June 1st launch date.',
    timestamp: '2025-04-05T09:31:00'
  },
  {
    id: 4,
    sender: 'agent',
    agent: 'Marketing Agent',
    message: 'I\'ll create a comprehensive marketing plan for the new AI project management tool. I\'ll focus on highlighting the AI capabilities as the unique selling proposition. Can you tell me about the target audience?',
    timestamp: '2025-04-05T09:31:30'
  }
];

const AIAssistant: React.FC<AIAssistantProps> = ({ onMount }) => {
  const [activeAgent, setActiveAgent] = useState(aiAgents[0]);
  const [conversation, setConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState('');
  // We'll keep the setIsLoading function but remove the unused isLoading variable
  const [, setIsLoading] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);

  // Call onMount callback when component mounts
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      id: conversation.length + 1,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setConversation([...conversation, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: conversation.length + 2,
          sender: 'agent',
          agent: activeAgent.name,
          message: AIIntegrationService.generateResponse(newMessage, activeAgent.name),
          timestamp: new Date().toISOString()
        };
        setConversation(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsLoading(false);
    }
  };

  // Switch active agent
  const switchAgent = (agent) => {
    setActiveAgent(agent);
    setShowAgentDetails(false);
  };

  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <h1 className="ai-assistant-title">AI Assistant</h1>
      </div>
      
      <div className="ai-assistant-content">
        <div className="ai-agents-sidebar">
          <GlassCard title="AI Agents" className="ai-agents-card">
            <div className="ai-agents-list">
              {aiAgents.filter(agent => agent.active).map(agent => (
                <div 
                  key={agent.id}
                  className={`ai-agent-item ${agent.id === activeAgent.id ? 'active' : ''}`}
                  onClick={() => switchAgent(agent)}
                >
                  <div className="ai-agent-icon">
                    {agent.name.charAt(0)}
                  </div>
                  <div className="ai-agent-info">
                    <div className="ai-agent-name">{agent.name}</div>
                    <div className="ai-agent-role">{agent.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard title="Active Tasks" className="active-tasks-card">
            <div className="active-tasks-list">
              {activeTasks.map(task => (
                <div key={task.id} className="active-task-item">
                  <div className="active-task-header">
                    <div className="active-task-title">{task.title}</div>
                    <div className="active-task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                  </div>
                  <div className="active-task-progress">
                    <div className="active-task-progress-bar">
                      <div 
                        className="active-task-progress-fill"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <div className="active-task-progress-text">{task.progress}%</div>
                  </div>
                  <div className="active-task-footer">
                    <div className="active-task-assigned">Assigned to: {task.assignedTo}</div>
                    <GlassButton variant="default" size="sm">View</GlassButton>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
        
        <div className="ai-conversation-area">
          <GlassCard 
            title={`Conversation with ${activeAgent.name}`} 
            className="ai-conversation-card"
            actions={
              <GlassButton 
                variant="default" 
                size="sm" 
                onClick={() => setShowAgentDetails(!showAgentDetails)}
              >
                {showAgentDetails ? 'Hide Details' : 'Agent Details'}
              </GlassButton>
            }
          >
            {showAgentDetails && (
              <div className="ai-agent-details">
                <div className="ai-agent-description">
                  <h3>About {activeAgent.name}</h3>
                  <p>{activeAgent.description}</p>
                </div>
                <div className="ai-agent-capabilities">
                  <h3>Capabilities</h3>
                  <ul className="ai-capabilities-list">
                    {activeAgent.capabilities.map((capability, index) => (
                      <li key={index} className="ai-capability-item">{capability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="ai-conversation">
              {conversation.map(message => (
                <div 
                  key={message.id} 
                  className={`ai-message ${message.sender === 'user' ? 'user-message' : 'agent-message'}`}
                >
                  {message.sender === 'agent' && (
                    <div className="ai-message-agent">{message.agent}</div>
                  )}
                  <div className="ai-message-content">{message.message}</div>
                  <div className="ai-message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="ai-message-input">
              <GlassInput
                placeholder={`Message ${activeAgent.name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <GlassButton variant="primary" onClick={handleSendMessage}>
                Send
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
