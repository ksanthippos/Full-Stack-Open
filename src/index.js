import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ parts }) => {

    /*
    // summaus for-loopilla
    let sum = 0
    for (let i = 0; i < parts.length; i++) {
        sum += parts[i].exercises
    }*/

    // summaus reducella
    const sum = parts.reduce((s, p) => {
        return (s + p.exercises)
    }, 0)

    return(
        <p>Number of exercises {sum}</p>
    )
}

const Part = ({parts}) => {
    return (
        <div>
            {parts.map(course =>
                <li key={course.id}>
                    {course.name} {course.exercises}
                </li>
            )}
        </div>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            <ul>
                <Part parts={course.parts} />
            </ul>
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 19,
                id: 5
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))