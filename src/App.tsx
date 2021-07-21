import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser, addAppointment } from "./actions/user";
import ArrayList from "./../data.json";
import Appointment from "./components/Appointment";
import moment from "moment";

function App() {
  const dispatch = useDispatch();
  const usersList = useSelector((state: any) => state.user?.users);
  const appointmentList = useSelector((state: any) => state.user?.appointment);

  const [selectInput, setSelectInput] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(createUser(ArrayList));
  }, [dispatch]);

  const handleAddAppointment = (item: any) => {
    if (appointmentList.indexOf(item) === -1) {
      dispatch(addAppointment([...appointmentList, item]));
    } else {
      window.alert("already Appointment selected");
    }
  };

  const handleSelectInput = (e: any) => {
    if (appointmentList.length === 0) {
      return window.alert("Please Add Appointment");
    }
    const value = e.target.value;
    setSelectInput(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <ul>
          {usersList.length > 0 &&
            usersList.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  style={
                    moment(item.endDate).diff(moment(item.startDate), "hours") >
                    1
                      ? { border: "1px solid red" }
                      : {}
                  }
                >
                  <li>name: {item.patient?.name} </li>
                  <li>
                    startDate:{" "}
                    {moment(item.startDate).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </li>
                  <li>
                    endDate:{" "}
                    {moment(item.endDate).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </li>
                  <li>clinicianName: {item.clinicianName}</li>
                  <li>
                    <select
                      name="clinicianName"
                      onChange={(e) => {
                        handleSelectInput(e);
                        setSelected(index);
                      }}
                      defaultValue={selectInput}
                    >
                      <option value=""></option>
                      <option value={item.clinicianName}>
                        {item.clinicianName}
                      </option>
                    </select>
                  </li>
                  <button onClick={() => handleAddAppointment(item)}>
                    Add Appointment
                  </button>
                  <br />
                  {selected === index &&
                    appointmentList
                      .filter((item: any) => item.clinicianName === selectInput)
                      .map((item: any, index: number) => {
                        return (
                          <div style={{ color: "red" }} key={index}>
                            <li>
                              {moment(item.startDate).format(
                                "dddd, MMMM Do YYYY, h:mm:ss a"
                              )}
                            </li>
                            <li>{item.clinicianName}</li>
                          </div>
                        );
                      })}
                  <br />
                  <br />
                </div>
              );
            })}
        </ul>
      </div>
      <div>
        <Appointment />
      </div>
      <br />
    </div>
  );
}

export default App;
