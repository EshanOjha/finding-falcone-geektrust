import { PlanetType } from "../types"

interface PlanetProps {
    id: string,
    selectedPlanet: string,
    planets: PlanetType[],
    handlePlanetSelected: (e: any) => void
}

export  type {PlanetType, PlanetProps}