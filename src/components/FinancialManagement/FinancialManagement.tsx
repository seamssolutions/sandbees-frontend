import React, { useState } from 'react';
import './FinancialManagement.css';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import GlassInput from '../GlassInput/GlassInput';

// Mock financial data
const initialTransactions = [
  {
    id: 1,
    type: 'income',
    amount: 12500,
    description: 'Client payment - ABC Corp',
    category: 'Sales',
    date: '2025-04-01',
    status: 'completed'
  },
  {
    id: 2,
    type: 'expense',
    amount: 2300,
    description: 'Office rent',
    category: 'Rent',
    date: '2025-04-02',
    status: 'completed'
  },
  {
    id: 3,
    type: 'income',
    amount: 8500,
    description: 'Client payment - XYZ Inc',
    category: 'Sales',
    date: '2025-04-05',
    status: 'completed'
  },
  {
    id: 4,
    type: 'expense',
    amount: 1200,
    description: 'Software subscriptions',
    category: 'Software',
    date: '2025-04-07',
    status: 'completed'
  },
  {
    id: 5,
    type: 'expense',
    amount: 850,
    description: 'Marketing expenses',
    category: 'Marketing',
    date: '2025-04-10',
    status: 'completed'
  },
  {
    id: 6,
    type: 'income',
    amount: 11500,
    description: 'Client payment - Global Solutions',
    category: 'Sales',
    date: '2025-04-15',
    status: 'completed'
  },
  {
    id: 7,
    type: 'invoice',
    amount: 12300,
    description: 'Consulting services - TechCorp',
    category: 'Consulting',
    date: '2025-04-18',
    status: 'pending'
  }
];

const FinancialManagement: React.FC = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    status: 'completed'
  });

  // Calculate financial summary
  const financialSummary = {
    totalIncome: transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingInvoices: transactions
      .filter(t => t.type === 'invoice' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)
  };

  const profit = financialSummary.totalIncome - financialSummary.totalExpenses;

  // Filter transactions based on type and search term
  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle new transaction form input changes
  const handleNewTransactionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === 'amount' ? value : value
    });
  };

  // Handle new transaction submission
  const handleNewTransactionSubmit = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.date) {
      const newTransactionWithId = {
        ...newTransaction,
        id: transactions.length + 1,
        amount: parseFloat(newTransaction.amount as string)
      };
      setTransactions([...transactions, newTransactionWithId]);
      setNewTransaction({
        type: 'income',
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
      });
      setShowNewTransactionForm(false);
    }
  };

  return (
    <div className="financial-management">
      <div className="financial-management-header">
        <h1 className="financial-management-title">Financial Management</h1>
        <div className="financial-management-actions">
          <GlassButton 
            variant="primary" 
            onClick={() => setShowNewTransactionForm(!showNewTransactionForm)}
          >
            {showNewTransactionForm ? 'Cancel' : 'New Transaction'}
          </GlassButton>
        </div>
      </div>

      <div className="financial-summary-cards">
        <GlassCard title="Income" className="financial-summary-card financial-summary-income">
          <div className="financial-summary-value">${financialSummary.totalIncome.toLocaleString()}</div>
          <div className="financial-summary-label">Total Income</div>
        </GlassCard>
        
        <GlassCard title="Expenses" className="financial-summary-card financial-summary-expenses">
          <div className="financial-summary-value">${financialSummary.totalExpenses.toLocaleString()}</div>
          <div className="financial-summary-label">Total Expenses</div>
        </GlassCard>
        
        <GlassCard title="Profit" className="financial-summary-card financial-summary-profit">
          <div className="financial-summary-value">${profit.toLocaleString()}</div>
          <div className="financial-summary-label">Net Profit</div>
        </GlassCard>
        
        <GlassCard title="Pending" className="financial-summary-card financial-summary-pending">
          <div className="financial-summary-value">${financialSummary.pendingInvoices.toLocaleString()}</div>
          <div className="financial-summary-label">Pending Invoices</div>
        </GlassCard>
      </div>

      {showNewTransactionForm && (
        <GlassCard title="Create New Transaction" className="new-transaction-form">
          <div className="new-transaction-form-grid">
            <div className="new-transaction-form-row">
              <label className="new-transaction-form-label">Transaction Type</label>
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
            
            <GlassInput
              label="Amount"
              name="amount"
              type="number"
              value={newTransaction.amount as string}
              onChange={handleNewTransactionChange}
              required
              placeholder="Enter amount"
            />
            
            <GlassInput
              label="Description"
              name="description"
              value={newTransaction.description}
              onChange={handleNewTransactionChange}
              required
              placeholder="Enter description"
            />
            
            <GlassInput
              label="Category"
              name="category"
              value={newTransaction.category}
              onChange={handleNewTransactionChange}
              placeholder="Enter category"
            />
            
            <GlassInput
              label="Date"
              name="date"
              type="date"
              value={newTransaction.date}
              onChange={handleNewTransactionChange}
              required
            />
            
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
