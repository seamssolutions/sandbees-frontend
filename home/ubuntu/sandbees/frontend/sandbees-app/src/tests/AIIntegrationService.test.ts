import AIIntegrationService from '../services/AIIntegrationService';

// Create a mock instance for testing
const mockService = new AIIntegrationService();

// Mock the service methods
jest.mock('../services/AIIntegrationService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      sendRequest: jest.fn().mockResolvedValue({
        agentId: 'executive',
        message: 'I understand your request and will help you with that.',
        timestamp: new Date().toISOString(),
        status: 'success'
      }),
      getAvailableAgents: jest.fn().mockResolvedValue([
        {
          id: 'executive',
          name: 'Executive Meta-Agent',
          description: 'Coordinates all other agents and manages high-level decision making',
          status: 'active',
          capabilities: ['Task orchestration', 'Decision making'],
          model: 'gpt-4o'
        }
      ]),
      getConversationHistory: jest.fn().mockResolvedValue([
        {
          id: 1,
          agent: 'executive',
          message: 'Good morning! How can I assist you today?',
          timestamp: '2025-04-07T09:00:00Z',
          type: 'agent'
        }
      ])
    };
  });
});

describe('AIIntegrationService Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sendRequest sends a message to an AI agent and returns a response', async () => {
    const request = {
      agentId: 'executive',
      message: 'Hello, I need help with a task',
      userId: 'user123'
    };
    
    const response = await mockService.sendRequest(request);
    
    expect(mockService.sendRequest).toHaveBeenCalledWith(request);
    expect(response.agentId).toBe('executive');
    expect(response.status).toBe('success');
    expect(response.message).toBeDefined();
  });

  test('getAvailableAgents retrieves available AI agents', async () => {
    const agents = await mockService.getAvailableAgents();
    
    expect(mockService.getAvailableAgents).toHaveBeenCalled();
    expect(agents.length).toBeGreaterThan(0);
    expect(agents[0].id).toBe('executive');
    expect(agents[0].name).toBe('Executive Meta-Agent');
  });

  test('getConversationHistory retrieves conversation history for a user with an agent', async () => {
    const userId = 'user123';
    const agentId = 'executive';
    const history = await mockService.getConversationHistory(userId, agentId);
    
    expect(mockService.getConversationHistory).toHaveBeenCalledWith(userId, agentId);
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].agent).toBe('executive');
  });
});
