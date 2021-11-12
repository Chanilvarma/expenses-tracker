import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, individualCategoryTotal } from '../../helper/reUsableFunctions'
import { firstDate, lastDate } from '../dates';

const LastMonthChart = ({ groupArrays, PlusGroupArrays }) => {

    let temp = []
    for (let i = 0; i < groupArrays.length; i++) {
        for (let j = 0; j < groupArrays[i].items.length; j++) {
            if (groupArrays[i].items[j].date >= firstDate && groupArrays[i].items[j].date <= lastDate) {
                temp.push(groupArrays[i].items[j])
            }
        }
    }

    let temp2 = []
    for (let i = 0; i < PlusGroupArrays.length; i++) {
        for (let j = 0; j < PlusGroupArrays[i].items.length; j++) {
            if (PlusGroupArrays[i].items[j].date >= firstDate && PlusGroupArrays[i].items[j].date <= lastDate) {
                temp2.push(PlusGroupArrays[i].items[j])
            }
        }
    }
    // Calculating the Income and Expense
    const amounts = temp.map(transaction => transaction.amount);
    const expense = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const incomeAmount = temp2.map(transaction => transaction.amount)
    const income = incomeAmount.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    // const income = (
    //     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    //     -1
    // ).toFixed(2);

    // Grouping same date data
    const newGroup = temp.reduce((newGroup, item) => {
        const name = item.name.split('T')[0];
        if (!newGroup[name]) {
            newGroup[name] = [];

        }
        newGroup[name].push(item);
        return newGroup;
    }, {});

    // Edit: to add it in the array format instead
    const newGroupArrays = Object.keys(newGroup).map((name) => {
        return {
            items: newGroup[name],
            name: newGroup[name][0].name,
            total: individualCategoryTotal(newGroup[name])
        };

    });

    // console.log(newGroupArrays)
    return (
        <div>
            {
                newGroupArrays.length === 0 ? (<h3>You Don't have any transactions between {firstDate} and {lastDate}</h3>) : (
                    <>
                        <h3>{firstDate} to {lastDate}</h3>
                        <div className="inc-exp-container">
                            <div>
                                <h4>Income</h4>
                                <p className="money plus">+${income}</p>
                            </div>
                            <div>
                                <h4>Expense</h4>
                                <p className="money minus">-${expense}</p>
                            </div>
                        </div>

                        <PieChart width={300} height={200}>
                            <Pie
                                className='pie-style'
                                dataKey="total"
                                data={newGroupArrays}
                                isAnimationActive={true}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                            >
                                {groupArrays.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </>)
            }


        </div>
    )
}

export default LastMonthChart

















