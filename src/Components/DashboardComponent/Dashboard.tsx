import React, { useEffect, useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Dashboard.css";
import { DataContext } from "../../context/DataContext";
import { Planet } from "../PlanetComponent";
import { Vehicle } from "../VehicleComponent";
import { EligibleVehicles } from "../types";
import { PlanetType } from "../PlanetComponent/types";
import { SelectedDetails } from "./types";

export function Dashboard() {
  const dataContext = useContext(DataContext);
  let navigate = useNavigate();
  const { planets, vehicles, planetsLoading, vehiclesLoading, handleButtonClick, totalTimeResult, selectedPlanetResult, selectedVehicleResult } = dataContext;
  console.log('totalTimeResult ',totalTimeResult)
  const [remainingPlanets, setRemainingPlanets] = useState<PlanetType[]>([]);
  const [remainingVehicles, setRemainingVehicles] = useState<EligibleVehicles[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<SelectedDetails[]>([]);
  const [findFalconeButtonDisable, setFindFalconeButtonDisable] = useState(true);
  const [totalTime, setTotalTime] = useState<any | null>(null);

  function buildSelectionDetails() {
    const createDetails = [...Array(4).keys()].map((index) => ({
      id: "planet" + index,
      isSelected: false,
      selectedPlanet: "",
      selectedVehicle: "",
      eligibleVehicles: [],
      distance: null,
      timeTaken: 0,
    }));
    setSelectedDetails(createDetails);
  }

  useEffect(() => {
    if(totalTimeResult > 0){
      navigate("../result", { replace: true });
    }
  },[totalTimeResult, selectedVehicleResult, selectedPlanetResult, navigate])

  useEffect(() => {
    if (!planetsLoading) setRemainingPlanets(planets);
    if (!vehiclesLoading) setRemainingVehicles(vehicles);
    buildSelectionDetails();
  }, [planetsLoading, planets, vehiclesLoading, vehicles]);

  const handlePlanetSelected = (e:any) => {
    const selectedPlanetId = e.target.id
    const selectedPlanetName = e.target.value;
    const selectedPlanetDetails = selectedDetails.filter((planet: any) => {
      return planet.id === selectedPlanetId;
    })[0];

    filterRemainingPlanets(selectedPlanetDetails, selectedPlanetName);
    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((details: SelectedDetails) => {
      if (details.id === selectedPlanetId) {
        details.isSelected = true;
        details.selectedPlanet = selectedPlanetName
      }
      return "";
    });

    const planet = remainingPlanets.filter((planet: PlanetType) => {
      return planet.name === e.target.value;
    })[0];

    setSelectedDetails(newSelectedDetails);
    handleVehicles(planet, selectedPlanetId);
  };

  const handleVehicles = (planet: PlanetType, selectedPlanetId: string) => {
    const eligibleVehicles = vehicles.filter((vehicle: any) => {
      return vehicle.max_distance >= planet.distance;
    });

    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((planet: SelectedDetails) => {
      if (planet.id === selectedPlanetId) {
        planet.eligibleVehicles = eligibleVehicles;
      }
      return "";
    });
    setSelectedDetails(newSelectedDetails);
  };

  const handleVehicleSelected = (e: any) => {
    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((selected: any) => {
      if (selected.id === e.target.id) {
        selected.selectedVehicle === "" ? handleVehicleCountWhenNotSelected(e) : handleVehicleCountWhenAlreadySelected(e);
        selected.selectedVehicle = e.target.value;
      }
      return "";
    });
    setSelectedDetails(newSelectedDetails);
    changeButtonState();
    handleTime(e);
  };

  const handleVehicleCountWhenNotSelected = (e: any) => {
    const newRemainingvehicles = [...remainingVehicles];
    newRemainingvehicles.map((vehicle: any) => {
      if (e.target.value === vehicle.name) vehicle.total_no -= 1;
      return "";
    });
    setRemainingVehicles(newRemainingvehicles);
  };

  const handleVehicleCountWhenAlreadySelected = (e: any) => {
    const tempSelectedDetails: any = [...selectedDetails];
    const prevVehicle = tempSelectedDetails.filter((selection: any) => {
      return selection.id === e.target.id;
    })[0].selectedVehicle;

    const newRemainingVehicles = [...remainingVehicles];
    newRemainingVehicles.map((vehicle: any) => {
      if (e.target.value === vehicle.name) vehicle.total_no -= 1;
      if (vehicle.name === prevVehicle) vehicle.total_no += 1;
      return "";
    });
    setRemainingVehicles(newRemainingVehicles);
  };

  const handleTime = (e: any) => {
    const selectedObj: any = selectedDetails.filter((selected: any) => {
      return selected.id === e.target.id;
    });

    const planetSelected = selectedObj[0].selectedPlanet;
    const planetObj = planets.filter((planet: any) => {
      return planetSelected === planet.name;
    });

    const distance = planetObj[0].distance;
    const vehicleObj: any = remainingVehicles.filter((vehicle: any) => {
      return vehicle.name === e.target.value;
    });

    const speed = vehicleObj[0].speed;
    const time = distance / speed;
    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((selected: SelectedDetails) => {
      if (selected.id === e.target.id) selected.timeTaken = time;
      return "";
    });
    setSelectedDetails(newSelectedDetails);
    calculateTotalTimeTaken();
  };

  function calculateTotalTimeTaken() {
    const newSelectedDetails = [...selectedDetails];

    const totalTime = newSelectedDetails.reduce(
      (totalTime, selectedDetail: SelectedDetails) =>
        totalTime + (selectedDetail.timeTaken || 0),
      0
     );
      setTotalTime(totalTime);
  }

  function changeButtonState() {
    const tempSelectedDetails = [...selectedDetails];
    var count = tempSelectedDetails.filter(
      (selected: SelectedDetails) => selected.isSelected && selected.selectedVehicle
    );
    if (count.length === 4) setFindFalconeButtonDisable(false);
  }

  function filterRemainingPlanets(selectedPlanetDetails: any, selectedPlanetName: any) {
    let newRemainingPlanets = null;
    if (selectedPlanetDetails.isSelected === false) {
      newRemainingPlanets = remainingPlanets.filter(
        (planet: PlanetType) => planet.name !== selectedPlanetName
      );
    } else {
      const prevSeletedPlanet = planets.filter(
        (planet: PlanetType) => planet.name === selectedPlanetDetails.selectedPlanet
      )[0];
      newRemainingPlanets = remainingPlanets.filter(
        (planet: PlanetType) => planet.name !== selectedPlanetName
      );
      newRemainingPlanets.push(prevSeletedPlanet);
    }
    setRemainingPlanets(newRemainingPlanets);
  }

  const selectedPlanets = selectedDetails ? selectedDetails.map((s: SelectedDetails) => s.selectedPlanet) : null;
  const selectedVehicles = selectedDetails ? selectedDetails.map((s: SelectedDetails) => s.selectedVehicle) : null;

  return (
    <div className="planet-vehicle-time-container">
      <div className="heading">
        Select any 4 Planets and Vehicles
      </div>
      <div className="planet-vehicle-wrapper">
        {!planetsLoading && !vehiclesLoading ? (
          selectedDetails.map((planet: SelectedDetails) => {
            return (
              <div className="planet-vehicle-box" key={planet.id}>
                <Planet
                  id={planet.id}
                  planets={remainingPlanets}
                  selectedPlanet={planet.selectedPlanet}
                  handlePlanetSelected={handlePlanetSelected}
                />
                {planet.isSelected ? (
                  <Vehicle
                    vehicleCount={remainingVehicles}
                    planetDetails={planet}
                    handleVehicleSelected={handleVehicleSelected}
                  />
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
      <div className="time-taken-wrapper">
        <div>Time Taken: {totalTime}</div>
      </div>
      <div className="button-wrapper">
          <button
            onClick={() => {
              handleButtonClick(totalTime,selectedPlanets,selectedVehicles)
            }}
            disabled={findFalconeButtonDisable}
            className="button-black"
          >
            Find Falcone!
          </button>
      </div>
    </div>
  );
}