import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

function Presentation() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const personsRef = ref(db, "invitees");
    const unsubscribe = onValue(personsRef, (snapshot) => {
      const personsObject = snapshot.val();
      const personsArray = Object.values(personsObject)
        .filter((person) => person.status === true)
        .sort((a, b) => b.date - a.date)
        .slice(0, 2);
      const randomIndex = Math.floor(Math.random() * personsArray.length);
      setPerson(personsArray[randomIndex]);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval;
    if (person) {
      interval = setInterval(() => {
        const personsRef = ref(db, "invitees");
        const unsubscribe = onValue(personsRef, (snapshot) => {
          const personsObject = snapshot.val();
          const personsArray = Object.values(personsObject).filter(
            (person) => person.status === true
          ).sort((a, b) => b.date - a.date)
          .slice(0, 2);
          const randomIndex = Math.floor(Math.random() * personsArray.length);
          setPerson(personsArray[randomIndex]);
        });
        return () => unsubscribe();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [person]);

    const backgroundColor = person && person.color === "red" ? "#DD0101" : "#1E196A";

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, [backgroundColor]);

    const logoSrc = person && person.color === "red" ? "/spmga.jpg" : "/mnkre.jpg";

    return (
        <div style={{ textAlign: "center" }}>
            <img  width="250" src={logoSrc} alt="Logo" />
            
            {person ? (
                <>
            <p style={{ color: 'white', fontSize: '70px' }}>Welcome</p>
            
                <div>
                    <h1 style={{ color: 'white', fontSize: '120px'  }}>{person.first_name} {person.last_name},</h1>
                    <h1 style={{ color: 'white', fontSize: '120px' }}>{person.company_name}</h1>
                </div>
                </>
            ) : (
                <p style={{ color: 'white', fontSize: '70px' }}>Dummy Text</p>
            )}
        </div>
    );
}

export default Presentation;
