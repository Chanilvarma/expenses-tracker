
import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, individualCategoryTotal } from '../../helper/reUsableFunctions'
import { yesterday } from '../../helper/dates'


const YesterdayChart = ({ groupArrays, plusdateGroupArrays }) => {
    let temp = []
    for (let i = 0; i < groupArrays.length; i++) {
        for (let j = 0; j < groupArrays[i].items.length; j++) {
            if (groupArrays[i].items[j].date === yesterday) {
                temp.push(groupArrays[i].items[j])
            }
        }
    }
    let temp2 = []
    for (let i = 0; i < plusdateGroupArrays.length; i++) {
        for (let j = 0; j < plusdateGroupArrays[i].items.length; j++) {
            if (plusdateGroupArrays[i].items[j].date === yesterday) {
                temp2.push(plusdateGroupArrays[i].items[j])
            }
        }
    }

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
    // Grouping same date data(category)
    let expense, income;
    if (temp !== undefined) {
        const amounts = temp.map(transaction => transaction.amount);
        expense = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
        if (temp2 !== undefined) {
            const incomeAmount = temp2.map(transaction => transaction.amount)
            income = incomeAmount.filter(item => item > 0)
                .reduce((acc, item) => (acc += item), 0)
                .toFixed(2);
        }

    }
    return (
        <div>
            {
                newGroupArrays.length === 0 ? (<h3>You Don't have any expenses {yesterday}</h3>) : (
                    <>
                        <h3>{yesterday}</h3>
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
                                {newGroupArrays.map((entry, index) => (
                                    ((entry.name === "personal") && <Cell key={`cell-${index}`} fill={COLORS[2]} />)
                                    || ((entry.name === "travel") && <Cell key={`cell-${index}`} fill={COLORS[1]} />)
                                    || ((entry.name === "essential") && <Cell key={`cell-${index}`} fill={COLORS[0]} />)
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </>)
            }


        </div>
    )
}

export default YesterdayChart


