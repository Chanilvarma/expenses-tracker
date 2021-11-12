
import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, individualCategoryTotal } from '../../helper/reUsableFunctions'
import { yesterday } from '../../helper/dates'

const YesterdayChart = ({ groupArrays, plusdateGroupArrays }) => {


    // Grouping same date data(category)
    let categoryGroupArrays, expense, income;
    if (groupArrays[1] !== undefined) {
        const amounts = groupArrays[1].items.map(transaction => transaction.amount);
        expense = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
        if (plusdateGroupArrays[1] !== undefined) {
            const incomeAmount = plusdateGroupArrays[1].items.map(transaction => transaction.amount)
            income = incomeAmount.filter(item => item > 0)
                .reduce((acc, item) => (acc += item), 0)
                .toFixed(2);
        }

        // expense = (
        //     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        //     -1
        // ).toFixed(2);
        const categoryGroup = groupArrays[1].items.reduce((categoryGroup, item) => {
            const name = item.name.split('T')[0];
            if (!categoryGroup[name]) {
                categoryGroup[name] = [];

            }
            categoryGroup[name].push(item);
            return categoryGroup;
        }, {});

        // Edit: to add it in the array format instead
        categoryGroupArrays = Object.keys(categoryGroup).map((name) => {
            return {
                items: categoryGroup[name],
                name: categoryGroup[name][0].name,
                total: individualCategoryTotal(categoryGroup[name])
            };

        });

    }

    return (
        <div>
            {
                groupArrays[1] === undefined ? (<h3> You don't have any expenses on {yesterday} </h3>) : (<>
                    {
                        groupArrays[1].date === yesterday ? (
                            <>
                                <h3>{groupArrays[1].date}</h3>
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
                                        isAnimationActive={true}
                                        data={categoryGroupArrays}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                    >
                                        {groupArrays[1].items.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={groupArrays[0].items[0].category} />
                                </PieChart>
                            </>
                        ) : (<h3> You don't have any transactions on {yesterday} </h3>)
                    }

                </>)
            }

        </div>
    )
}

export default YesterdayChart


