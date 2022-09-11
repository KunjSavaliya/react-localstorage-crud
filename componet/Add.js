import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Add(props) {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    name: "",
    email: "",
    mobileno: "",
    gender: "",
    hobby: [],
  });



 const { index } = useParams();
  useEffect(() => {
    if (index) {
      let obj= JSON.parse(localStorage.getItem("user"));

      setuser({
        name: obj[index].name,
        email: obj[index].email,
        mobileno: obj[index].mobileno,
        gender: obj[index].gender,
        hobby: obj[index].hobby,
      });
    }
  }, [index]);

  

  const gender = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;
   
    setuser({
      ...user,
      [name]: value,
    });
  };

  const hobby = (e) => {
    let value = user.hobby || [];
    if (e.target.checked) {
      value.push(e.target.value);
    } else {
      value = user.hobby.filter((item) => item !== e.target.value);
    }
    setuser((preState) => ({
      ...preState,
      hobby: value,
    }));
  };

  const [valid, setValid] = useState({
    name: "",
    email: "",
    mobileno: "",
  });

  const SubmitUser = (e) => {
    e.preventDefault();

    if (user.name.trim() === "") {
      setValid(false);
      return;
    } else {
      setValid(true);
    }

    if (user.email.trim() === "") {
      setValid(false);
      return;
    }
    setValid(true);
    if (user.mobileno.trim() === "") {
      setValid(false);
      return;
    }
   

    if (user.gender === " ") 
    alert("Select your Gender")
     

    if (index == null) {
      const input = localStorage.getItem("user");
      const items = (() => {
        return input === null ? [] : JSON.parse(input);
      })();
      if ("") {
        setuser(user);
      } else {
        items.push(user);
        localStorage.setItem("user", JSON.stringify(items));
      }
    } else {
      let newData = JSON.parse(localStorage.getItem("user"));
      
      newData[index].name = user.name;
      newData[index].email = user.email;
      newData[index].mobileno = user.mobileno;
      newData[index].hobby = user.hobby;
      newData[index].gender = user.gender;
      localStorage.setItem("user", JSON.stringify(newData));
    }

    setuser({
      name: "",
      email: "",
      mobileno: "",
      gender: " ",
      hobby: [],
    });

    navigate("/");
  };

  return (
    <>
      <h1 className="crud"> SIMPAL CRUD</h1>
      <div className="form">
        <form onSubmit={SubmitUser}>
          <div className="name">
            <label style={{ fontWeight: "bold","marginLeft":"-99px" }}>F Name : </label><br></br>
             <input style={{borderRadius:"10px",height:"25px"}}
              type="text"
              name="name"
              placeholder="..Ilon musk"
              onChange={(e) =>
                setuser({ ...user, [e.target.name]: e.target.value }) }
              
              value={user.name}/>
            {!valid && <p className="error"> Name</p>}
          </div>

          <br /><br></br>

          <div className="emailid">
            <label style={{ fontWeight: "bold",    "marginLeft":"-99px" }}>Email id : </label><br></br>
            <input style={{borderRadius:"10px",height:"25px"}}
              type="text"
              name="email"
              placeholder="Email@gmail.com"  
              onChange={(e) =>
                setuser({ ...user, [e.target.name]: e.target.value }) }
              value={user.email} />
            {!valid && <p className="error"> Email</p>}
           </div>

          <br/>

          <div className="mobilenum">
            <label style={{ fontWeight: "bold","marginLeft":"-89px" }}> Mobile no: </label><br></br>
            <input style={{borderRadius:"10px",height:"25px"}}
              type="number"
              name="mobileno"
              placeholder="9586874631"
              onChange={(e) =>
                setuser({ ...user, [e.target.name]: e.target.value })}
              value={user.mobileno} />
            {!valid && <p className="error"> Mobilenum</p>}
          </div>

            <div className="hobby">
            <h4>Hobby :</h4>

            <label style={{ fontWeight: "bold" }}> Reading </label>
            <input style={{borderRadius:"10px",height:"25px"}}
              type="checkbox"
              name="hobby"
              value="reading"
              id="reading"
              onChange={hobby}
              checked={user && user.hobby.filter((e) => e === "reading")[0] === "reading" ? true : false}/>

            <label style={{ fontWeight: "bold" }}> Playing </label>
            <input
              type="checkbox"
              name="hobby"
              value="playing"
              id="playing"
              onChange={hobby}
              checked={user && user.hobby.filter((e) => e === "playing")[0] === "playing"? true : false }/>

            <label style={{ fontWeight: "bold" }}> Other </label>
            <input
              type="checkbox"
              name="hobby"
              value="other"
              id="other"
              onChange={hobby}
              checked={ user && user.hobby.filter((e) => e === "other")[0] === "other" ? true : false } />
            
          </div>


          <div className="gender">
            <h4>Gender:</h4>

            <label style={{ fontWeight: "bold" }}>Male</label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={gender}
              checked={user.gender === "male" ? true : false} />

            <label style={{ fontWeight: "bold" }}> Female </label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={gender}
              checked={user.gender === "female" ? true : false} />

            <label style={{ fontWeight: "bold" }}> Other </label>
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={gender}
              checked={user.gender === "other" ? true : false}  />
          </div>

          <br></br>
          <div className="button">
            <button  style={{borderRadius:"10px",height:"40px",width:"100px",fontSize: "1rem", fontWeight: "bold"}}>Submit </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add;

