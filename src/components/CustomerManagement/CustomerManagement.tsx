import React, { useState, useEffect } from 'react';
import './CustomerManagement.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Define interface for CustomerManagement component props
interface CustomerManagementProps {
  onMount?: () => void;
}

// Sample data for customer metrics
const customerMetrics = {
  totalCustomers: 156,
  activeCustomers: 87,
  potentialCustomers: 42,
  churnRate: 3.2,
  customerLifetimeValue: 12500,
  acquisitionCost: 450
};

// Sample data for customers
const initialCustomers = [
  {
    id: 1,
    name: 'John Smith',
    company: 'ABC Corp',
    email: 'john.smith@abccorp.com',
    phone: '(555) 123-4567',
    status: 'client',
    value: 15000,
    lastContact: '2025-04-01',
    notes: 'Long-term client with multiple ongoing projects. Interested in expanding services to include AI integration.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'TechCorp',
    email: 'sarah.j@techcorp.com',
    phone: '(555) 234-5678',
    status: 'lead',
    value: 0,
    lastContact: '2025-04-03',
    notes: 'Initial meeting went well. Needs proposal for website redesign and marketing services by April 15.'
  },
  {
    id: 3,
    name: 'Michael Brown',
    company: 'Global Solutions',
    email: 'm.brown@globalsolutions.com',
    phone: '(555) 345-6789',
    status: 'partner',
    value: 45000,
    lastContact: '2025-04-05',
    notes: 'Strategic partnership for co-marketing and service referrals. Quarterly review scheduled for April 30.'
  },
  {
    id: 4,
    name: 'Emily Chen',
    company: 'Innovate Inc',
    email: 'emily@innovateinc.com',
    phone: '(555) 456-7890',
    status: 'client',
    value: 8500,
    lastContact: '2025-04-02',
    notes: 'Current project on track for May delivery. Discussing potential phase 2 expansion.'
  },
  {
    id: 5,
    name: 'David Wilson',
    company: 'Startup Hub',
    email: 'david@startuphub.co',
    phone: '(555) 567-8901',
    status: 'lead',
    value: 0,
    lastContact: '2025-04-04',
    notes: 'Startup founder looking for comprehensive business management solution. Budget constraints but high growth potential.'
  }
];

const CustomerManagement: React.FC<CustomerManagementProps> = ({ onMount }) => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'lead',
    value: '',
    notes: ''
  });

  // Call onMount callback when component mounts
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // Filter customers based on status and search term
  const filteredCustomers = customers.filter(customer => {
    const matchesFilter = filter === 'all' || customer.status === filter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Toggle customer details view
  const toggleCustomerDetails = (customerId: number) => {
    if (selectedCustomer === customerId) {
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(customerId);
    }
  };

  // Handle input change for new customer form
  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  // Handle new customer submission
  const handleNewCustomerSubmit = () => {
    const newCustomerWithId = {
      ...newCustomer,
      id: Math.max(...customers.map(c => c.id)) + 1,
      value: newCustomer.value ? parseFloat(newCustomer.value) : 0,
      lastContact: new Date().toISOString().split('T')[0]
    };
    setCustomers([...customers, newCustomerWithId]);
    setShowNewCustomerForm(false);
    setNewCustomer({
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'lead',
      value: '',
      notes: ''
    });
  };

  return (
    <div className="customer-management">
      <div className="customer-management-header">
        <h1 className="customer-management-title">Customer Management</h1>
        <GlassButton 
          variant="primary" 
          onClick={() => setShowNewCustomerForm(true)}
        >
          Add Customer
        </GlassButton>
      </div>
      
      <div className="customer-metrics-grid">
        <GlassCard title="Active Customers" className="customer-metric-card">
          <div className="customer-metric-value">{customerMetrics.activeCustomers}</div>
          <div className="customer-metric-chart">
            {/* Active customers chart would go here */}
          </div>
        </GlassCard>
        <GlassCard title="Potential Customers" className="customer-metric-card">
          <div className="customer-metric-value">{customerMetrics.potentialCustomers}</div>
          <div className="customer-metric-chart">
            {/* Potential customers chart would go here */}
          </div>
        </GlassCard>
        <GlassCard title="Customer Lifetime Value" className="customer-metric-card">
          <div className="customer-metric-value">${customerMetrics.customerLifetimeValue.toLocaleString()}</div>
          <div className="customer-metric-chart">
            {/* CLV chart would go here */}
          </div>
        </GlassCard>
        <GlassCard title="Churn Rate" className="customer-metric-card">
          <div className="customer-metric-value">{customerMetrics.churnRate}%</div>
          <div className="customer-metric-chart">
            {/* Churn rate chart would go here */}
          </div>
        </GlassCard>
      </div>
      
      {showNewCustomerForm && (
        <GlassCard title="Add New Customer" className="new-customer-form-card">
          <div className="new-customer-form">
            <div className="new-customer-form-row">
              <div className="new-customer-form-field">
                <label>Name</label>
                <GlassInput
                  name="name"
                  value={newCustomer.name}
                  onChange={handleNewCustomerChange}
                  placeholder="Customer name"
                  required
                />
              </div>
              <div className="new-customer-form-field">
                <label>Company</label>
                <GlassInput
                  name="company"
                  value={newCustomer.company}
                  onChange={handleNewCustomerChange}
                  placeholder="Company name"
                  required
                />
              </div>
            </div>
            <div className="new-customer-form-row">
              <div className="new-customer-form-field">
                <label>Email</label>
                <GlassInput
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleNewCustomerChange}
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="new-customer-form-field">
                <label>Phone</label>
                <GlassInput
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleNewCustomerChange}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="new-customer-form-row">
              <div className="new-customer-form-field">
                <label>Status</label>
                <select
                  name="status"
                  value={newCustomer.status}
                  onChange={handleNewCustomerChange}
                  className="glass-select"
                >
                  <option value="lead">Lead</option>
                  <option value="client">Client</option>
                  <option value="partner">Partner</option>
                </select>
              </div>
              <div className="new-customer-form-field">
                <label>Value ($)</label>
                <GlassInput
                  type="number"
                  name="value"
                  value={newCustomer.value}
                  onChange={handleNewCustomerChange}
                  placeholder="0.00"
                  min={0}
                  step="0.01"
                />
              </div>
            </div>
            <div className="new-customer-form-row">
              <div className="new-customer-form-field full-width">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={newCustomer.notes}
                  onChange={handleNewCustomerChange}
                  placeholder="Additional notes about the customer"
                  className="glass-textarea"
                />
              </div>
            </div>
          </div>
          <div className="new-customer-form-actions">
            <GlassButton variant="secondary" onClick={() => setShowNewCustomerForm(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={handleNewCustomerSubmit}>
              Add Customer
            </GlassButton>
          </div>
        </GlassCard>
      )}
      <div className="customer-management-filters">
        <div className="customer-filter-buttons">
          <GlassButton 
            variant={filter === 'all' ? 'primary' : 'default'} 
            onClick={() => setFilter('all')}
          >
            All
          </GlassButton>
          <GlassButton 
            variant={filter === 'client' ? 'primary' : 'default'} 
            onClick={() => setFilter('client')}
          >
            Clients
          </GlassButton>
          <GlassButton 
            variant={filter === 'lead' ? 'primary' : 'default'} 
            onClick={() => setFilter('lead')}
          >
            Leads
          </GlassButton>
          <GlassButton 
            variant={filter === 'partner' ? 'primary' : 'default'} 
            onClick={() => setFilter('partner')}
          >
            Partners
          </GlassButton>
        </div>
        <div className="customer-search">
          <GlassInput
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="customer-list">
        {filteredCustomers.length === 0 ? (
          <GlassCard title="No Customers Found" className="no-customers-card">
            <p className="no-customers-message">
              {searchTerm 
                ? `No customers matching "${searchTerm}" in ${filter === 'all' ? 'any status' : filter} status.` 
                : `No customers in ${filter === 'all' ? 'any status' : filter} status.`}
            </p>
            <GlassButton variant="primary" onClick={() => setShowNewCustomerForm(true)}>
              Add a New Customer
            </GlassButton>
          </GlassCard>
        ) : (
          filteredCustomers.map(customer => (
            <div key={customer.id} className="customer-card-container">
              <GlassCard 
                title={customer.name} 
                className={`customer-card customer-card-${customer.status}`}
              >
                <div className="customer-card-content">
                  <div className="customer-card-main">
                    <div className="customer-card-info">
                      <div className="customer-info-item">
                        <span className="customer-info-label">Company:</span>
                        <span className="customer-info-value">{customer.company}</span>
                      </div>
                      <div className="customer-info-item">
                        <span className="customer-info-label">Email:</span>
                        <span className="customer-info-value">{customer.email}</span>
                      </div>
                      <div className="customer-info-item">
                        <span className="customer-info-label">Phone:</span>
                        <span className="customer-info-value">{customer.phone}</span>
                      </div>
                      <div className="customer-info-item">
                        <span className="customer-info-label">Last Contact:</span>
                        <span className="customer-info-value">{new Date(customer.lastContact).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="customer-card-status-value">
                      <span className={`customer-status customer-status-${customer.status}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                      {customer.value > 0 && (
                        <div className="customer-value">
                          <span className="customer-value-label">Value:</span>
                          <span className="customer-value-amount">${customer.value.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="customer-card-actions">
                    <GlassButton 
                      variant="default" 
                      size="sm"
                      onClick={() => toggleCustomerDetails(customer.id)}
                    >
                      {selectedCustomer === customer.id ? 'Hide Details' : 'View Details'}
                    </GlassButton>
                    <GlassButton variant="primary" size="sm">Contact</GlassButton>
                    <GlassButton variant="secondary" size="sm">Edit</GlassButton>
                  </div>
                </div>
                
                {selectedCustomer === customer.id && (
                  <div className="customer-details">
                    <h3 className="customer-details-title">Customer Details</h3>
                    <div className="customer-details-notes">
                      <h4 className="customer-details-subtitle">Notes</h4>
                      <p className="customer-notes">{customer.notes || 'No notes available.'}</p>
                    </div>
                    <div className="customer-details-actions">
                      <GlassButton variant="default" size="sm">Add Note</GlassButton>
                      <GlassButton variant="default" size="sm">Schedule Meeting</GlassButton>
                      <GlassButton variant="default" size="sm">View History</GlassButton>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
