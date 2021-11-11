import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { individualCategoryTotal } from './reUsableFunctions'
import Balance from './Balance'
import ChartCard from './pi-charts/ChartCard'


const Main = () => {
    const { transactions } = useContext(GlobalContext);

    // Separating Income and Expenses
    let plusValue = [];
    let minusValue = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amount < 0) {
            let temp = JSON.parse(JSON.stringify(transactions[i]));
            temp.amount = -1 * transactions[i].amount
            minusValue.push(temp)
        } else {
            plusValue.push(transactions[i])
        }
    }

    // Grouping same category data
    const plusGroup = plusValue.reduce((plusGroup, item) => {
        const name = item.name.split('T')[0];
        if (!plusGroup[name]) {
            plusGroup[name] = [];

        }
        plusGroup[name].push(item);
        return plusGroup;
    }, {});

    // Edit: to add it in the array format instead
    const PlusGroupArrays = Object.keys(plusGroup).map((name) => {
        return {
            items: plusGroup[name],
            name: plusGroup[name][0].name,
            total: individualCategoryTotal(plusGroup[name])
        };

    });


    // Grouping same date data
    const plusdateGroup = plusValue.reduce((plusdateGroup, item) => {
        const date = item.date.split('T')[0];
        if (!plusdateGroup[date]) {
            plusdateGroup[date] = [];

        }
        plusdateGroup[date].push(item);
        return plusdateGroup;
    }, {});

    // Edit: to add it in the array format instead
    const plusdateGroupArrays = Object.keys(plusdateGroup).map((date, category) => {
        return {
            date,
            items: plusdateGroup[date],
            total: individualCategoryTotal(plusdateGroup[date]),

        };
    });

    // Grouping same category data
    const groups = minusValue.reduce((groups, item) => {
        const name = item.name.split('T')[0];
        if (!groups[name]) {
            groups[name] = [];

        }
        groups[name].push(item);
        return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((name) => {
        return {
            items: groups[name],
            name: groups[name][0].name,
            total: individualCategoryTotal(groups[name])
        };

    });


    // Grouping same date data
    const dateGroup = minusValue.reduce((dateGroup, item) => {
        const date = item.date.split('T')[0];
        if (!dateGroup[date]) {
            dateGroup[date] = [];

        }
        dateGroup[date].push(item);
        return dateGroup;
    }, {});

    // Edit: to add it in the array format instead
    const dateGroupArrays = Object.keys(dateGroup).map((date, category) => {
        return {
            date,
            items: dateGroup[date],
            total: individualCategoryTotal(dateGroup[date]),

        };
    });
    return (
        <div className="main">
            <div className="balance">
                <Balance />
            </div>
            <div>
                <h4>Expenses Pi-chart</h4>
                <ChartCard PlusGroupArrays={PlusGroupArrays} plusdateGroupArrays={plusdateGroupArrays} groupArrays={groupArrays} dateGroupArrays={dateGroupArrays} />
            </div>

        </div >
    )
}

export default Main
