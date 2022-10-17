import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(e){
    setFilters({
      ...filters,
      type: `${e.target.value}`
    })
    console.log(filters)
    
  }

  function onFindPetsClick(){
    if (filters.type === "all"){
    fetch("http://localhost:3001/pets")
    .then(res=> res.json())
    .then(data => setPets(data))
    }
    else{
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
    .then(res=> res.json())
    .then(data => setPets(data))
    }
  }

  function onAdoptPet(pet){
    fetch(`http://localhost:3001/pets/${pet.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isAdopted: true
      })
    })
    .then(res=> res.json())
    .then(updatedPet => handleUpdatedPet(updatedPet))
      
    }

    function handleUpdatedPet(updatedPet){

      const updatedPets = pets.map((pet)=>{
        if(pet.id === updatedPet.id){
          return updatedPet
        }
        else{
          return pet;
        }
      });
      setPets(updatedPets)
    }

  


  

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType = {onChangeType} onFindPetsClick = {onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet = {onAdoptPet} pets = {pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
