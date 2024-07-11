// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.css';

// // import NxWelcome from './nx-welcome';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CarsListView from './components/CarsListView';
import TrucksListView from './components/TrucksListView';
import DataContext from './DataContext';
import { Car, Truck, Permit } from './types/types';
import CarDetails from './components/CarDetails';
import TruckDetails from './components/TruckDetails';

export function App() {
  const [CarsState, setCarsState] = useState<Car[]>([]);
  const [TrucksState, setTrucksState] = useState<Truck[]>([]);
  const generateRandomCar = (id: number): Car => {
    const names = [
      'Accord',
      'Civic',
      'CR-V',
      'Camry',
      'Corolla',
      'Sentra',
      'Altima',
      'Fusion',
      'Malibu',
      'Impala',
    ];
    const models = [
      'LX',
      'EX',
      'S',
      'SE',
      'LE',
      'XLE',
      'Sport',
      'Touring',
      'Limited',
      'Platinum',
    ];
    const brands = [
      'Honda',
      'Toyota',
      'Nissan',
      'Ford',
      'Chevrolet',
      'Hyundai',
      'Kia',
      'Subaru',
      'BMW',
      'Mercedes-Benz',
    ];
    const colors = [
      'White',
      'Black',
      'Silver',
      'Blue',
      'Red',
      'Gray',
      'Green',
      'Yellow',
      'Orange',
      'Brown',
    ];

    return {
      id: id,
      name: names[Math.floor(Math.random() * names.length)],
      model: models[Math.floor(Math.random() * models.length)],
      yearOfRelease: Math.floor(Math.random() * (2024 - 2000)) + 2000, // Random year between 2000 and 2023
      brand: brands[Math.floor(Math.random() * brands.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  };
  const generateRandomTruck = (id: number): Truck => {
    const names = [
      'F-150',
      'Silverado',
      'Ram 1500',
      'Sierra 1500',
      'Tacoma',
      'Tundra',
      'Ranger',
      'Colorado',
      'Frontier',
      'Titan',
    ];
    const models = [
      'XL',
      'XLT',
      'Lariat',
      'LT',
      'SLT',
      'Limited',
      'SR5',
      'Platinum',
      'Raptor',
      'Denali',
    ];
    const brands = [
      'Ford',
      'Chevrolet',
      'Ram',
      'GMC',
      'Toyota',
      'Nissan',
      'Honda',
      'Jeep',
      'Dodge',
      'Subaru',
    ];
    const indianStates = [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Andaman and Nicobar Islands',
      'Chandigarh',
      'Dadra and Nagar Haveli and Daman and Diu',
      'Delhi',
      'Lakshadweep',
      'Puducherry',
    ];

    const permits: Permit[] = [];
    const permitCount = Math.floor(Math.random() * 5) + 1; // Random number of permits between 1 and 5
    function generatePermitNumber(length: number) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    for (let i = 0; i < permitCount; i++) {
      permits.push({
        permit_no: generatePermitNumber(15), // Generate a random permit number
        state: indianStates[Math.floor(Math.random() * indianStates.length)], // Random Indian state
      });
    }

    return {
      id: id,
      name: names[Math.floor(Math.random() * names.length)],
      model: models[Math.floor(Math.random() * models.length)],
      yearOfRelease: Math.floor(Math.random() * (2024 - 2000)) + 2000, // Random year between 2000 and 2023
      brand: brands[Math.floor(Math.random() * brands.length)],
      permits: permits,
    };
  };

  const CarProvider = () => {
    const carsArray = [];
    for (let i = 0; i < 10; i++) {
      carsArray.push(generateRandomCar(i));
    }
    return carsArray;
  };
  const TruckProvider = () => {
    const trucksArray = [];
    for (let i = 0; i < 10; i++) {
      trucksArray.push(generateRandomTruck(i));
    }
    return trucksArray;
  };

  useEffect(() => {
    const cars = CarProvider();
    const trucks = TruckProvider();
    setCarsState(cars);
    setTrucksState(trucks);
  }, []);

  return (
    <DataContext.Provider
      value={{ CarsState, TrucksState, setCarsState, setTrucksState }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/Cars" element={<CarsListView />} />
          <Route path="/Trucks" element={<TrucksListView />} />
          <Route path="/Cars-Details/:id?" element={<CarDetails />} />
          <Route path="/Trucks-Details/:id?" element={<TruckDetails />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}
export default App;
