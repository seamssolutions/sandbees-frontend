import React, { useEffect } from 'react';
import './Dashboard.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';

// Define interface for Dashboard component props
interface DashboardProps {
  onMount?: () => void;
}

// Sample data for dashboard
const kpiData = [
  { title: 'Revenue', value: '$24,500', change: '+15%', progress: 75 },
  { title: 'Expenses', value: '$12,800', change: '-8%', progress: 45 },
  { title: 'Customers', value: '156', change: '+12%', progress: 65 },
  { title: 'Tasks', value: '24', change: '+5', progress: 80 }
];

const financialData = {
  income: '$24,500',
  expenses: '$12,800',
  profit: '$11,700',
  pendingInvoices: '$8,200'
};

const taskData = [
  { id: 1, title: 'Complete Q1 Financial Report', status: 'in_progress', dueDate: 'Apr 10, 2025' },
  { id: 2, title: 'Client Meeting - TechCorp', status: 'todo', dueDate: 'Apr 12, 2025' },
  { id: 3, title: 'Update Marketing Materials', status: 'completed', dueDate: 'Apr 5, 2025' }
];

const contactData = [
  { id: 1, name: 'John Smith', company: 'ABC Corp', status: 'client', lastContact: 'Apr 5, 2025' },
  { id: 2, name: 'Sarah Johnson', company: 'TechCorp', status: 'lead', lastContact: 'Apr 3, 2025' },
  { id: 3, name: 'Michael Brown', company: 'Global Solutions', status: 'partner', lastContact: 'Apr 1, 2025' }
];

const Dashboard: React.FC<DashboardProps> = ({ onMount }) => {
  // Call onMount callback when component mounts
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-actions">
          <GlassButton variant="primary" size="md">
            New Task
          </GlassButton>
          <GlassButton variant="default" size="md">
            Export Data
          </GlassButton>
        </div>
      </div>
      <div className="dashboard-kpi-grid">
        {kpiData.map((kpi, index) => (
          <GlassCard key={index} title={kpi.title} className="dashboard-kpi-card">
            <div className="dashboard-kpi-value">{kpi.value}</div>
            <div className="dashboard-kpi-change">{kpi.change}</div>
            <div className="dashboard-kpi-progress-bar">
              <div 
                className="dashboard-kpi-progress-fill" 
                style={{ width: `${kpi.progress}%` }}
              ></div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="dashboard-main-grid">
        <GlassCard title="Recent Tasks" className="dashboard-tasks-card">
          <div className="dashboard-tasks-list">
            {taskData.map(task => (
              <div key={task.id} className="dashboard-task-item">
                <div className="dashboard-task-info">
                  <h3 className="dashboard-task-title">{task.title}</h3>
                  <p className="dashboard-task-due">Due {task.dueDate}</p>
                </div>
                <span className={`dashboard-task-status dashboard-task-status-${task.status}`}>
                  {task.status === 'in_progress' ? 'In Progress' : 
                   task.status === 'todo' ? 'To Do' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
          <GlassButton fullWidth className="dashboard-view-all-button">
            View All Tasks
          </GlassButton>
        </GlassCard>
        <GlassCard title="Financial Summary" className="dashboard-finance-card">
          <div className="dashboard-finance-summary">
            <div className="dashboard-finance-item">
              <span className="dashboard-finance-label">Income</span>
              <span className="dashboard-finance-value">{financialData.income}</span>
            </div>
            <div className="dashboard-finance-item">
              <span className="dashboard-finance-label">Expenses</span>
              <span className="dashboard-finance-value">{financialData.expenses}</span>
            </div>
            <div className="dashboard-finance-item dashboard-finance-profit">
              <span className="dashboard-finance-label">Profit</span>
              <span className="dashboard-finance-value">{financialData.profit}</span>
            </div>
            <div className="dashboard-finance-divider"></div>
            <div className="dashboard-finance-item dashboard-finance-pending">
              <span className="dashboard-finance-label">Pending Invoices</span>
              <span className="dashboard-finance-value">{financialData.pendingInvoices}</span>
            </div>
          </div>
          <GlassButton fullWidth className="dashboard-view-all-button">
            View Financial Details
          </GlassButton>
        </GlassCard>
        <GlassCard title="Recent Contacts" className="dashboard-contacts-card">
          <div className="dashboard-contacts-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Last Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contactData.map(contact => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.company}</td>
                    <td>
                      <span className={`dashboard-contact-status dashboard-contact-status-${contact.status}`}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </td>
                    <td>{contact.lastContact}</td>
                    <td>
                      <GlassButton variant="primary" size="sm">View</GlassButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <GlassButton fullWidth className="dashboard-view-all-button">
            View All Contacts
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
