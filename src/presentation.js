import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import  db  from "./firebase";

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
    currentPerson && currentPerson.color === "red" ? "#DD0101" : "#292667";

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
      ? "https://mnkre.com/wp-content/uploads/2024/04/Specialty_MGA_UK_logo-removebg-preview.png"
      : "https://mnkre.com/wp-content/uploads/2022/04/mnk-logo.png";

  const shardImage =
    currentPerson && currentPerson.color === "red"
        ? "https://mnkre.com/wp-content/uploads/2024/02/smga-shard-1.png"
        : "https://mnkre.com/wp-content/uploads/2024/04/shard-and-clouds-image-1-e1712069200251.png";
 
  // return (
  //   <div className="container">
  //     <img align="left" className="mt-2 mb-0" width="250" src={logoSrc} alt="Logo" />
  //     <div className="row justify-content-center mt-5" >
  //       <div className="col-lg-6 col-md-8 col-sm-10 col-12 text-center" style={{marginTop:"100px", marginRight:'200px'}}>
  //         <div>
  //           {currentPerson ? (
  //             <>
  //               <p className="text-white mt-5 display-4">Welcome</p>
  //               <div>
  //                 <h1 className="text-white text-capitalize display-3 "  style={{ fontWeight:"bold" }}>
  //                   {currentPerson.Name}
  //                 </h1>
  //                 <h1 className="text-white text-capitalize mt-3 display-3">
  //                   {currentPerson.Company}
  //                 </h1>
  //               </div>
                
  //             </>
  //           ) : (
  //             <p className="text-white display-4">Welcome</p>
  //           )}
           
  //         </div>
          
  //       </div>
  //       <img align="" border="0" src={shardImage} alt="" title=""  width="100%" style={{marginRight:'0px'}}/>
  //     </div>
  
      
  //   </div>
  // );

  return (
    <div className="container" style={{ position: 'relative', minHeight: '100vh' }}>
      <img align="left" className="mt-2 mb-0" width="250" src={logoSrc} alt="Logo" />
      <div className="row justify-content-center mt-5" >
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 text-center" style={{ marginTop: "100px", marginRight: '200px' }}>
          <div>
            {currentPerson ? (
              <>
                <p className="text-white mt-5 display-4">Welcome</p>
                <div>
                  <h1 className="text-white text-capitalize display-3 " style={{ fontWeight: "bold" }}>
                    {currentPerson.Name} 
                  </h1>
                  <h1 className="text-white text-capitalize mt-2 display-3">
                    {currentPerson.Company}
                  </h1>
                </div>
  
              </>
            ) : (
                <p className="text-white display-4">Welcome</p>
              )}
  
          </div>
  
        </div>
      </div>
      <img 
        src={shardImage} 
        alt="" 
        title="" 
        style={{ 
          position: 'absolute', 
          bottom: '0', 
          top:'40%',
          left: '0', 
          width: '90%', 
          height:'100',
          zIndex: '-1' 
        }} 
      />
    </div>
  );
  

  
  
}
// style={{ fontWeight: "bold" , fontSize: currentPerson.Name.length > 16 ?? '10px' }}
export default Presentation;
// <img  className="mt-5"
// src={shardImage} alt="" title="" width="870" style={{marignTop:'200px'}} />