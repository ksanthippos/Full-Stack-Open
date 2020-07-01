import Person from "./Person";
import React from "react";
import AddPerson from "./AddPerson";

const Display = ( {searchNull, persons, setPersons, namesToShow,
                      setNotification, notificationClass, setNotificationClass}) => {

    if (searchNull) {
        return(
            <div>
                <ul>
                    {persons.map((person, i) =>
                        <Person
                            key={i}
                            person={person}
                            persons={persons}
                            setPersons={setPersons}
                            setNotification={setNotification}
                            notificationClass={notificationClass}
                            setNotificationClass={setNotificationClass}
                        />
                    )}
                </ul>
            </div>
        )
    }
    else {
        return(
            <div>
                <ul>
                    {namesToShow.map((person, i) =>
                        <Person
                            key={i}
                            person={person}
                            persons={persons}
                            setPersons={setPersons}
                            setNotification={setNotification}
                            notificationClass={notificationClass}
                            setNotificationClass={setNotificationClass}
                        />
                    )}
                </ul>
            </div>
        )
    }

}

export default Display