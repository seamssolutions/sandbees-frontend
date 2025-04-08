import React, { useState } from 'react';
import './CustomerManagement.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Mock customer data
const initialCustomers = [
  {
    id: 1,
    name: 'John Smith',
    company: 'Acme Inc.',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    status: 'customer',
    lastContact: '2025-04-01',
    notes: 'Key decision maker, prefers email communication',
    value: 12500
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'TechCorp',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 987-6543',
    status: 'lead',
    lastContact: '2025-04-03',
    notes: 'Interested in our premium plan, follow up next week',
    value: 0
  },
  {
    id: 3,
    name: 'Michael Brown',
    company: 'Global Solutions',
    email: 'm.brown@globalsolutions.com',
    phone: '+1 (555) 456-7890',
    status: 'partner',
    lastContact: '2025-04-01',
    notes: 'Strategic partnership for Asia market expansion',
    value: 35000
  },
  {
    id: 4,
    name: 'Emily Davis',
    company: 'Innovate LLC',
    email: 'emily@innovatellc.com',
    phone: '+1 (555) 234-5678',
    status: 'customer',
    lastContact: '2025-03-28',
    notes: 'Recently upgraded to business plan',
    value: 8500
  },
  {
    id: 5,
    name: 'David Wilson',
    company: 'Startup Hub',
    email: 'david@startuphub.co',
    phone: '+1 (555) 876-5432',
    status: 'lead',
    lastContact: '2025-04-05',
    notes: 'Requested demo, scheduled for next Tuesday',
    value: 0
  }
];

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'lead',
    notes: '',
    value: ''
  });

  // Calculate customer metrics
  const customerMetrics = {
    totalCustomers: customers.filter(c => c.status === 'customer').length,
    totalLeads: customers.filter(c => c.status === 'lead').length,
    totalPartners: customers.filter(c => c.status === 'partner').length,
    totalValue: customers.reduce((sum, c) => sum + c.value, 0)
  };

  // Filter customers based on status and search term
  const filteredCustomers = customers.filter(customer => {
    const matchesFilter = filter === 'all' || customer.status === filter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle new customer form input changes
  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: name === 'value' ? value : value
    });
  };

  // Handle new customer submission
  const handleNewCustomerSubmit = () => {
    if (newCustomer.name && newCustomer.email) {
      const newCustomerWithId = {
        ...newCustomer,
        id: customers.length + 1,
        lastContact: new Date().toISOString().split('T')[0],
        value: parseFloat(newCustomer.value as string) || 0
      };
      setCustomers([...customers, newCustomerWithId]);
      setNewCustomer({
        name: '',
        company: '',
        email: '',
        phone: '',
        status: 'lead',
        notes: '',
        value: ''
      });
      setShowNewCustomerForm(false);
    }
  };

  // Toggle customer details view
  const toggleCustomerDetails = (customerId: number) => {
    if (selectedCustomer === customerId) {
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(customerId);
    }
  };

  return (
    <div className="customer-management">
      <div className="customer-management-header">
        <h1 className="customer-management-title">Customer Management</h1>
        <div className="customer-management-actions">
          <GlassButton 
            variant="primary" 
            onClick={() => setShowNewCustomerForm(!showNewCustomerForm)}
          >
            {showNewCustomerForm ? 'Cancel' : 'New Customer'}
          </GlassButton>
        </div>
      </div>

      <div className="customer-metrics-cards">
        <GlassCard title="Customers" className="customer-metric-card customer-metric-customers">
          <div className="customer-metric-value">{customerMetrics.totalCustomers}</div>
          <div className="customer-metric-label">Active Customers</div>
        </GlassCard>
        
        <GlassCard title="Leads" className="customer-metric-card customer-metric-leads">
          <div className="customer-metric-value">{customerMetrics.totalLeads}</div>
          <div className="customer-metric-label">Potential Customers</div>
        </GlassCard>
        
        <GlassCard title="Partners" className="customer-metric-card customer-metric-partners">
          <div className="customer-metric-value">{customerMetrics.totalPartners}</div>
          <div className="customer-metric-label">Business Partners</div>
        </GlassCard>
        
        <GlassCard title="Customer Value" className="customer-metric-card customer-metric-value">
          <div className="customer-metric-value">${customerMetrics.totalValue.toLocaleString()}</div>
          <div className="customer-metric-label">Total Customer Value</div>
        </GlassCard>
      </div>

      {showNewCustomerForm && (
        <GlassCard title="Add New Customer" className="new-customer-form">
          <div className="new-customer-form-grid">
            <GlassInput
              label="Name"
              name="name"
              value={newCustomer.name}
              onChange={handleNewCustomerChange}
              required
              placeholder="Enter customer name"
            />
            
            <GlassInput
              label="Company"
              name="company"
              value={newCustomer.company}
              onChange={handleNewCustomerChange}
              placeholder="Enter company name"
            />
            
            <GlassInput
              label="Email"
              name="email"
              type="email"
              value={newCustomer.email}
              onChange={handleNewCustomerChange}
              required
              placeholder="Enter email address"
            />
            
            <GlassInput
              label="Phone"
              name="phone"
              value={newCustomer.phone}
              onChange={handleNewCustomerChange}
              placeholder="Enter phone number"
            />
            
            <div className="new-customer-form-row">
              <label className="new-customer-form-label">Status</label>
              <div className="new-customer-form-radio-group">
                <label className="new-customer-form-radio">
                  <input
                    type="radio"
                    name="status"
                    value="lead"
                    checked={newCustomer.status === 'lead'}
                    onChange={handleNewCustomerChange}
                  />
                  Lead
                </label>
                <label className="new-customer-form-radio">
                  <input
                    type="radio"
                    name="status"
                    value="customer"
                    checked={newCustomer.status === 'customer'}
                    onChange={handleNewCustomerChange}
                  />
                  Customer
                </label>
                <label className="new-customer-form-radio">
                  <input
                    type="radio"
                    name="status"
                    value="partner"
                    checked={newCustomer.status === 'partner'}
                    onChange={handleNewCustomerChange}
                  />
                  Partner
                </label>
              </div>
            </div>
            
            <GlassInput
              label="Customer Value"
              name="value"
              type="number"
              value={newCustomer.value as string}
              onChange={handleNewCustomerChange}
              placeholder="Enter customer value"
            />
          </div>
          
          <GlassInput
            label="Notes"
            name="notes"
            value={newCustomer.notes}
            onChange={handleNewCustomerChange}
            placeholder="Enter any additional notes"
          />
          
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
            variant={filter === 'customer' ? 'primary' : 'default'} 
            onClick={() => setFilter('customer')}
          >
            Customers
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
