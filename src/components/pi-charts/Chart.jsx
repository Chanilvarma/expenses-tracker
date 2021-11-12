import React, { useContext } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel } from '../../helper/reUsableFunctions'
import { GlobalContext } from '../../context/GlobalState'

const Chart = ({ groupArrays }) => {
    const { transactions } = useContext(GlobalContext)
    console.log(groupArrays)

    // for (let i = 0; i < groupArrays.length; i++) {

    // }

    // Calculating the Income and Expense
    const amounts = transactions.map(transaction => transaction.amount);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    return (
        <div>
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
            {
                groupArrays.length === 0 ?
                    (<h3>You Don't have any expenses. Please add expenses to display chart here..</h3>) : (
                        <>
                            <PieChart width={300} height={200}>
                                <Pie
                                    className='pie-style'
                                    dataKey="total"
                                    isAnimationActive={true}
                                    data={groupArrays}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                >


                                    {groupArrays.map((entry, index) => (
                                        ((entry.name === "personal") && <Cell key={`cell-${index}`} fill={COLORS[2]} />)
                                        || ((entry.name === "travel") && <Cell key={`cell-${index}`} fill={COLORS[1]} />)
                                        || ((entry.name === "essential") && <Cell key={`cell-${index}`} fill={COLORS[0]} />)

                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </>
                    )
            }

        </div>
    )
}

export default Chart
