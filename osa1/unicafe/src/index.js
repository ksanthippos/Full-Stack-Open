import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// komponentit
const Header = ({text}) => (
    <div>
        <h1>{text}</h1>
    </div>
)


const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const StatisticsLine = ({text, value, type}) => {
    if (type === 'percentage') {
        return (
            <div>
                {text}: {value} %
            </div>
        )
    }
    return (
        <div>
            {text}: {value}
        </div>
    )
}

const Statistics = ({good, neutral, bad}) => {

    let sum = good + neutral + bad
    let value = good * 1 + bad * -1
    let avg = value / sum
    let positive = good / sum * 100

    if (good === 0 && neutral === 0 && bad === 0)
        return (
            <div>
                No feedback given yet.
            </div>
        )

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><StatisticsLine text='Good' value={good} type='grade'/></td>
                    </tr>
                    <tr>
                        <td><StatisticsLine text='Neutral' value={neutral} type='grade'/></td>
                    </tr>
                    <tr>
                        <td><StatisticsLine text='Bad' value={bad} type='grade'/></td>
                    </tr>
                    <tr>
                        <td><StatisticsLine text='All' value={sum} type='sum'/></td>
                    </tr>
                    <tr>
                        <td><StatisticsLine text='Average' value={avg} type='average'/></td>
                    </tr>
                    <tr>
                        <td><StatisticsLine text='Positive' value={positive} type='percentage'/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

// juuri
const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Header text={'Give feedback'} />
            <Button onClick={handleGood} text={'Good'} />
            <Button onClick={handleNeutral} text={'Neutral'} />
            <Button onClick={handleBad} text={'Bad'} />
            <Header text={'Statistics'} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}




ReactDOM.render(<App />, document.getElementById('root'));


