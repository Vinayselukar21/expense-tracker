import React, { useState } from 'react';
import IncomingTab from '../components/IncomingTab';
import ExpensesTab from '../components/ExpensesTab';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

const Transactions = () => {
    const [activeTab, setActiveTab] = useState('incoming');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div>
        <div className="mb-1 flex justify-center">
          <div
            className={`mr-2 flex flex-row cursor-pointer py-2 px-4 rounded-t-lg ${
              activeTab === 'incoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => handleTabChange('incoming')}
          >
            <FaArrowCircleDown className="text-xl my-auto mr-2" />
            Incoming
          </div>
          <div
            className={`mr-2 flex flex-row cursor-pointer py-2 px-4 rounded-t-lg ${
              activeTab === 'expenses'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => handleTabChange('expenses')}
          >
            <FaArrowCircleUp className="text-xl my-auto mr-2" />
            Expenses
          </div>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          {activeTab === 'incoming' ? <IncomingTab /> : <ExpensesTab />}
        </div>
      </div>
    );
};

export default Transactions;
