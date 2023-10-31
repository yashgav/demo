import React, { useState } from 'react';

const BudgetingPage = () => {
    const [income, setIncome] = useState('');
    const [fixedExpenses, setFixedExpenses] = useState([{ id: 1, name: '', amount: '' }]);
    const [variableExpenses, setVariableExpenses] = useState([{ id: 1, name: '', amount: '' }]);
    const [savingsGoals, setSavingsGoals] = useState([{ id: 1, name: '', amount: '' }]);

    const handleFixedExpenseChange = (id, name, value) => {
        const updatedExpenses = fixedExpenses.map((expense) =>
            expense.id === id ? { ...expense, [name]: value } : expense
        );
        setFixedExpenses(updatedExpenses);
    };

    const handleVariableExpenseChange = (id, name, value) => {
        const updatedExpenses = variableExpenses.map((expense) =>
            expense.id === id ? { ...expense, [name]: value } : expense
        );
        setVariableExpenses(updatedExpenses);
    };

    const handleSavingsGoalChange = (id, name, value) => {
        const updatedGoals = savingsGoals.map((goal) =>
            goal.id === id ? { ...goal, [name]: value } : goal
        );
        setSavingsGoals(updatedGoals);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform budget calculations and generate output

        // Calculate the total fixed expenses
        const totalFixedExpenses = fixedExpenses.reduce(
            (acc, expense) => acc + Number(expense.amount),
            0
        );

        // Calculate the total variable expenses
        const totalVariableExpenses = variableExpenses.reduce(
            (acc, expense) => acc + Number(expense.amount),
            0
        );

        // Calculate the total savings goals
        const totalSavingsGoals = savingsGoals.reduce(
            (acc, goal) => acc + Number(goal.amount),
            0
        );

        // Calculate the remaining budget
        const remainingBudget = Number(income) - totalFixedExpenses - totalVariableExpenses - totalSavingsGoals;

        // Generate the output
        const output = {
            income: Number(income),
            fixedExpenses: totalFixedExpenses,
            variableExpenses: totalVariableExpenses,
            savingsGoals: totalSavingsGoals,
            remainingBudget,
        };

        console.log('Budget calculation output:', output);
    };

    const addFixedExpense = () => {
        const newId = fixedExpenses.length + 1;
        setFixedExpenses([...fixedExpenses, { id: newId, name: '', amount: '' }]);
    };

    const addVariableExpense = () => {
        const newId = variableExpenses.length + 1;
        setVariableExpenses([...variableExpenses, { id: newId, name: '', amount: '' }]);
    };

    const addSavingsGoal = () => {
        const newId = savingsGoals.length + 1;
        setSavingsGoals([...savingsGoals, { id: newId, name: '', amount: '' }]);
    };

    const deleteFixedExpense = (id) => {
        const updatedExpenses = fixedExpenses.filter((expense) => expense.id !== id);
        setFixedExpenses(updatedExpenses);
    };

    const deleteVariableExpense = (id) => {
        const updatedExpenses = variableExpenses.filter((expense) => expense.id !== id);
        setVariableExpenses(updatedExpenses);
    };

    const deleteSavingsGoal = (id) => {
        const updatedGoals = savingsGoals.filter((goal) => goal.id !== id);
        setSavingsGoals(updatedGoals);
    };

    return (
        <div>
            <h1>Budgeting Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Income:
                    <input type="text" value={income} onChange={(e) => setIncome(e.target.value)} />
                </label>

                <h2>Fixed Expenses</h2>
                <button type="button" onClick={addFixedExpense}>
                    Add Fixed Expense
                </button>
                {fixedExpenses.map((expense) => (
                    <div key={expense.id}>
                        <input
                            type="text"
                            value={expense.name}
                            onChange={(e) => handleFixedExpenseChange(expense.id, 'name', e.target.value)}
                            placeholder="Expense Name"
                        />
                        <input
                            type="text"
                            value={expense.amount}
                            onChange={(e) => handleFixedExpenseChange(expense.id, 'amount', e.target.value)}
                            placeholder="Expense Amount"
                        />
                        <button type="button" onClick={() => deleteFixedExpense(expense.id)}>
                            Delete
                        </button>
                    </div>
                ))}

                <h2>Variable Expenses</h2>
                <button type="button" onClick={addVariableExpense}>
                    Add Variable Expense
                </button>
                {variableExpenses.map((expense) => (
                    <div key={expense.id}>
                        <input
                            type="text"
                            value={expense.name}
                            onChange={(e) => handleVariableExpenseChange(expense.id, 'name', e.target.value)}
                            placeholder="Expense Name"
                        />
                        <input
                            type="text"
                            value={expense.amount}
                            onChange={(e) => handleVariableExpenseChange(expense.id, 'amount', e.target.value)}
                            placeholder="Expense Amount"
                        />
                        <button type="button" onClick={() => deleteVariableExpense(expense.id)}>
                            Delete
                        </button>
                    </div>
                ))}

                <h2>Savings Goals</h2>
                <button type="button" onClick={addSavingsGoal}>
                    Add Savings Goal
                </button>
                {savingsGoals.map((goal) => (
                    <div key={goal.id}>
                        <input
                            type="text"
                            value={goal.name}
                            onChange={(e) => handleSavingsGoalChange(goal.id, 'name', e.target.value)}
                            placeholder="Goal Name"
                        />
                        <input
                            type="text"
                            value={goal.amount}
                            onChange={(e) => handleSavingsGoalChange(goal.id, 'amount', e.target.value)}
                            placeholder="Goal Amount"
                        />
                        <button type="button" onClick={() => deleteSavingsGoal(goal.id)}>
                            Delete
                        </button>
                    </div>
                ))}

                <button type="submit">Calculate Budget</button>
            </form>
        </div>
    );
};

export default BudgetingPage;
