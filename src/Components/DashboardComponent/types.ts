import { EligibleVehicles, PlanetType } from "../types";

interface SelectedDetails {
    id: string,
    isSelected: boolean,
    selectedPlanet: string,
    selectedVehicle: string,
    eligibleVehicles: EligibleVehicles[],
    distance: null,
    timeTaken: number
}


export  type {SelectedDetails}