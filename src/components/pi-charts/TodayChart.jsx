import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, individualCategoryTotal } from '../reUsableFunctions'
import { today } from '../dates';

const TodayChart = ({ groupArrays, plusdateGroupArrays }) => {


    let categoryGroupArrays, expense, income;
    // Grouping same date data(category)
    if (groupArrays[0] !== undefined) {
        const amounts = groupArrays[0].items.map(transaction => transaction.amount);
        expense = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
        const incomeAmount = plusdateGroupArrays[0].items.map(transaction => transaction.amount)
        income = incomeAmount.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
        // income = (
        //     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        //     -1
        // ).toFixed(2);
        const categoryGroup = groupArrays[0].items.reduce((categoryGroup, item) => {
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


    console.log(categoryGroupArrays)

    return (
        <div>


            {
                groupArrays[0] === undefined ? (<h3>You don't have any transactions on {today}</h3>) : (<>
                    {
                        groupArrays[0].date === today ? (
                            <>

                                <h3>{groupArrays[0].date}</h3>
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
                                        {groupArrays.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={groupArrays[0].items[0].category} />
                                </PieChart>
                            </>
                        ) : (<h3> You don't have any transactions on {today}</h3>)
                    }
                </>)
            }
        </div>
    )
}

export default TodayChart

