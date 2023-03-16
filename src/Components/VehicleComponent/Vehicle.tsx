import "./Vehicle.css";
import { EligibleVehicles, VehicleProps } from './types'
import { Radio } from "@mui/material";

export function Vehicle(props: VehicleProps){
  
  const fetchVehicleCount = (vehicleCount: EligibleVehicles[], vehicle:EligibleVehicles ) => {
      return vehicleCount.filter((v) => {
         return v.name === vehicle.name
      })[0].total_no
  }

  const isDisabled = (vehicleCount: EligibleVehicles[], vehicle: EligibleVehicles) => {
     return vehicleCount.filter((v: EligibleVehicles) => {
            return v.name === vehicle.name
      })[0].total_no === 0 ? true : false
  }
  const {vehicleCount, planetDetails  } = props
  return (
    <div className="vehicle-box">
      {planetDetails.eligibleVehicles.map((vehicle: EligibleVehicles) => (
        <div className="radio-btn" key={vehicle.name}>
          <Radio
            disabled={isDisabled(vehicleCount, vehicle)}
            checked={planetDetails.selectedVehicle === vehicle.name}
            onChange={props.handleVehicleSelected}
            value={vehicle.name}
            name={planetDetails.id}
            id={planetDetails.id}
      />
          <label className="vehicle-wrapper">
            <label className="vehicle-name">{vehicle.name} </label>
            <span className="vehicle-count">
              {`${fetchVehicleCount(vehicleCount, vehicle)}`}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};