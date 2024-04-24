// import React, { useState, useEffect } from "react";
// import { ref, onValue } from "firebase/database";
// import  db  from "./firebase";
// import smgaImage from './smga-shard.png';
// import mnkImage from './mnkre-shard.png';
// function Presentation() {
//   const [persons, setPersons] = useState([]);
//   const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
//   const [loopRecent, setLoopRecent] = useState(true);
//   const [fetchRecent, setFetchRecent] = useState(false);

//   useEffect(() => {
//     const inviteesRef = ref(db, "invitees");
//     const unsubscribe = onValue(inviteesRef, (snapshot) => {
//       const inviteesObject = snapshot.val();
//       const inviteesArray = Object.values(inviteesObject)
//         .filter((invitee) => invitee.status === true)
//         .sort((a, b) => b.date - a.date);
//       setPersons(inviteesArray);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (persons.length > 0) {
//       interval = setInterval(() => {
//         setCurrentPersonIndex((index) =>
//           index === persons.length - 1 ? 0 : index + 1
//         );
//       }, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [persons]);

//   useEffect(() => {
//     const allInviteesRef = ref(db, "invitees");
//     const fetchAllInvitees = () => {
//       const unsubscribe = onValue(allInviteesRef, (snapshot) => {
//         const inviteesObject = snapshot.val();
//         const inviteesArray = Object.values(inviteesObject)
//           .filter((invitee) => invitee.status === true)
//           .sort((a, b) => b.date - a.date);
//         setPersons(inviteesArray);
//         setCurrentPersonIndex(0);
//       });
//       return () => unsubscribe();
//     };
  
//     const fetchLastThreeInvitees = () => {
//       const lastThreeInviteesRef = ref(db, "invitees");
//       const unsubscribe = onValue(lastThreeInviteesRef, (snapshot) => {
//         const inviteesObject = snapshot.val();
//         const inviteesArray = Object.values(inviteesObject)
//           .filter((invitee) => invitee.status === true)
//           .sort((a, b) => b.date - a.date)
//           .slice(-30)
//           .reverse();
//         setPersons(inviteesArray);
//         setCurrentPersonIndex(0);
//       });
//       return () => unsubscribe();
//     };
  
//     const timeout = setTimeout(() => {
//         if (fetchRecent) {
//           fetchLastThreeInvitees();
//           console.log("Invite Three");
//         } else {
//           fetchAllInvitees();
//           console.log("InviteAll");
//         }
//         //setLoopRecent((prevLoopRecent) => !prevLoopRecent);
//       }, 2 * 60 * 1000);
    
//       const resetFetchRecentTimeout = setTimeout(() => {
//         setFetchRecent(false);
//       }, 5 * 60 * 1000); // 5 minutes
    
//       return () => {
//         clearTimeout(timeout);
//         clearTimeout(resetFetchRecentTimeout);
//       };
//     }, [fetchRecent]);
  

//   useEffect(() => {
//     const inviteesRef = ref(db, "invitees");
//     const unsubscribe = onValue(inviteesRef, (snapshot) => {
//       const inviteesObject = snapshot.val();

//       const inviteesArray = Object.values(inviteesObject)
//         .filter((invitee) => invitee.status === true)
//         .sort((a, b) => b.date - a.date)
//         .slice(-30)
//         .reverse();
//       setPersons(inviteesArray);
//       setCurrentPersonIndex(0);
//       setFetchRecent(true)
//     });
//     return () => unsubscribe();
//   }, []);

//   const currentPerson = persons[currentPersonIndex];
//   const backgroundColor =
//     currentPerson && currentPerson.color === "red" ? "#DD0101" : "#292667";

//   useEffect(() => {
//     document.body.style.backgroundColor = backgroundColor;
//     return () => {
//       document.body.style.backgroundColor = null;
//     };
//   }, [backgroundColor]);

// //   const handleToggleFetchRecent = () => {
// //     setFetchRecent((prevFetchRecent) => !prevFetchRecent);
// //   };

// useEffect(() => {
//   // Disable scrolling on mount
//   document.body.style.overflow = 'hidden';

//   // Re-enable scrolling when component unmounts
//   return () => {
//     document.body.style.overflow = 'visible';
//   };
  
// }, [backgroundColor]);

//   const logoSrc =
//     currentPerson && currentPerson.color === "red"
//       ? "https://mnkre.com/wp-content/uploads/2024/04/Specialty_MGA_UK_logo-removebg-preview.png"
//       : "https://mnkre.com/wp-content/uploads/2022/04/mnk-logo.png";

//   const shardImage =
//     currentPerson && currentPerson.color === "red"
//         ? smgaImage
//         : mnkImage;

//   return (
//     <div className="container" style={{ position: 'relative', minHeight: '100vh' }}>
//   <img align="left" className="mt-2 mb-0" width="250" src={logoSrc} alt="Logo" />
//   <div className="row mt-5 justify-content-center">
//     <div className="col-lg-12 col-md-8 col-sm-10 col-12 align-self-center text-center" style={{ marginRight: '28%' }}>
//       <div>
//         {currentPerson ? (
//           <>
//             <p className="text-white mt-5 display-3 text-uppercase">Welcome</p>
//             <div style={{ maxWidth: '100%' }}> {/* Set maximum width to 100% */}
//               <h3 className="text-white text-uppercase display-4" style={{ fontWeight: "bold", maxWidth: '100%' }}> {/* Set maximum width to 100% */}
//                 {currentPerson.Name} 
//               </h3>
//               <h3 className="text-white text-uppercase mt-2 display-3" style={{ maxWidth: '100%' }}> {/* Set maximum width to 100% */}
//                 {currentPerson.Company}
//               </h3>
//             </div>
//           </>
//         ) : (
//           <p className="text-white display-4">Welcome</p>
//         )}
//       </div>
//     </div>
//   </div>
//   <img 
//     src={shardImage}
//     alt="" 
//     title="" 
//     style={{ 
//       position: 'absolute', 
//       bottom: '0', 
//       left: '0', 
//       width: '100%',
//       height: '50%',  /* Use full width of the screen */
//       zIndex: '-1' 
//     }} 
//   />
// </div>
//   );
// }
// export default Presentation;


import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import  db  from "./firebase";
import smgaImage from './smga-shard.png';
import mnkImage from './mnkre-shard.png';
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
 
useEffect(() => {
  // Disable scrolling on mount
  document.body.style.overflow = 'hidden';
 
  // Re-enable scrolling when component unmounts
  return () => {
    document.body.style.overflow = 'visible';
  };
 
}, [backgroundColor]);
 
  const logoSrc =
    currentPerson && currentPerson.color === "red"
      ? "https://mnkre.com/wp-content/uploads/2024/04/Specialty_MGA_UK_logo-removebg-preview.png"
      : "https://mnkre.com/wp-content/uploads/2022/04/mnk-logo.png";
 
  const shardImage =
    currentPerson && currentPerson.color === "red"
        ? smgaImage
        : mnkImage;
console.log(shardImage);
  // const shardImage = currentPerson && currentPerson.color === "red"
  //       ? "
  //       : "https://mnkre.com/wp-content/uploads/2024/04/shard-and-clouds-image-2.png";
//   return (
//     <div className="container" style={{ position: 'relative', minHeight: '100vh' }}>
//   <img align="left" className="mt-2 mb-0" width="250" src={logoSrc} alt="Logo" />
//   <div className="row mt-5 justify-content-center">
//     <div className="col-lg-12 col-md-8 col-sm-10 col-12 align-self-center text-center" style={{ marginRight: '26%' }}>
//       <div>
//         {currentPerson ? (
//           <>
//             <p className="text-white mt-5 display-3 text-uppercase">Welcome</p>
//             <div style={{ maxWidth: '100%' }}> {/* Set maximum width to 100% */}
//               <h3 className="text-white text-uppercase display-4" style={{ fontWeight: "bold", maxWidth: '100%' }}> {/* Set maximum width to 100% */}
//                 {currentPerson.Name}
//               </h3>
//               <h3 className="text-white text-uppercase mt-2 display-3" style={{ maxWidth: '100%' }}> {/* Set maximum width to 100% */}
//                 {currentPerson.Company}
//               </h3>
//             </div>
//           </>
//         ) 
//         : (
//           <h2 className="text-white display-1 text-uppercase " style={{marginTop:'170px'}} >Welcome</h2>
//         )
//       }
//       </div>
//     </div>
//   </div>
//   <img
//     src={shardImage}
//     alt=""
//     title=""
//     style={{
//       position: 'absolute',
//       bottom: '0',
//       left: '0',
//       width: '100%',
//       height: '54%',  /* Use full width of the screen */
//       zIndex: '-1'
//     }}
 
 
//   />
 
 
// </div>
 
 
//   );
return (
  <div className="container" style={{ position: 'relative', minHeight: '100vh' }}>
<img align="left" className="mt-2 mb-0" width="250" src={logoSrc} alt="Logo" />
<div className="row mt-5 justify-content-center">
  <div className="col-lg-12 col-md-8 col-sm-10 col-12 align-self-center text-center" style={{ marginRight: '28%' }}>
    <div>
      {currentPerson ? (
        <>
          <p className="text-white mt-5 display-3 text-uppercase">Welcome</p>
          <div style={{ maxWidth: '100%' }}> {/* Set maximum width to 100% */}
            <h1 className="text-white text-uppercase display-4" style={{ fontWeight: "bold", maxWidth: '100%' }}> {/* Set maximum width to 100% */}
              {currentPerson.Name} 
            </h1>
            <h1 className="text-white text-uppercase mt-2 display-3" style={{ maxWidth: '100%' }}> {/* Set maximum width to 100% */}
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
    left: '0', 
    width: '100%',
    height: '58%',  /* Use full width of the screen */
    zIndex: '-1' 
  }} 


/>


</div>


);
 
}
export default Presentation;