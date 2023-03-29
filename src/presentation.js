import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

function Presentation() {
  const [persons, setPersons] = useState([]);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [loopRecent, setLoopRecent] = useState(true);
  const [fetchRecent, setFetchRecent] = useState(false);

  useEffect(() => {
    const inviteesRef = ref(db, "invitees");
    const unsubscribe = onValue(inviteesRef, (snapshot) => {
      const inviteesObject = snapshot.val();
      const inviteesArray = Object.values(inviteesObject)
        .filter((invitee) => invitee.status === true)
        .sort((a, b) => b.date - a.date);
      setPersons(inviteesArray);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval;
    if (persons.length > 0) {
      interval = setInterval(() => {
        setCurrentPersonIndex((index) =>
          index === persons.length - 1 ? 0 : index + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [persons]);

  useEffect(() => {
    const allInviteesRef = ref(db, "invitees");
    const fetchAllInvitees = () => {
      const unsubscribe = onValue(allInviteesRef, (snapshot) => {
        const inviteesObject = snapshot.val();
        const inviteesArray = Object.values(inviteesObject)
          .filter((invitee) => invitee.status === true)
          .sort((a, b) => b.date - a.date);
        setPersons(inviteesArray);
        setCurrentPersonIndex(0);
      });
      return () => unsubscribe();
    };
  
    const fetchLastThreeInvitees = () => {
      const lastThreeInviteesRef = ref(db, "invitees");
      const unsubscribe = onValue(lastThreeInviteesRef, (snapshot) => {
        const inviteesObject = snapshot.val();
        const inviteesArray = Object.values(inviteesObject)
          .filter((invitee) => invitee.status === true)
          .sort((a, b) => b.date - a.date)
          .slice(-30)
          .reverse();
        setPersons(inviteesArray);
        setCurrentPersonIndex(0);
      });
      return () => unsubscribe();
    };
  
    const timeout = setTimeout(() => {
        if (fetchRecent) {
          fetchLastThreeInvitees();
          console.log("Invite Three");
        } else {
          fetchAllInvitees();
          console.log("InviteAll");
        }
        //setLoopRecent((prevLoopRecent) => !prevLoopRecent);
      }, 2 * 60 * 1000);
    
      const resetFetchRecentTimeout = setTimeout(() => {
        setFetchRecent(false);
      }, 5 * 60 * 1000); // 5 minutes
    
      return () => {
        clearTimeout(timeout);
        clearTimeout(resetFetchRecentTimeout);
      };
    }, [fetchRecent]);
  

  useEffect(() => {
    const inviteesRef = ref(db, "invitees");
    const unsubscribe = onValue(inviteesRef, (snapshot) => {
      const inviteesObject = snapshot.val();

      const inviteesArray = Object.values(inviteesObject)
        .filter((invitee) => invitee.status === true)
        .sort((a, b) => b.date - a.date)
        .slice(-30)
        .reverse();
      setPersons(inviteesArray);
      setCurrentPersonIndex(0);
      setFetchRecent(true)
    });
    return () => unsubscribe();
  }, []);

  const currentPerson = persons[currentPersonIndex];
  const backgroundColor =
    currentPerson && currentPerson.color === "red" ? "#DD0101" : "#1E196A";

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [backgroundColor]);

//   const handleToggleFetchRecent = () => {
//     setFetchRecent((prevFetchRecent) => !prevFetchRecent);
//   };

  

  const logoSrc =
    currentPerson && currentPerson.color === "red"
      ? "/spmga.jpg"
      : "/mnkre.jpg";

  return (
    <div style={{ textAlign: "center" }}>
      <img style={{ marginTop:"20px" }} width="250" src={logoSrc} alt="Logo" />

      {currentPerson ? (
        <>
          <p  style={{ color: "white", fontSize: "70px" }}>Welcome</p>

          <div>
            <h1 style={{ color: "white", fontSize: "100px" }}>
              {currentPerson.Name}
            </h1>
            <h1 style={{ color: "white", fontSize: "60px" }}>
              {currentPerson.Company}
            </h1>
          </div>
        </>
      ) : (
        <p style={{ color: "white", fontSize: "70px" }}>Welcome</p>
      )}
      {/* <button onClick={handleToggleFetchRecent}>
      {fetchRecent ? "Show all invitees" : "Show last three invitees"}
    </button> */}
    </div>
  );
}

export default Presentation;
