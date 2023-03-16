import React from "react";
import { createContext } from "react";
import { useAxios } from "../hooks/useAxios";
export const DataContext = createContext();
const {Provider} = DataContext;

export function DataContextProvider({children}){
  const [totalTime, setTotalTime] = React.useState(null)
  const [selectedPlanet, setSelectedPlanet] = React.useState(null)
  const [selectedVehicle, setSelectedVehicle] = React.useState(null)
  const { response: planets, loading: planetsLoading, error: planetsError} = useAxios({
    method: "GET",
    url: "/planets",
  });

  const { response: vehicles, loading: vehiclesLoading, error: vehiclesError } = useAxios({
    method: "GET",
    url: "/vehicles",
  });

  const { response: tokenResponse, error: tokenError} = useAxios({
    method: "POST",
    url: "/token",
    headers: {
      Accept: "application/json",
    },
    body: {},
  });

  const handleResult = (totalTimeTaken, selectedPlanetResult, selectedVehicleResult) => {
    setTotalTime(totalTimeTaken)
    setSelectedPlanet(selectedPlanetResult)
    setSelectedVehicle(selectedVehicleResult)
  }
  

  return (
    <Provider
      value={{
        planets: planets,
        vehicles: vehicles,
        planetsLoading: planetsLoading,
        planetsError: planetsError,
        vehiclesLoading: vehiclesLoading,
        vehiclesError: vehiclesError,
        token: tokenResponse,
        tokenError: tokenError,
        handleButtonClick: handleResult,
        totalTimeResult: totalTime,
        selectedPlanetResult: selectedPlanet,
        selectedVehicleResult: selectedVehicle
      }}
    >
      {children}
    </Provider>
  );
};

export const useDateContext = () => React.useContext(DataContext);