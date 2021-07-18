import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAppointment } from "../actions/user";
import moment from "moment";

function Appointment(props: any) {
  const dispatch = useDispatch();
  const appointmentList = useSelector((state: any) => state.user?.appointment);

  const deletAppointment = (index: number) => {
    const newArray = [...appointmentList];
    newArray.splice(index, 1);
    dispatch(deleteAppointment(newArray));
  };

  return (
    <div>
      <p>Appointment Added</p>
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
              <li>startDate: {moment(item.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</li>
              <li>clinicianName: {item.clinicianName}</li>
              <button onClick={() => deletAppointment(index)}>
                Remove Appointment
              </button>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default Appointment;
