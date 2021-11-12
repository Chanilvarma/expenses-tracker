import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useHistory } from 'react-router-dom';
import { maxDate } from '../helper/dates';


const AddTransaction = () => {
    const history = useHistory();
    const { addTransaction } = useContext(GlobalContext);
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [name, setCategory] = useState('personal')
    const [amount, setAmount] = useState(0)

    //Adding New transaction
    const handleAddTransaction = (e) => {
        history.push('/history')
        e.preventDefault();
        const newTranscation = {
            id: Math.floor(Math.random() * 1000000),
            text,
            name,
            amount: +amount,
            date,

        }
        addTransaction(newTranscation);
        setAmount(0)
        setText('')
        setDate('')
    }

    return (
        <div className="add-transaction">
            <div className="row">
                <h3>Add new transaction</h3>
                <form>
                    <div className="form-control">
                        <label htmlFor="text">Text</label>
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            value={date} max={maxDate}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Select Date"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="category">Category</label>
                        <select value={name} onChange={e => setCategory(e.target.value)} id="category">
                            <option value="personal">Personal</option>
                            <option value="travel">Travel</option>
                            <option value="essential">Essential</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount"
                        >Amount <br />
                            (negative - expense, positive - income)</label
                        >
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" onClick={handleAddTransaction} className="btn" >Add transaction</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddTransaction
