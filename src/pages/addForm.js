import React, { useState, useEffect } from 'react';

export default function addForm() {
  const [type, setType] = useState('expense');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('paytm');
  const [source, setSource] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incoming, setIncoming] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    const storedIncoming = localStorage.getItem('incoming');

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }

    if (storedIncoming) {
      setIncoming(JSON.parse(storedIncoming));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      date,
      category,
      description,
      amount,
      paymentMode,
    };

    if (type === 'expense') {
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } else if (type === 'incoming') {
      const newIncoming = {
        date,
        source,
        amount,
      };
      const updatedIncoming = [...incoming, newIncoming];
      setIncoming(updatedIncoming);
      localStorage.setItem('incoming', JSON.stringify(updatedIncoming));
    }

    setDate('');
    setCategory('food');
    setDescription('');
    setAmount('');
    setPaymentMode('paytm');
    setSource('');
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-6">Expense Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
            >
              <option value="expense">New Expense</option>
              <option value="incoming">New Incoming</option>
            </select>
          </div>
          {type === 'expense' ? (
            <>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                >
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="shopping">Shopping</option>
                  <option value="medical">Medical</option>
                  <option value="random">Random</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">Amount</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="paymentMode" className="block text-gray-700">Payment Mode</label>
                <select
                  id="paymentMode"
                  name="paymentMode"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                >
                  <option value="paytm">Paytm</option>
                  <option value="cred">Cred</option>
                  <option value="google-pay">Google Pay</option>
                  <option value="card">Card</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>
            </>
          ) : (
            <>
            <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="source" className="block text-gray-700">Source</label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">Amount</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md"
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
