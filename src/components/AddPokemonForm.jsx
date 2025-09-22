// components/AddPokemonForm.jsx - Form for Adding New Pokemon
/*
=============================================================================
INSTRUCTOR NOTES - AddPokemonForm.jsx
=============================================================================

This component demonstrates:
1. FORM STATE management with useState
2. CONTROLLED COMPONENTS (form inputs controlled by React state)
3. HANDLECHANGE pattern for form inputs
4. HANDLESUBMIT pattern for form submission
5. DIFFERENT INPUT TYPES (text, number, select, checkbox)
6. FORM VALIDATION (basic)

TEACHING ORDER:
1. Start with just the form JSX (no state)
2. Add useState for form data
3. Add handleChange function
4. Connect inputs to state (controlled components)
5. Add handleSubmit function
6. Add basic validation
7. Add checkbox as bonus

KEY CONCEPTS:
- Form state is LOCAL to this component
- Each input is "controlled" by React state
- handleChange updates state as user types
- handleSubmit processes the form when submitted
*/

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function AddPokemonForm({ onAddPokemon }) {
  // FORM STATE
  // INSTRUCTOR NOTE: This holds all our form data in one object
  // Explain why we group related form fields together
  const [formData, setFormData] = useState({
    name: '',           // Text input
    type: 'Normal',     // Select dropdown  
    level: 1,          // Number input
    trainer: '',       // Text input
    isShiny: false     // Checkbox input
  });

  // POKEMON TYPES ARRAY
  // INSTRUCTOR NOTE: Show how to create reusable data arrays
  // This makes it easier to add/remove types and keeps the JSX clean
  const pokemonTypes = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 
    'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];

  // HANDLE INPUT CHANGES
  // INSTRUCTOR NOTE: This is the MOST IMPORTANT function to understand
  // It handles ALL form inputs with one function
  const handleChange = (event) => {
    // DESTRUCTURE the event target to get input details
    const { name, value, type, checked } = event.target;
    
    console.log('Input changed:', { name, value, type, checked }); // DEBUGGING
    
    // UPDATE STATE using the input's name attribute
    setFormData(previousData => ({
      ...previousData,  // KEEP all existing data
      // UPDATE only the field that changed
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // HANDLE FORM SUBMISSION
  // INSTRUCTOR NOTE: This runs when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault(); // PREVENT page refresh
    
    console.log('Form submitted with data:', formData); // DEBUGGING
    
    // BASIC VALIDATION - check required fields
    if (!formData.name || !formData.trainer) {
      alert('Please fill in Pokemon name and trainer name!');
      return; // Exit early if validation fails
    }
    
    // CREATE new pokemon object with unique ID
    const newPokemon = {
      id: Date.now(),  // Simple ID generation (use UUID in production)
      name: formData.name,
      type: formData.type,
      level: parseInt(formData.level), // Convert to number
      trainer: formData.trainer,
      isShiny: formData.isShiny
    };
    
    // CALL PARENT FUNCTION to add the pokemon
    onAddPokemon(newPokemon);
    
    // RESET FORM after successful submission
    setFormData({
      name: '',
      type: 'Normal',
      level: 1,
      trainer: '',
      isShiny: false
    });
    
    alert(`${formData.name} added to your collection!`); // SUCCESS MESSAGE
  };

  return (
    <div className="add-pokemon-form">
      <h2 className="form-title">
        <Plus size={24} />
        Add New Pokemon
      </h2>
      
      <form onSubmit={handleSubmit} className="pokemon-form">
        {/* TEXT INPUT - Pokemon Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Pokemon Name *</label>
          <input
            type="text"
            id="name"
            name="name"                    // MUST match state property name
            value={formData.name}          // CONTROLLED by state
            onChange={handleChange}        // UPDATE state when user types
            placeholder="e.g., Pikachu"
            className="form-input"
            required                       // HTML validation
          />
        </div>

        {/* SELECT DROPDOWN - Pokemon Type */}
        <div className="form-group">
          <label htmlFor="type" className="form-label">Pokemon Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            {/* MAP over types array to create options */}
            {/* INSTRUCTOR NOTE: Show how to use map() to generate JSX elements */}
            {pokemonTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* NUMBER INPUT - Level */}
        <div className="form-group">
          <label htmlFor="level" className="form-label">Level</label>
          <input
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            min="1"                       // HTML constraint
            max="100"                     // HTML constraint
            className="form-input"
          />
        </div>

        {/* TEXT INPUT - Trainer Name */}
        <div className="form-group">
          <label htmlFor="trainer" className="form-label">Trainer Name *</label>
          <input
            type="text"
            id="trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            placeholder="e.g., Ash Ketchum"
            className="form-input"
            required
          />
        </div>

        {/* CHECKBOX INPUT - Shiny Pokemon */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isShiny"
              checked={formData.isShiny}    // Use CHECKED for checkboxes
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="checkbox-text">✨ Shiny Pokemon (rare!)</span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="submit-button">
          <Plus size={20} />
          Add Pokemon
        </button>
      </form>

      {/* DEBUGGING - Show current form state */}
      {/* INSTRUCTOR NOTE: Remove this in production, useful for teaching */}
      <div className="debug-info">
        <h4>Current Form Data:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default AddPokemonForm;

/*
=============================================================================
TEACHING POINTS FOR INSTRUCTORS:
=============================================================================

1. CONTROLLED COMPONENTS:
   - Each input's value comes from state
   - When user types, onChange updates state
   - State change triggers re-render with new value
   - This gives React full control over the form

2. HANDLECHANGE PATTERN:
   - One function handles ALL inputs
   - Uses the 'name' attribute to identify which field changed
   - Uses computed property names: [name]: value
   - Special handling for checkboxes (checked vs value)

3. FORM SUBMISSION:
   - preventDefault() stops page refresh
   - Validate data before processing
   - Call parent function with new data
   - Reset form after successful submission

4. STATE SHAPE:
   - Group related data in one object
   - Makes it easier to manage and reset
   - Each input maps to one property

5. INPUT TYPES:
   - text: regular text input
   - number: numeric input with constraints
   - select: dropdown menu
   - checkbox: boolean input (uses 'checked' not 'value')

6. ARRAY MAPPING FOR OPTIONS:
   - Create an array of option values
   - Use map() to generate <option> elements
   - Each option needs a unique 'key' prop
   - This makes the code more maintainable

COMMON MISTAKES TO WATCH FOR:
- Forgetting 'name' attribute on inputs
- Using 'value' instead of 'checked' for checkboxes
- Not preventing default on form submit
- Trying to access event after setState (async issues)
- Forgetting to convert number inputs from strings
- Not resetting form after submission

DEMONSTRATION IDEAS:
- Show form state updating in real-time
- Demonstrate what happens without preventDefault
- Show the difference between controlled and uncontrolled inputs
- Remove 'name' attribute and show handleChange breaking
- Show validation in action
- Demonstrate array mapping by adding/removing types from the array
- Show what happens if you forget the 'key' prop in the map
=============================================================================
*/