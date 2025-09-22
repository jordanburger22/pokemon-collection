// components/PokemonCard.jsx - Individual Pokemon Display Component
/*
=============================================================================
INSTRUCTOR NOTES - PokemonCard.jsx  
=============================================================================

This component demonstrates:
1. FUNCTIONAL COMPONENTS 
2. PROPS (receiving data from parent)
3. DESTRUCTURING props for cleaner code
4. EVENT HANDLING (onClick)
5. CALLBACK PROPS (calling parent functions)

TEACHING POINTS:
- This is a "presentational" component - it just displays data
- All data comes from props (no state needed here)
- Shows how to call parent functions through callback props
- Demonstrates component reusability

KEY CONCEPTS:
- Props are READ-ONLY (never modify them)
- Each card is independent but shows different data
- Event handlers call functions passed down as props
*/

import React from 'react';
import { Trash2 } from 'lucide-react';

// FUNCTIONAL COMPONENT with PROPS
// INSTRUCTOR NOTE: Show both ways - with and without destructuring
function PokemonCard({ pokemon, onDelete }) {
  // INSTRUCTOR NOTE: Explain props destructuring vs using props.pokemon
  // You could also write: function PokemonCard(props) and use props.pokemon

  // EVENT HANDLER FUNCTION
  // INSTRUCTOR NOTE: Show how to handle button clicks
  const handleDeleteClick = () => {
    console.log('Delete button clicked for:', pokemon.name); // DEBUGGING
    
    // CALL THE PARENT FUNCTION
    // This calls the deletePokemon function that was passed down as a prop
    onDelete(pokemon.id);
  };

  return (
    <div className="pokemon-card">
      {/* HEADER with name and delete button */}
      <div className="card-header">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <button 
          className="delete-button"
          onClick={handleDeleteClick}  // EVENT HANDLER
          title="Delete Pokemon"       // ACCESSIBILITY
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* POKEMON INFO */}
      {/* INSTRUCTOR NOTE: Show how props are used to display data */}
      <div className="pokemon-info">
        <p><strong>Type:</strong> {pokemon.type}</p>
        <p><strong>Level:</strong> {pokemon.level}</p>
        <p><strong>Trainer:</strong> {pokemon.trainer}</p>
      </div>
    </div>
  );
}

export default PokemonCard;

/*
=============================================================================
TEACHING POINTS FOR INSTRUCTORS:
=============================================================================

1. PROPS DESTRUCTURING:
   - Show both ways: PokemonCard(props) vs PokemonCard({ pokemon, onDelete })
   - Explain why destructuring makes code cleaner
   - Point out that prop names must match what parent sends

2. CALLBACK PROPS:
   - onDelete is a FUNCTION passed from parent
   - When we call onDelete(pokemon.id), it runs the parent's function
   - This is how children communicate back to parents

3. EVENT HANDLING:
   - onClick expects a function reference
   - We create handleDeleteClick to do more than just call onDelete
   - Could also use: onClick={() => onDelete(pokemon.id)}

4. COMPONENT REUSABILITY:
   - Same component, different data
   - Each card is independent
   - Props make components flexible

5. JSX EXPRESSIONS:
   - {pokemon.name} renders the value
   - Can use any JavaScript expression inside {}
   - Show how to combine with strings: {`Level: ${pokemon.level}`}

COMMON MISTAKES TO WATCH FOR:
- Trying to modify props (they're read-only!)
- Forgetting to call the callback function
- Using onClick={handleDeleteClick()} instead of onClick={handleDeleteClick}
- Not destructuring props consistently
- Missing key prop when this is used in a list (handled by parent)

DEMONSTRATION IDEAS:
- Show the same component with different data
- Change props in parent and show how child updates
- Demonstrate what happens if you forget the key prop
- Show React DevTools to inspect props
=============================================================================
*/