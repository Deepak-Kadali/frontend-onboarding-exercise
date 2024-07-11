import React, { SetStateAction, Dispatch } from 'react';

export interface Car {
  id: number;
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}
export interface Truck {
  id: number;
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  permits: Permit[];
}
export interface Permit {
  permit_no: string;
  state: string;
}
export interface Datacontext {
  CarsState: Car[];
  TrucksState:Truck[];
  setCarsState:Dispatch<SetStateAction<Car[]>>;
  setTrucksState:Dispatch<SetStateAction<Truck[]>>;
}
