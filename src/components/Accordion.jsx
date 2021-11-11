import React, { useState, useContext } from 'react'
import Transaction from './Transaction'
import { GlobalContext } from '../context/GlobalState'

const Accordion = () => {
    const [ActiveIndex, setActiveIndex] = useState(null)
    const { transactions } = useContext(GlobalContext);


    const individualDayTotal = (arr) => {
        let temp = 0;
        for (let j = 0; j < arr.length; j++) {
            temp += arr[j].amount
        }
        return temp
    }

    // Grouping same date data
    const groups = transactions.reduce((groups, item) => {
        const date = item.date.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];

        }
        groups[date].push(item);
        return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
        return {
            date,
            items: groups[date],
            total: individualDayTotal(groups[date])
        };
    });
    // sorting the transaction array based on date
    const sortType = 'asc';
    const sorted = transactions.sort((a, b) => {
        const isSorted = (sortType === 'asc') ? 1 : -1
        return isSorted * b.date.localeCompare(a.date)
    })

    const handleClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <div>
            {
                groupArrays.map((transaction, index) => {
                    const active = index === ActiveIndex ? 'active' : '';
                    return (
                        <div className="ui styled accordion" key={transaction.id}>
                            <div className={`title ${active}`} onClick={() => handleClick(index)}>
                                <i className="dropdown icon"></i>
                                {transaction.date}
                                <span className="total-value"  >{transaction.total}</span>
                            </div>
                            <div className={`content ${active}`}>
                                {
                                    transaction.items.map((item) => <p><Transaction key={item.id} transaction={item} /></p>)
                                }

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Accordion
