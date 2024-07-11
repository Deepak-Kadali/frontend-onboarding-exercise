import React from "react";
import { Datacontext } from "./types/types";
const DataContext = React.createContext<Datacontext | undefined>(undefined)

export default DataContext