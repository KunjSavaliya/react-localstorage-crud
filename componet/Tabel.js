import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Show() {
  const [EditData, setEditData] = useState([]);

  const [currentpage, setCurrentpage] = useState(0);
  const [postperpage] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setEditData(data);
    console.log(data);
  }, []);

  //pagination
  const postPerPage = 3;
  const indexOfLastpost = currentpage * postperpage;
  
  const currentposts = EditData.slice(
    indexOfLastpost,
    indexOfLastpost + postPerPage
  );

 

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(EditData.length / postPerPage); i++) {
    pageNumber.push(i);
  }
  const pageCount = Math.ceil(EditData.length / postPerPage);
  const changePage = ({ selected }) => {
    setCurrentpage(selected);
  };
  

  //delete
  const deleteUser = (i) => {
    
    const EditData = JSON.parse(localStorage.getItem("user"));
    EditData.splice(i, 1);
    setEditData(EditData);

    localStorage.setItem("user", JSON.stringify(EditData));
  };

  //edit
  const EditUser = (index) => {
    console.log(currentposts[index]);

    navigate(`/Add/${index}`);
  };

  

//saerch
  const serch = () => {
    let filter = document.getElementById("serch").value.toUpperCase();
    let table = document.getElementById("tab");

    let tr = table.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];

      if (td) {
        let text = td.textContent || td.innerHTML;
        if (text.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  return (
    <>
      <label style={{ fontWeight: "bold" }}>Search : </label>
      <input
        id="serch"
        onKeyUp={serch}
        className="serch"
        placeholder="Search...."
      ></input>

      <table id="tab">
        <thead>
          <tr>
            <th>F Name </th>
            <th>Email id </th>
            <th>Mobile no </th>

            <th>Hobby</th>
            <th>Gender</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {(currentposts || []).map((u, i) => (
            <tr>
              {/* <td key={u.id}> </td> */}
              <td style={{ fontWeight: "bold" }}>{u.name}</td>
              <td style={{ fontWeight: "bold" }}>{u.email}</td>
              <td style={{ fontWeight: "bold" }}>{u.mobileno}</td>
              <td style={{ fontWeight: "bold" }}>{u.hobby}</td>
              <td style={{ fontWeight: "bold" }}>{u.gender}</td>
              <td>
                <button
                  style={{ fontWeight: "bold" }}
                  onClick={() => EditUser(i)}
                  // onClick={() => { EditUser(currentposts.id) }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  style={{ fontWeight: "bold" }}
                  onClick={() => deleteUser(i)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <div>
          <ReactPaginate
            className="page"
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </table>
    </>
  );
}
export default Show;

// onClick={() => { editData(user.id) }}
