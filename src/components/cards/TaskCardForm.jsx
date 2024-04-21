import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"; // UUID library for unique ID generation

// This function component allows card editing and creation.
function TaskCardForm({ card = {}, onSave }) {
  // Using local state to keep track of form data.
  const [formData, setFormData] = useState({
    id: card?.id || "",
    name: card?.name || "",
    category: card?.category || "",
    tags: card?.tags ? card.tags.join(", ") : "", // Default to an empty string if undefined
    created_at: card?.created_at || "",
    status: card?.status || "",
    progress: card?.progress || 0,
    description: card?.description || "",
    subtasks:card?.subtasks || [],
  });

  // Handle form input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "progress" ? parseInt(value) : value,
    }));
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    const isNewCard = !formData.id; // Check if it's a new card

    const cardId = isNewCard ? uuidv4() : formData.id; // Generate UUID if creating a new card
    const createdAt = isNewCard
      ? new Date().toISOString()
      : formData.created_at; // Generate current timestamp
    const status = isNewCard ? "Incomplete" : formData.status;
    const updatedCard = {
      ...formData,
      id: cardId,
      created_at: createdAt,
      status: status,
      link: `/tasks/${cardId}`, // Generate link based on UUID
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Ensure tags are trimmed and converted to an array
    };

    onSave(updatedCard);
  };

  return (
    <div className="w-full task-form">
      <h2>{formData.id ? "Edit Task Card" : "Add New Task Card"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name:</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Category:</label>
          <input
            required
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Tags e.g ( Urgent , Important , Priority ) Make sure it is comma seperated :</label>
          <input
            required
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

// PropTypes to validate the expected data type of the component props.
TaskCardForm.propTypes = {
  card: PropTypes.object, // The `card` prop can be an object or omitted (defaults to an empty object).
  onSave: PropTypes.func.isRequired, // The `onSave` prop is a required function.
};

export default TaskCardForm;
