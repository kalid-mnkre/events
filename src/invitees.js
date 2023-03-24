import React, { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "./firebase";
import DataTable from "react-data-table-component";
import "./Invitees.css";

const Invitees = () => {
  const [invitees, setInvitees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const database = db;
    const inviteesRef = ref(database, "invitees");

    onValue(inviteesRef, (snapshot) => {
      const inviteesData = snapshot.val();
      if (inviteesData) {
        const inviteesArray = Object.keys(inviteesData).map((key) => ({
          id: key,
          ...inviteesData[key],
        }));
        setInvitees(inviteesArray);
        console.log(inviteesArray);
      } else {
        setInvitees([]);
      }
    });
  }, []);

  const handleStatusChange = async (inviteeId) => {
    try {
      const database = db;
      const inviteeRef = ref(database, `invitees/${inviteeId}`);
      await update(inviteeRef, { status: true, created_at: new Date() });
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      name: "Invitee ID",
      selector: (row) => row.uuid,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Attending" : "Not Attending"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) =>
        row.status === false && (
          <button onClick={() => handleStatusChange(row.id)}>
            Change Status
          </button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  //   const customStyles = {
  //     header: {
  //       style: {
  //         backgroundColor: "#00bfff",
  //         color: "white",
  //         fontSize: "16px",
  //         fontWeight: "bold",
  //       },
  //     },
  //   };

  const filteredInvitees = invitees.filter(
    (invitee) =>
      invitee.uuid.toString().includes(searchTerm.toLowerCase()) ||
      invitee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitee.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitee.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invitee.status ? "attending" : "not attending")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredInvitees}
        noDataComponent="No invitees found"
        pagination
      />
    </div>
  );
};

export default Invitees;

// import React, { useState, useEffect } from "react";
// import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
// import { db } from "./firebase";
// import DataTable from "react-data-table-component";
// import "./Invitees.css";

// const Invitees = () => {
//     const [invitees, setInvitees] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         const inviteeRef = collection(db, "invitees");
//         const unsubscribe = onSnapshot(inviteeRef, (snapshot) => {
//             const inviteesData = snapshot.docs.map((doc) => {
//                 return { id: doc.id, ...doc.data() };
//             });
//             setInvitees(inviteesData);
//         });

//         return () => unsubscribe();
//     }, []);

//     const handleStatusChange = async (inviteeId) => {
//         try {
//             const inviteeDocRef = doc(db, "invitees", inviteeId);
//             await updateDoc(inviteeDocRef, { status: true });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const columns = [
//         {
//             name: "First Name",
//             selector: (row) => row.first_name,
//             sortable: true,
//         },
//         {
//             name: "Last Name",
//             selector: (row) => row.last_name,
//             sortable: true,
//         },
//         {
//             name: "Company Name",
//             selector: (row) => row.company_name,
//             sortable: true,
//         },
//         {
//             name: "Color",
//             selector: (row) => row.color,
//             sortable: true,
//         },
//         {
//             name: "Status",
//             selector: (row) => row.status ? "Attending" : "Not Attending",
//             sortable: true,
//         },
//         {
//             name: "Action",
//             cell: (row) => (
//                 row.status === false && (
//                     <button onClick={() => handleStatusChange(row.id)}>Change Status</button>
//                 )
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//         },
//     ];

//     const customStyles = {
//         header: {
//             style: {
//                 backgroundColor: "#00bfff",
//                 color: "white",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//             },
//         },
//     };

//     const filteredInvitees = invitees.filter(
//         (invitee) =>
//             invitee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             invitee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             invitee.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             invitee.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (invitee.status ? "attending" : "not attending")
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="container">
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 onChange={(event) => setSearchTerm(event.target.value)}
//             />
//             <DataTable
//                 columns={columns}
//                 data={filteredInvitees}
//                 noDataComponent="No invitees found"
//                 pagination
//             />
//         </div>
//     );
// };

// export default Invitees;
