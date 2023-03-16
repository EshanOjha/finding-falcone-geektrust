import "./Planet.css";
import { PlanetProps } from "./types";

export function Planet(props: PlanetProps) {
  const {planets, selectedPlanet, id , handlePlanetSelected} = props
  console.log('inside planets ', JSON.stringify(selectedPlanet))
  return (
    <div className="planet-selector">
      <div>
        <div className="margin-m">
          <strong>Select a Planet</strong>
        </div>
        <select
          className="custom-select"
          onChange={handlePlanetSelected}
          id={id}
          value={selectedPlanet}>
          <option>{selectedPlanet}</option>
          {planets.map((planet) => (
            <option key={planet.name}>{planet.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};