import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAppointment } from "../actions/user";
import moment from "moment";

function Appointment(props: any) {
  const dispatch = useDispatch();
  const appointmentList = useSelector((state: any) => state.user?.appointment);

  const deletAppointment = (id: number) => {
    dispatch(deleteAppointment(id));
  };

  return (
    <div>
      <h3>Appointment Added</h3>
      {appointmentList.length > 0 &&
        appointmentList.map((item: any, index: number) => {
          return (
            <div
              key={index}
              style={
                moment(item.endDate).diff(moment(item.startDate), "hours") > 1
                  ? { border: "1px solid red" }
                  : {}
              }
            >
              <li>name: {item.patient?.name} </li>
              <li>
                startDate:{" "}
                {moment(item.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </li>
              <li>
                endDate:{" "}
                {moment(item.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </li>
              <li>clinicianName: {item.clinicianName}</li>
              <br />
              <button onClick={() => deletAppointment(item.id)}>
                Remove Appointment
              </button>
              <br />
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default Appointment;
