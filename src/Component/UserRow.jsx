import React from "react";

// have made UserRow Component here so that if the website needed another table row , we can use the same component again
const UserRow = ({ name, gender, role, maritalStatus, id }) => {
  return (
    <>
     <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{role}</td>
      <td>{maritalStatus ? "married" : "unmarried"}</td>
     </tr>
    </>
  );
};
export { UserRow };
