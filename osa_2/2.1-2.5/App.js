import React from 'react';
import Courses from "./components/Courses";

// OSA 2
// KURSSITIEDOT
// tehtävät 2.1-2.5

const MainHeader = ({title}) => <div><h1>{title}</h1></div>

const App = () => {
    const courses = [
        {
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
                    exercises: 14,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js basics',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'Extra',
                    exercises: 5,
                    id: 3
                }
            ]
        }
    ]

    return (
        <div>
            <MainHeader title='Web development curriculum'/>
            <Courses courses={courses} />
        </div>
    )
}

export default App