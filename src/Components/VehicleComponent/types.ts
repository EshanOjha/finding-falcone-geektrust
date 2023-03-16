import {  ReactNode } from "react";
import { EligibleVehicles, PlanetType } from "../types";


interface PlanetDetails {
    id: string,
    isSelected: boolean,
    selectedPlanet: string,
    selectedVehicle: string,
    eligibleVehicles: EligibleVehicles[],
    distance: null,
    timeTaken: Number
}

interface VehicleProps {
    vehicleCount: EligibleVehicles[],
    planetDetails: PlanetDetails,
    handleVehicleSelected: (e: any) => void,
    children?: ReactNode
}


export type {EligibleVehicles, VehicleProps }
