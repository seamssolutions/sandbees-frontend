import React, { useState, useEffect } from 'react';
import './FinancialManagement.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Define interface for FinancialManagement component props
interface FinancialManagementProps {
  onMount?: () => void;
}

// Sample data for financial metrics
const financialMetrics = {
  totalRevenue: 124500,
  totalExpenses: 78200,
  netProfit: 46300,
  pendingInvoices: 32800,
  accountsReceivable: 45600,
  accountsPayable: 18700
};

// Sample data for transactions
const initialTransactions = [
  {
    id: 1,
    date: '2025-04-01',
    description: 'Client Payment - ABC Corp',
    category: 'Services',
    amount: 5000,
    type: 'income',
    status: 'completed'
  },
  {
    id: 2,
    date: '2025-04-03',
    description: 'Office Rent',
    category: 'Rent',
    amount: 2500,
    type: 'expense',
    status: 'completed'
  },
  {
    id: 3,
    date: '2025-04-05',
    description: 'Software Subscription',
    category: 'Software',
    amount: 99.99,
    type: 'expense',
    status: 'completed'
  },
  {
    id: 4,
    date: '2025-04-10',
    description: 'Invoice #1042 - TechCorp',
    category: 'Consulting',
    amount: 7500,
    type: 'invoice',
    status: 'pending'
  },
  {
    id: 5,
    date: '2025-04-15',
    description: 'Client Payment - XYZ Inc',
    category: 'Services',
    amount: 3200,
    type: 'income',
    status: 'completed'
  },
  {
    id: 6,
    date: '2025-04-18',
    description: 'Marketing Campaign',
    category: 'Marketing',
    amount: 1200,
    type: 'expense',
    status: 'completed'
  },
  {
    id: 7,
    date: '2025-04-20',
    description: 'Invoice #1043 - Global Solutions',
    category: 'Development',
    amount: 12000,
    type: 'invoice',
    status: 'pending'
  },
  {
    id: 8,
    date: '2025-04-25',
    description: 'Team Lunch',
    category: 'Meals',
    amount: 175.50,
    type: 'expense',
    status: 'completed'
  }
];

const FinancialManagement: React.FC<FinancialManagementProps> = ({ onMount }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    amount: '',
    type: 'income',
    status: 'completed'
  });

  // Call onMount callback when component mounts
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // Filter transactions based on type and search term
  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Calculate financial summary based on filtered transactions
  const calculateSummary = () => {
    const income = filteredTransactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const pendingInvoices = filteredTransactions
      .filter(t => t.type === 'invoice' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income,
      expenses,
      profit: income - expenses,
      pendingInvoices
    };
  };

  const summary = calculateSummary();

  // Handle input change for new transaction form
  const handleNewTransactionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  // Handle new transaction submission
  const handleNewTransactionSubmit = () => {
    const newTransactionWithId = {
      ...newTransaction,
      id: Math.max(...transactions.map(t => t.id)) + 1,
      amount: parseFloat(newTransaction.amount)
    };
    setTransactions([...transactions, newTransactionWithId]);
    setShowNewTransactionForm(false);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: '',
      amount: '',
      type: 'income',
      status: 'completed'
    });
  };

  return (
    <div className="financial-management">
      <div className="financial-management-header">
        <h1 className="financial-management-title">Financial Management</h1>
        <GlassButton 
          variant="primary" 
          onClick={() => setShowNewTransactionForm(true)}
        >
          New Transaction
        </GlassButton>
      </div>
      
      <div className="financial-metrics-grid">
        <GlassCard title="Revenue" className="financial-metric-card">
          <div className="financial-metric-value">${financialMetrics.totalRevenue.toLocaleString()}</div>
          <div className="financial-metric-chart">
            {/* Revenue chart would go here */}
          </div>
        </GlassCard>
        <GlassCard title="Expenses" className="financial-metric-card">
          <div className="financial-metric-value">${financialMetrics.totalExpenses.toLocaleString()}</div>
          <div className="financial-metric-chart">
            {/* Expenses chart would go here */}
          </div>
        </GlassCard>
        <GlassCard title="Net Profit" className="financial-metric-card">
          <div className="financial-metric-value">${financialMetrics.netProfit.toLocaleString()}</div>
          <div className="financial-metric-chart">
            {/* Profit chart would go here */}
          </div>
        </GlassCard>
        <GlassCard title="Pending Invoices" className="financial-metric-card">
          <div className="financial-metric-value">${financialMetrics.pendingInvoices.toLocaleString()}</div>
          <div className="financial-metric-chart">
            {/* Pending invoices chart would go here */}
          </div>
        </GlassCard>
      </div>
      
      {showNewTransactionForm && (
        <GlassCard title="New Transaction" className="new-transaction-form-card">
          <div className="new-transaction-form">
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Date</label>
              <GlassInput
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleNewTransactionChange}
                required
              />
            </div>
            
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Description</label>
              <GlassInput
                name="description"
                value={newTransaction.description}
                onChange={handleNewTransactionChange}
                placeholder="Transaction description"
                required
              />
            </div>
            
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Category</label>
              <GlassInput
                name="category"
                value={newTransaction.category}
                onChange={handleNewTransactionChange}
                placeholder="Transaction category"
                required
              />
            </div>
            
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Amount</label>
              <GlassInput
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleNewTransactionChange}
                placeholder="0.00"
                min={0}
                step="0.01"
                required
              />
            </div>
            
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Type</label>
              <div className="new-transaction-form-radio-group">
                <label className="new-transaction-form-radio">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={newTransaction.type === 'income'}
                    onChange={handleNewTransactionChange}
                  />
                  Income
                </label>
                <label className="new-transaction-form-radio">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={newTransaction.type === 'expense'}
                    onChange={handleNewTransactionChange}
                  />
                  Expense
                </label>
                <label className="new-transaction-form-radio">
                  <input
                    type="radio"
                    name="type"
                    value="invoice"
                    checked={newTransaction.type === 'invoice'}
                    onChange={handleNewTransactionChange}
                  />
                  Invoice
                </label>
              </div>
            </div>
            
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Status</label>
              <div className="new-transaction-form-radio-group">
                <label className="new-transaction-form-radio">
                  <input
                    type="radio"
                    name="status"
                    value="completed"
                    checked={newTransaction.status === 'completed'}
                    onChange={handleNewTransactionChange}
                  />
                  Completed
                </label>
                <label className="new-transaction-form-radio">
                  <input
                    type="radio"
                    name="status"
                    value="pending"
                    checked={newTransaction.status === 'pending'}
                    onChange={handleNewTransactionChange}
                  />
                  Pending
                </label>
              </div>
            </div>
          </div>
          
          <div className="new-transaction-form-actions">
            <GlassButton variant="secondary" onClick={() => setShowNewTransactionForm(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={handleNewTransactionSubmit}>
              Create Transaction
            </GlassButton>
          </div>
        </GlassCard>
      )}
      <div className="financial-management-filters">
        <div className="transaction-filter-buttons">
          <GlassButton 
            variant={filter === 'all' ? 'primary' : 'default'} 
            onClick={() => setFilter('all')}
          >
            All
          </GlassButton>
          <GlassButton 
            variant={filter === 'income' ? 'primary' : 'default'} 
            onClick={() => setFilter('income')}
          >
            Income
          </GlassButton>
          <GlassButton 
            variant={filter === 'expense' ? 'primary' : 'default'} 
            onClick={() => setFilter('expense')}
          >
            Expenses
          </GlassButton>
          <GlassButton 
            variant={filter === 'invoice' ? 'primary' : 'default'} 
            onClick={() => setFilter('invoice')}
          >
            Invoices
          </GlassButton>
        </div>
        <div className="transaction-search">
          <GlassInput
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <GlassCard title="Transactions" className="transactions-card">
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-transactions">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category}</td>
                    <td className={`transaction-amount transaction-amount-${transaction.type}`}>
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td>
                      <span className={`transaction-type transaction-type-${transaction.type}`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`transaction-status transaction-status-${transaction.status}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="transaction-actions">
                        <GlassButton variant="secondary" size="sm">Edit</GlassButton>
                        <GlassButton variant="danger" size="sm">Delete</GlassButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default FinancialManagement;
