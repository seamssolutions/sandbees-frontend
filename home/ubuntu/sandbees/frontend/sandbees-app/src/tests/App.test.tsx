import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import Navigation from '../components/Navigation/Navigation';
import Dashboard from '../components/Dashboard/Dashboard';
import TaskManagement from '../components/TaskManagement/TaskManagement';
import FinancialManagement from '../components/FinancialManagement/FinancialManagement';
import CustomerManagement from '../components/CustomerManagement/CustomerManagement';
import AIAssistant from '../components/AIAssistant/AIAssistant';

// Helper function to render components with Router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// Mock props for components that require them
const mockProps = {
  onMount: jest.fn()
};

describe('App Component Tests', () => {
  // App Component Tests
  describe('App Component', () => {
    test('renders without crashing', () => {
      renderWithRouter(<App />);
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
    
    test('navigates to different sections', () => {
      renderWithRouter(<App />);
      const tasksLink = screen.getByText(/Tasks/i);
      fireEvent.click(tasksLink);
      expect(window.location.pathname).toBe('/tasks');
    });
  });

  // Navigation Component Tests
  describe('Navigation Component', () => {
    test('renders navigation links', () => {
      renderWithRouter(<Navigation activeSection="dashboard" />);
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
      expect(screen.getByText(/Finances/i)).toBeInTheDocument();
      expect(screen.getByText(/Customers/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Assistant/i)).toBeInTheDocument();
      expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    });
    
    test('highlights active section', () => {
      renderWithRouter(<Navigation activeSection="dashboard" />);
      const dashboardLink = screen.getByText(/Dashboard/i).closest('a');
      expect(dashboardLink).toHaveClass('active');
    });
    
    test('toggles navigation expansion', () => {
      renderWithRouter(<Navigation activeSection="dashboard" />);
      const toggleButton = screen.getByRole('button', { name: /Expand menu/i });
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-label', 'Collapse menu');
    });
  });

  // Dashboard Component Tests
  describe('Dashboard Component', () => {
    test('renders dashboard with KPIs', () => {
      render(<Dashboard {...mockProps} />);
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Revenue/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Tasks/i).length).toBeGreaterThan(0);
    });
    
    test('calls onMount prop when rendered', () => {
      render(<Dashboard {...mockProps} />);
      expect(mockProps.onMount).toHaveBeenCalled();
    });
  });

  // Task Management Component Tests
  describe('Task Management Component', () => {
    test('renders task management interface', () => {
      render(<TaskManagement {...mockProps} />);
      expect(screen.getByText(/Task Management/i)).toBeInTheDocument();
    });
    
    test('displays task list', () => {
      render(<TaskManagement {...mockProps} />);
      expect(screen.getAllByText(/Priority/i).length).toBeGreaterThan(0);
    });
    
    test('shows new task form when button clicked', () => {
      render(<TaskManagement {...mockProps} />);
      const newTaskButton = screen.getByText(/New Task/i);
      fireEvent.click(newTaskButton);
      expect(screen.getByText(/Create New Task/i)).toBeInTheDocument();
    });
  });

  // Financial Management Component Tests
  describe('Financial Management Component', () => {
    test('renders financial management interface', () => {
      render(<FinancialManagement {...mockProps} />);
      expect(screen.getByText(/Financial Management/i)).toBeInTheDocument();
    });
    
    test('displays financial metrics', () => {
      render(<FinancialManagement {...mockProps} />);
      expect(screen.getAllByText(/Revenue/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Expenses/i).length).toBeGreaterThan(0);
    });
    
    test('shows transaction list', () => {
      render(<FinancialManagement {...mockProps} />);
      expect(screen.getAllByText(/Transaction/i).length).toBeGreaterThan(0);
    });
  });

  // Customer Management Component Tests
  describe('Customer Management Component', () => {
    test('renders customer management interface', () => {
      render(<CustomerManagement {...mockProps} />);
      expect(screen.getByText(/Customer Management/i)).toBeInTheDocument();
    });
    
    test('displays customer metrics', () => {
      render(<CustomerManagement {...mockProps} />);
      expect(screen.getByText(/Active Customers/i)).toBeInTheDocument();
      expect(screen.getByText(/Potential Customers/i)).toBeInTheDocument();
    });
    
    test('shows customer list', () => {
      render(<CustomerManagement {...mockProps} />);
      expect(screen.getAllByText(/Company/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
    });
  });

  // AI Assistant Component Tests
  describe('AI Assistant Component', () => {
    test('renders AI assistant interface', () => {
      render(<AIAssistant {...mockProps} />);
      expect(screen.getByText(/AI Assistant/i)).toBeInTheDocument();
    });
    
    test('displays AI agents list', () => {
      render(<AIAssistant {...mockProps} />);
      expect(screen.getByText(/Executive Meta-Agent/i)).toBeInTheDocument();
      expect(screen.getByText(/Development Agent/i)).toBeInTheDocument();
      expect(screen.getByText(/Marketing Agent/i)).toBeInTheDocument();
    });
    
    test('shows conversation interface', () => {
      render(<AIAssistant {...mockProps} />);
      expect(screen.getByPlaceholderText(/Message Executive Meta-Agent/i)).toBeInTheDocument();
      expect(screen.getByText(/Send/i)).toBeInTheDocument();
    });
    
    test('displays active tasks', () => {
      render(<AIAssistant {...mockProps} />);
      expect(screen.getByText(/Active Tasks/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Assigned to/i).length).toBeGreaterThan(0);
    });
  });
});
