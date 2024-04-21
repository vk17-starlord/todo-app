import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the context with initial values for cards and drag-and-drop states
const CardContext = createContext({
  cards: [],
  addCard: () => {},
  removeCard: () => {},
  addCards: () => {},
  currentCard:null,
  updateCardStatus: () => {},
  getCardsByStatus: () => {},
  dropListID: null,
  draggedItemID: null,
  setDropListID: () => {},
  setDraggedItemID: () => {},
  setCurrentTaskCard: ()=> {},
});

// Local storage key for saving card data
const LOCAL_STORAGE_KEY = "card_context_cards";

// Define the provider component
const CardContextProvider = ({ children }) => {
  // Load the initial state from local storage
  const [cards, setCards] = useState(() => {
    const storedCards = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const [ currentCard , setCurrentCard]= useState(null);

  const setCurrentTaskCard = (cardID) =>{
    const card = cards.filter(val=>val.id === cardID);
    if(card && card[0]){
      setCurrentCard(card[0]);
    }
  }

  // Function to add a new card
  const addCard = (newCard) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  // Function to remove a card by ID
  const removeCard = (cardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== cardId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  // Function to get cards by a specific status
  const getCardsByStatus = (cardstatus) => {
    return cards.filter((card) => card.status === cardstatus);
  };

  // Function to add multiple cards
  const addCards = (newCards) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCards));
    setCards(newCards);
  };

  // Function to update a card's status by ID
  const updateCardStatus = (cardId, newStatus) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === cardId ? { ...card, status: newStatus } : card
      );
      console.log(updatedCards,cardId)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  // Save cards to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  return (
    <CardContext.Provider
      value={{
        cards,
        addCard,
        removeCard,
        addCards,
        updateCardStatus,
        getCardsByStatus,
        currentCard,
        setCurrentTaskCard
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

// Prop validation for the children prop to ensure it's passed correctly
CardContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CardContext, CardContextProvider};
