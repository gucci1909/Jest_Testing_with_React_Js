// importing useReducer for managing states in a proper manner
import { useReducer, useState } from "react";
import "./App.css";
// importing actions objects for doing task according to the dispatch action and payload
import {
  GenderValue,
  MaritalValue,
  NameValue,
  RoleValue,
} from "./Component/action";
// importing UserRow Components for reusing it inside a map function
import { UserRow } from "./Component/UserRow";

// setting initialState from which name, gender, role and maritalStatus input value can be manage
const initialState = {
  name: "",
  gender: "",
  role: "",
  maritalStatus: false,
};

// making a reducer which accept state and action from dispatch and act according to the action type
const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "role":
      return { ...state, role: action.payload };
    case "maritalStatus":
      return { ...state, maritalStatus: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

// main App Component
function App() {
  // using useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // setting State
  const [form, setForm] = useState([]);
  // Dispatching for resetting the state
  const handleReset = () => {
    dispatch({ type: "reset" });
  };
  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputBox = !Object.values(state).every((res) => res === "");
    if (inputBox) {
      const Data = (form) => [...form, state];
      setForm(Data);
      handleReset();
    }
  };
  // console.log(form);
  return (
    // using different data-testid in inputs for performing test cases in App.test.js
    <div className="App">
      <div>
        <h1>Form of User</h1>
        <div className="form-wrapper" data-testid="form-wrapper">
          {/* using form tag here for submission of name, gender, role and marital Status , which will execute in the button below */}
          <form data-testid="form-element" onSubmit={handleSubmit}>
            <div className="name-wrapper" data-testid="name-wrapper">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={state.name}
                 // using onChange for event.target.value . So, that state can be change
                onChange={(e) => {
                  dispatch(NameValue(e.target.value));
                }}
              />
            </div>
            <div className="gender-wrapper" data-testid="gender-wrapper">
              <label>Gender</label>
              <select
                name="gender"
                data-testid="gender-select"
                value={state.gender}
                // using onChange for event.target.value . So, that state can be change
                onChange={(e) => dispatch(GenderValue(e.target.value))}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>
          
            <div className="role-wrapper" data-testid="role-wrapper">
              <label>Role</label>
              <select
                name="role"
                data-testid="role-select"
                value={state.role}
                 // using onChange for event.target.value . So, that state can be change
                onChange={(e) => dispatch(RoleValue(e.target.value))}
              >
                <option value="FrontEnd Developer">FrontEnd Developer</option>
                <option value="BackEnd Developer">BackEnd Developer</option>
                <option value="FullStack Developer">FullStack Developer</option>
              </select>
            </div>
            <div
              className="marital-status-wrapper"
              data-testid="marital-status-wrapper"
            >
              <legend>Martial Status</legend>
              <div>
                <input
                  type={"checkbox"}
                  name="maritalStatus"
                  checked={state.maritalStatus}
                   // using onChange for event.target.checked . So, that state can be change but here there is input for checked values
                  onChange={(e) => dispatch(MaritalValue(e.target.checked))}
                />
                <label>Married</label>
              </div>
            </div>
            <div>
              {/* onSubmit will work here */}
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
        {form.length === 0 ? (
          <h2 data-testid="no-user-container"> no users found </h2>
        ) : (
          // Making Table for checking test cases in App.test.js
          <table>
            <thead>
              <tr>
                <td> S.No</td>
                <td> Users </td>
                <td> Gender </td>
                <td> Role </td>
                <td> Marital Status</td>
              </tr>
            </thead>
            <tbody>
              {form.map((item, i) => (
                // have made UserRow Component here so that if the website needed another table row , we can use the same component again
                <UserRow
                  key={item.id}
                  id={i + 1}
                  name={item.name}
                  gender={item.gender}
                  role={item.role}
                  maritalStatus={item.maritalStatus}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Exporting app to index.js
export default App;
