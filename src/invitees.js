// import React, { useState, useEffect } from "react";
// import { ref, onValue, update } from "firebase/database";
// import { db } from "./firebase";
// import DataTable from "react-data-table-component";
// import "./Invitees.css";

// const Invitees = () => {
//   const [invitees, setInvitees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [attendingCount, setAttendingCount] = useState(0);

//   useEffect(() => {
//     const database = db;
//     const inviteesRef = ref(database, "invitees");

//     onValue(inviteesRef, (snapshot) => {
//       const inviteesData = snapshot.val();
//       if (inviteesData) {
//         const inviteesArray = Object.keys(inviteesData).map((key) => ({
//           id: key,
//           ...inviteesData[key],
//         }));
//         setInvitees(inviteesArray);
//         const attendingCount = inviteesArray.filter(
//           (invitee) => invitee.status === true
//         ).length;
//         setAttendingCount(attendingCount);
//       } else {
//         setInvitees([]);
//       }
//     });
//   }, []);

//   const handleStatusChange = async (inviteeId) => {
//     try {
//       const database = db;
//       const inviteeRef = ref(database, `invitees/${inviteeId}`); // await update(inviteeRef, { status: true }); // Wait for 5 minutes (300000 milliseconds) before updating the created_at property
//       await update(inviteeRef, {
//         status: 'pending',
//         created_at: 0,
//       });
//       setTimeout(async () => {
//         await update(inviteeRef, {
//           status: true,
//           created_at: new Date().getTime(),
//         });
//       }, 5 * 60 * 1000);

//       setAttendingCount(attendingCount + 1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleStatusChangeFalse = async (inviteeId) => {
//     try {
//       const database = db;
//       const inviteeRef = ref(database, `invitees/${inviteeId}`);
//       await update(inviteeRef, {
//         status: false,
//         created_at: 0,
//       }); //toTimeString()

//       // Update the attending count when a status is changed
//       setAttendingCount(attendingCount - 1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const columns = [
//     {
//       name: "Invitee ID",
//       selector: (row) => row.uuid,
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.Name,
//       sortable: true,
//     },
//     {
//       name: "Company Name",
//       selector: (row) => row.Company,
//       sortable: true,
//     },
//     {
//       name: "Color",
//       selector: (row) => row.color,
//       sortable: true,
//     },
//     {
//       name: "Date",
//       selector: (row) => row.created_at,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => (row.status ? "Attending" : "Not Attending"),
//       sortable: true,
//     },
//     {
//       name: "Action",
//       cell: (row) =>
//         row.status === false && (
//           <button onClick={() => handleStatusChange(row.id)}>Attending</button>
//         ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//     {
//       name: "Action",
//       cell: (row) =>
//         row.status === true && (
//           <button onClick={() => handleStatusChangeFalse(row.id)}>
//             Not Attending
//           </button>
//         ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   //   const customStyles = {
//   //     header: {
//   //       style: {
//   //         backgroundColor: "#00bfff",
//   //         color: "white",
//   //         fontSize: "16px",
//   //         fontWeight: "bold",
//   //       },
//   //     },
//   //   };

//   const filteredInvitees = invitees.filter(
//     (invitee) =>
//       invitee.uuid
//         .toLowerCase()
//         .toString()
//         .includes(searchTerm.toLowerCase().toString()) ||
//       invitee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       //invitee.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       //   invitee.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (invitee.status ? "attending" : "not attending")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container">
//       <div
//         className="card mt-4 mb-4 "
//         style={{ width: "25rem", height: "5rem" }}
//       >
//         <div className="card-body ">
//           <h2 className="card-title mb-4">
//             {attendingCount} invitees are attending
//           </h2>
//         </div>
//       </div>
//       <input
//         type="text"
//         placeholder="Search..."
//         onChange={(event) => setSearchTerm(event.target.value)}
//       />
//       <DataTable
//         columns={columns}
//         data={filteredInvitees}
//         noDataComponent="No invitees found"
//         pagination
//       />
//     </div>
//   );
// };

// export default Invitees;

// // import React, { useState, useEffect } from "react";
// // import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
// // import { db } from "./firebase";
// // import DataTable from "react-data-table-component";
// // import "./Invitees.css";

// // const Invitees = () => {
// //     const [invitees, setInvitees] = useState([]);
// //     const [searchTerm, setSearchTerm] = useState("");

// //     useEffect(() => {
// //         const inviteeRef = collection(db, "invitees");
// //         const unsubscribe = onSnapshot(inviteeRef, (snapshot) => {
// //             const inviteesData = snapshot.docs.map((doc) => {
// //                 return { id: doc.id, ...doc.data() };
// //             });
// //             setInvitees(inviteesData);
// //         });

// //         return () => unsubscribe();
// //     }, []);

// //     const handleStatusChange = async (inviteeId) => {
// //         try {
// //             const inviteeDocRef = doc(db, "invitees", inviteeId);
// //             await updateDoc(inviteeDocRef, { status: true });
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };

// //     const columns = [
// //         {
// //             name: "First Name",
// //             selector: (row) => row.first_name,
// //             sortable: true,
// //         },
// //         {
// //             name: "Last Name",
// //             selector: (row) => row.last_name,
// //             sortable: true,
// //         },
// //         {
// //             name: "Company Name",
// //             selector: (row) => row.company_name,
// //             sortable: true,
// //         },
// //         {
// //             name: "Color",
// //             selector: (row) => row.color,
// //             sortable: true,
// //         },
// //         {
// //             name: "Status",
// //             selector: (row) => row.status ? "Attending" : "Not Attending",
// //             sortable: true,
// //         },
// //         {
// //             name: "Action",
// //             cell: (row) => (
// //                 row.status === false && (
// //                     <button onClick={() => handleStatusChange(row.id)}>Change Status</button>
// //                 )
// //             ),
// //             ignoreRowClick: true,
// //             allowOverflow: true,
// //             button: true,
// //         },
// //     ];

// //     const customStyles = {
// //         header: {
// //             style: {
// //                 backgroundColor: "#00bfff",
// //                 color: "white",
// //                 fontSize: "16px",
// //                 fontWeight: "bold",
// //             },
// //         },
// //     };

// //     const filteredInvitees = invitees.filter(
// //         (invitee) =>
// //             invitee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             invitee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             invitee.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             invitee.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             (invitee.status ? "attending" : "not attending")
// //                 .toLowerCase()
// //                 .includes(searchTerm.toLowerCase())
// //     );

// //     return (
// //         <div className="container">
// //             <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 onChange={(event) => setSearchTerm(event.target.value)}
// //             />
// //             <DataTable
// //                 columns={columns}
// //                 data={filteredInvitees}
// //                 noDataComponent="No invitees found"
// //                 pagination
// //             />
// //         </div>
// //     );
// // };

// // export default Invitees;
