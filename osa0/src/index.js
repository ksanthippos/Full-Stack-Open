import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// OSA 0

// Components
// *********

const History = (props) => {

    // ehdollinen renderöinti
    if (props.allClicks.length === 0) {
        return(
            <div>
                Press buttons & collect clicks!
            </div>
        )
    }

    return (
        <div>
            Button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

// **********

// App root
const App = (props) => {

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])    // luo tyhjän taulukon

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <>
            <div>
                {left}
                <Button onClick={handleLeftClick} text='Left' />
                <Button onClick={handleRightClick} text='Right' />
                {right}
                <History allClicks={allClicks} />
            </div>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))

