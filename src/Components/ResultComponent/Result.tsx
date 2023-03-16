import React, { useState, useEffect, useCallback } from "react";
import "./Result.css";
import axios from "axios";
import { useDateContext } from '../../context/DataContext';

export function Result(){
  const {totalTimeResult, token, selectedPlanetResult, selectedVehicleResult} = useDateContext()

  const [status, setStatus] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [planetName, setPlanetName] = useState("");
  const getResult = useCallback(
    async function () {
      await axios({
        method: "post",
        url: "https://findfalcone.herokuapp.com/find",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          token: token.token,
          planet_names: selectedPlanetResult,
          vehicle_names: selectedVehicleResult,
        },
      })
        .then((res) => {
          if (res.data.status) {
            setResultMessage("Hurray! You find Falcone!");
            setPlanetName(res.data.planet_name);
          } else {
            setResultMessage("Sorry! You could not find Falcone!");
          }
          setStatus(res.data.status);
        })
        .catch((error) => console.log(error));
    },
    [selectedVehicleResult,selectedPlanetResult, token]
  );

  useEffect(() => {
    getResult()
  }, [getResult]);

  return (
    <div className="result_container">
        <div>
          <div className="result_message">{resultMessage}</div>
          {
              status ? 
              <div className="result_box">
                <div className="result_planet">
                  Found at planet : {planetName}
                </div>
                <div className="result_total_time">
                  Time Taken: {totalTimeResult}
                </div>
            </div> : <></>
          }
        </div>
   </div>
   )
}