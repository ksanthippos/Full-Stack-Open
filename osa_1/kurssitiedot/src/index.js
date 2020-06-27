import React from 'react';
import ReactDOM from 'react-dom';

// OSA 1
// KURSSITIEDOT

// Komponentit
const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.excercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0].name} excercises={props.parts[0].excercises} />
            <Part part={props.parts[1].name} excercises={props.parts[1].excercises} />
            <Part part={props.parts[2].name} excercises={props.parts[2].excercises} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{[props.header]}</h1>
        </div>
    )
}

// En tiedä miksi total-lukumäärä tulostuu selaimessa uudelle riville?
const Total = (props) => {
    return (
        <div>
           Number of excercises: <Part excercises={props.parts[0].excercises + props.parts[1].excercises + props.parts[2].excercises} />
        </div>
    )
}

// Appi
const App = () => {

    const course = {
        name : 'Half stack application development',
        parts : [
            {
                name : 'Fundamentals of React',
                excercises : 10
            },
            {
                name : 'Using props to pass data',
                excercises : 7
            },
            {
                name : 'State of a component',
                excercises : 14
            }]
    };

    return (
        <>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
