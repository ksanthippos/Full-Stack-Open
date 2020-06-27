import React from "react";

// En tiedä teinkö tämän väärin, mutta tuntui kivemmalta luoda erillinen komponentti Courses joka kokoaa yksittäiset Courset listaan.
// Tehtävänannossa käskettiin laittaa nimenomaan Course, mutta minulla nyt on Courses ja toivottavasti ei haittaa. Toimii kyllä ainakin

const Courses = ({ courses }) => {
    return(
        <div>
            {courses.map(course =>
                <li key={course.id} style={{ listStyleType: "none" }}>
                    <Course course={course} />
                </li>
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (

        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>

    )
}

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ parts }) => {

    const sum = parts.reduce((s, p) => {
        return (s + p.exercises)
    }, 0)

    /*
    // for-loopilla menisi näin, mutta reduce lienee tehokkaampi ainakin suuremmilla määrillä (?)
    let sum = 0
    for (let i = 0; i < parts.length; i++) {
        sum += parts[i].exercises
    }*/

    return(
        <div>
            <h3>Total of exercises : {sum}</h3>
        </div>
    )
}

const Part = ({ parts }) => {
    // jätin tänne bulletit listaan, koska näytti mielestäni kivemmalta. kurssien listauksessa bulletit poissa
    return (
        <div>
            {parts.map(course =>
                <li key={course.id}>
                    {course.name} : {course.exercises}
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

export default Courses