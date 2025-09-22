// App.jsx - Main Application Component
/*
=============================================================================
INSTRUCTOR NOTES - App.jsx
=============================================================================

This is the MAIN component that demonstrates:
1. STATE MANAGEMENT with useState
2. COMPONENT COMPOSITION (using other components)
3. PROPS PASSING (sending data to child components)
4. CALLBACK FUNCTIONS (receiving data from child components)

TEACHING ORDER:
1. Start with just the basic JSX structure and sample data
2. Add useState for pokemon list
3. Add PokemonCard components and show props
4. Add AddPokemonForm component
5. Add delete functionality

KEY CONCEPTS TO EMPHASIZE:
- Data flows DOWN through props
- Events bubble UP through callback functions
- State lives in the parent component
- Child components are "dumb" - they just display what they're given
*/

import React, { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import AddPokemonForm from './components/AddPokemonForm';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  // STATE MANAGEMENT
  // INSTRUCTOR NOTE: This is where ALL our pokemon data lives
  // Explain why state goes in the parent component
  const [pokemonList, setPokemonList] = useState([
    // SAMPLE DATA - start with this so students can see components working
    // INSTRUCTOR NOTE: Using UUIDs for consistent ID format throughout the app
    {
      id: uuidv4(),
      name: 'Pikachu',
      type: 'Electric',
      level: 25,
      trainer: 'Ash Ketchum'
    },
    {
      id: uuidv4(),
      name: 'Charizard', 
      type: 'Fire',
      level: 78,
      trainer: 'Ash Ketchum'
    },
    {
      id: uuidv4(),
      name: 'Blastoise',
      type: 'Water', 
      level: 65,
      trainer: 'Gary Oak'
    }
  ]);

  // ADD POKEMON FUNCTION
  // INSTRUCTOR NOTE: This function will be PASSED TO the form component
  // Explain how parent functions can be called by children
  const addPokemon = (newPokemon) => {
    console.log('Adding new pokemon:', newPokemon); // DEBUGGING - show in console
    
    // ADD new pokemon to the list using SPREAD OPERATOR
    // IMPORTANT: Never mutate state directly!
    setPokemonList(previousList => [...previousList, newPokemon]);
  };

  // DELETE POKEMON FUNCTION  
  // INSTRUCTOR NOTE: Show how to remove items from state
  const deletePokemon = (pokemonId) => {
    console.log('Deleting pokemon with id:', pokemonId); // DEBUGGING
    
    // FILTER out the pokemon with matching id
    // This creates a NEW array without the deleted pokemon
    setPokemonList(previousList => 
      previousList.filter(pokemon => pokemon.id !== pokemonId)
    );
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">
        <h1>Pokemon Collection Manager</h1>
        <p>Total Pokemon: {pokemonList.length}</p>
      </header>

      {/* ADD POKEMON FORM */}
      {/* INSTRUCTOR NOTE: We're passing a FUNCTION as a prop */}
      <AddPokemonForm onAddPokemon={addPokemon} />

      {/* POKEMON LIST */}
      {/* INSTRUCTOR NOTE: This demonstrates LIST RENDERING */}
      <div className="pokemon-grid">
        {pokemonList.length > 0 ? (
          // MAP over array to create components
          pokemonList.map(pokemon => (
            <PokemonCard
              key={pokemon.id}           // REQUIRED for React lists
              pokemon={pokemon}          // PASSING DATA as props
              onDelete={deletePokemon}   // PASSING FUNCTION as props
            />
          ))
        ) : (
          // CONDITIONAL RENDERING - show message if no pokemon
          <p className="no-pokemon">No Pokemon in your collection yet!</p>
        )}
      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>Built with React - Learning Components, Props, and State!</p>
      </footer>
    </div>
  );
}

export default App;

/*
=============================================================================
TEACHING POINTS FOR INSTRUCTORS:
=============================================================================

1. STATE LOCATION:
   - Ask: "Why does pokemonList state live here and not in PokemonCard?"
   - Answer: Because multiple components need access to this data

2. PROPS vs STATE:
   - Props = data coming FROM parent
   - State = data managed WITHIN component
   - Show how pokemon data flows down as props

3. ARRAY METHODS:
   - map() creates new components from data
   - filter() removes items without mutating original
   - Spread operator [...] adds items without mutating

4. KEY PROP:
   - Required for list items
   - Helps React track changes efficiently
   - Use unique, stable identifiers (like id)

5. CONDITIONAL RENDERING:
   - Show different content based on conditions
   - Use ternary operator or && for simple conditions

COMMON MISTAKES TO WATCH FOR:
- Forgetting 'key' prop in lists
- Trying to mutate state directly (push, splice)
- Forgetting to destructure props
- Missing import statements
=============================================================================
*/