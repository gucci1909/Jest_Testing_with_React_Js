import { useReducer, useState } from "react";
import "./App.css";
import {
  GenderValue,
  MaritalValue,
  NameValue,
  RoleValue,
} from "./Component/action";
import { UserRow } from "./Component/UserRow";

const initialState = {
  name: "",
  gender: "",
  role: "",
  maritalStatus: false,
};

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, setForm] = useState([]);
  const handleReset = () => {
    dispatch({ type: "reset" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputBox = !Object.values(state).every((res) => res === "");
    if (inputBox) {
      const Data = (form) => [...form, state];
      setForm(Data);
      handleReset();
    }
  };
  console.log(form);
  return (
    <div className="App">
      <div>
        <h1>Form of User</h1>
        <div className="form-wrapper" data-testid="form-wrapper">
          <form data-testid="form-element" onSubmit={handleSubmit}>
            <div className="name-wrapper" data-testid="name-wrapper">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={state.name}
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
                  onChange={(e) => dispatch(MaritalValue(e.target.checked))}
                />
                <label>Married</label>
              </div>
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
        {form.length === 0 ? (
          <h2 data-testid="no-user-container"> no users found </h2>
        ) : (
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

export default App;
