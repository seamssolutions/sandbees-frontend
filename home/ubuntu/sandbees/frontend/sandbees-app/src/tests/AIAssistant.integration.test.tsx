import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant/AIAssistant';
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

// Mock props for components that require them
const mockProps = {
  onMount: jest.fn()
};

describe('AIAssistant Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sends message to AI agent when user submits a message', async () => {
    render(
      <BrowserRouter>
        <AIAssistant {...mockProps} />
      </BrowserRouter>
    );

    // Find the input field and send button
    const inputField = screen.getByPlaceholderText(/Message Executive Meta-Agent/i);
    const sendButton = screen.getByText('Send');

    // Type a message and click send
    fireEvent.change(inputField, { target: { value: 'Hello, I need help with a task' } });
    fireEvent.click(sendButton);

    // Wait for the response to be displayed
    await waitFor(() => {
      expect(mockService.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          agentId: 'executive',
          message: 'Hello, I need help with a task'
        })
      );
    });
  });

  test('displays agent capabilities and model information', () => {
    render(
      <BrowserRouter>
        <AIAssistant {...mockProps} />
      </BrowserRouter>
    );

    // Verify agent details are displayed
    expect(screen.getByText('Coordinates all other agents and manages high-level decision making')).toBeInTheDocument();
    expect(screen.getByText('Task orchestration')).toBeInTheDocument();
    expect(screen.getByText('Decision making')).toBeInTheDocument();
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
  });
});
