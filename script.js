
// Get all the div elements with the 'contenteditable' attribute
const draggableElements = document.querySelectorAll('div[contenteditable="true"]');

// Store the currently dragged element
let draggedElement = null;

// Add event listeners to enable dragging
draggableElements.forEach((element) => {
  element.addEventListener('dragstart', dragStart);
  element.addEventListener('dragend', dragEnd);
});

// Add event listeners to enable dropping
document.querySelectorAll('.cards1, .cards2, .cards3').forEach((list) => {
  list.addEventListener('dragover', dragOver);
  list.addEventListener('dragenter', dragEnter);
  list.addEventListener('dragleave', dragLeave);
  list.addEventListener('drop', drop);
});

// Drag start event handler
function dragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', ''); // Required for Firefox compatibility
  event.target.classList.add('dragging');
}

// Drag end event handler
function dragEnd(event) {
  draggedElement = null;
  event.target.classList.remove('dragging');
}

// Drag over event handler (to allow dropping)
function dragOver(event) {
  event.preventDefault();
}

// Drag enter event handler (to provide visual feedback)
function dragEnter(event) {
  event.preventDefault();
  event.target.classList.add('drag-enter');
}

// Drag leave event handler (to remove visual feedback)
function dragLeave(event) {
  event.target.classList.remove('drag-enter');
}

// Drop event handler
function drop(event) {
  event.preventDefault();
  event.target.classList.remove('drag-enter');
  
  // Move the dragged element to the target container
  event.target.appendChild(draggedElement);
}


























    // // Check if data exists in local storage
    // const savedData = localStorage.getItem('kanbanData');
    // let kanbanData = savedData ? JSON.parse(savedData) : [];

    // const listsContainer = document.getElementById('lists-container');
    // const addListButton = document.getElementById('add-list-button');
    // const addListInput = document.getElementById('add-list-input');
    // let draggingCard = null;

    // // Render the initial kanban board
    // renderBoard();

    // // Add event listener to the "Add a List" button
    // addListButton.addEventListener('click', () => {
    //   const newList = addListInput.value.trim();
    //   if (newList) {
    //     kanbanData.push({ title: newList, cards: [] });
    //     saveData();
    //     renderBoard();
    //     addListInput.value = '';
    //   }
    // });

    // // Render the kanban board
    // function renderBoard() {
    //   listsContainer.innerHTML = '';

    //   kanbanData.forEach((list, listIndex) => {
    //     const listElement = document.createElement('div');
    //     listElement.classList.add('list');

    //     const listTitle = document.createElement('div');
    //     listTitle.classList.add('list-title');
    //     listTitle.textContent = list.title;

    //     const cardContainer = document.createElement('div');
    //     cardContainer.classList.add('card-container');

    //     const addCardButton = document.createElement('button');
    //     addCardButton.classList.add('add-card-button');
    //     addCardButton.textContent = 'Add a Card';

    //     const inputElement = document.createElement('input');
    //     inputElement.type = 'text';
    //     inputElement.value = '';
    //     inputElement.placeholder = 'Enter a card...';

    //     // Event listener to add a card
    //     addCardButton.addEventListener('click', () => {
    //       const newCard = inputElement.value.trim();
    //       if (newCard) {
    //         list.cards.push(newCard);
    //         saveData();
    //         renderBoard();
    //       }
    //     });

    //     // Event listener when input loses focus
    //     inputElement.addEventListener('blur', () => {
    //       const newCard = inputElement.value.trim();
    //       if (newCard) {
    //         list.cards.push(newCard);
    //         saveData();
    //         renderBoard();
    //       }
    //     });

    //     // Render the cards
    //     list.cards.forEach((card, cardIndex) => {
    //       const cardElement = document.createElement('div');
    //       cardElement.classList.add('card');
    //       cardElement.textContent = card;
    //       cardElement.draggable = true;

    //       cardElement.addEventListener('dragstart', (event) => {
    //         draggingCard = { listIndex, cardIndex };
    //         cardElement.classList.add('dragging');
    //       });

    //       cardElement.addEventListener('dragend', () => {
    //         draggingCard = null;
    //         cardElement.classList.remove('dragging');
    //       });

    //       cardElement.addEventListener('dragover', (event) => {
    //         event.preventDefault();
    //       });

    //       cardElement.addEventListener('drop', () => {
    //         const { listIndex: sourceListIndex, cardIndex: sourceCardIndex } = draggingCard;

    //         if (sourceListIndex === listIndex && sourceCardIndex === cardIndex) {
    //           return;
    //         }

    //         const sourceCard = kanbanData[sourceListIndex].cards.splice(sourceCardIndex, 1)[0];
    //         kanbanData[listIndex].cards.splice(cardIndex, 0, sourceCard);

    //         saveData();
    //         renderBoard();
    //       });

    //       cardContainer.appendChild(cardElement);
    //     });

    //     listElement.appendChild(listTitle);
    //     listElement.appendChild(cardContainer);
    //     listElement.appendChild(addCardButton);
    //     listElement.appendChild(inputElement);

    //     listsContainer.appendChild(listElement);
    //   });
    // }

    // // Save the data to local storage
    // function saveData() {
    //   localStorage.setItem('kanbanData', JSON.stringify(kanbanData));
    // }

    
