
/*  ISSUes 
(4)  touch problem  
(5) height of list does not adjustcwhen delete button is click 
()  does not drop on it's own list 
*/
const addButtonSelectors = ['.AddaCard', '.AddaCard2', '.AddaCard3']; // Array of CSS selector strings for add buttons

// addButtonSelectors.forEach((buttonSelector) => {
//   const addButton = document.querySelector(buttonSelector); // Get the add button element
//   addButton.addEventListener('click', addCard); // Add click event listener to each add button
// });

//  we add some more logic why (because + is a icon so when user click on that the div created between
//   the button and distroy UI so we add if condition if not click on + make div otherwise no)


addButtonSelectors.forEach((buttonSelector) => {
  const addButton = document.querySelector(buttonSelector); // Get the add button element
  const plusIcon = addButton.querySelector('i.fa-plus'); // Get the "+" icon element within the button

  addButton.addEventListener('click', function(event) {
    if (!event.target.matches('i.fa-plus')) {
      addCard(event);
    }
  }); // Add click event listener to the add button, excluding the "+" icon element
});

function addCard(event) {
  const addButton = event.target; // Get the clicked add button
  const list = addButton.parentNode; // Get the parent node of the add button (list container)

  const card = document.createElement('div'); // Create a new card element
  card.contentEditable = true; // Make the card content editable
  card.draggable = true; // Enable dragging for the card
  card.className = 'card'; // Assign the 'card' class to the card element
  card.style.display = 'inline-block'; // Set display to inline-block
  card.style.wordWrap = 'break-word'; // Set word-wrap property to break-word for text wrapping
  card.style.minHeight = '2.7rem'; // Set min-height to 2.7rem
  card.style.height = 'auto'; // Set height to auto for dynamic height based on content
  card.style.border = 'none'; // Remove border
  card.style.outline = 'none'; // Remove outline
  card.style.borderRadius = '10px'; // Set border radius to 10px
  card.style.boxShadow = '5px 5px 5px 5px #81848b'; // Add box shadow
  card.style.width = '18rem'; // Set width to 18rem
  card.style.fontSize = '14px'; // Set font size to 14px
  card.style.paddingTop = '10px'; // Add top padding
  card.style.textAlign = 'left'; // Set text alignment to left
  card.style.paddingLeft = '10px'; // Add left padding
  card.style.boxShadow = '0 1px 0 rgba(9,30,66,.25)'; // Add box shadow
  card.style.background = 'white'; // Set background color to white
  card.style.cursor = 'type';
  card.style.marginTop = '10px'; // Add top margin
  card.style.marginLeft = '10px'; // Add left margin
  card.style.marginBottom = '3px'; // Add bottom margin

  list.insertBefore(card, addButton); // Insert the new card before the add button

  const maxHeight = 480; // Set the maximum height of the list
  const currentHeight = list.offsetHeight; // Get the current height of the list
  const newHeight = currentHeight + card.offsetHeight; // Calculate the new height after adding the card

  if (newHeight > maxHeight) {
    list.style.height = `${maxHeight}px`; // Set the list height to the maximum height
    list.style.overflowY = 'scroll'; // Add vertical scroll if the content exceeds the maximum height
  } else {
    list.style.height = `${newHeight}px`; // Set the list height to the new height
  }

  addButton.scrollIntoView({ behavior: 'smooth', block: 'end' }); // Scroll to the add button (bottom of the list)
          
  card.addEventListener('dragstart', dragStart); // Add dragstart event listener to the card
  card.addEventListener('dragover', dragOver); // Add dragover event listener to the card
  card.addEventListener('dragleave', dragLeave); // Add dragleave event listener to the card
  card.addEventListener('drop', drop); // Add drop event listener to the card
  card.addEventListener('touchstart', touchStart); // Add touchstart event listener to the card
  card.addEventListener('touchmove', touchMove); // Add touchmove event listener to the card
  card.addEventListener('touchend', touchEnd); // Add touchend event listener to the card
}

let dragCard = null; // Variable to store the dragged card element
let targetList = null; // Variable to store the target list for the card drop

function dragStart(event) {
  const card = event.target; // Get the dragged card
  dragCard = card; // Store the dragged card in the dragCard variable
  card.style.opacity = '0.8'; // Reduce opacity of the dragged card
  // card.style.transform = 'rotate(3deg)'; // Add a slight rotation effect
  card.style.cursor = 'grabbing';
  event.dataTransfer.effectAllowed = 'move'; // Set the drag effect to move
  event.dataTransfer.setData('text/html', card.innerHTML); // Set the data to be transferred during drag
}

function dragOver(event) {
  event.preventDefault(); // Prevent default behavior during dragover
  const card = event.target; // Get the current card element
  card.style.opacity = '0.8'; // Reduce opacity of the current card

}



function dragLeave(event) {
  const card = event.target; // Get the current card element
  card.style.border = 'none'; // Remove border when dragging leaves the card
}

function drop(event) {
  event.preventDefault(); // Prevent default behavior of browser  during drop
  const card = event.target; // Get the current card element
  card.style.border = 'none'; // Remove border from the current card
  card.style.opacity = '1'; // Restore opacity of the current card
  card.style.background = '#ffffff'; // Set background color of the current card
  const sourceList = dragCard.parentNode; // Get the source list of the dragged card
  const targetList = card.parentNode; // Get the target list of the current card
  
  if (sourceList !== targetList) {
    sourceList.style.height = `${sourceList.offsetHeight - dragCard.offsetHeight}px`; // Reduce the height of the source list by the height of the dragged card
    targetList.insertBefore(dragCard, card); // Insert the dragged card before the current card
    targetList.style.height = `${targetList.offsetHeight + dragCard.offsetHeight}px`; // Increase the height of the target list by the height of the dragged card
  }
  
  dragCard = null; // Reset the dragged card variable
}


function touchStart(event) {
  const card = event.target; // Get the touched card
  dragCard = card; // Store the touched card in the dragCard variable
  card.style.opacity = '0.8'; // Reduce opacity of the touched card
  targetList = card.parentNode; // Store the reference to the target list based on card parent node
  event.preventDefault(); // Prevent default touch behavior
}

function touchMove(event) {
  const card = event.target; // Get the touched card
  card.style.position = 'fixed'; // Set the position to fixed for smooth touch dragging
  card.style.top = event.touches[0].clientY + 'px'; // Set the top position based on touch Y-coordinate
  card.style.left = event.touches[0].clientX + 'px'; // Set the left position based on touch X-coordinate
}

function touchEnd(event) {
  const card = event.target; // Get the touched card
  card.style.position = 'static'; // Reset the position to static
  card.style.opacity = '1'; // Restore opacity of the touched card

  if (targetList !== null) {
    targetList.insertBefore(dragCard, card); // Insert the card back into the target list
  }

  dragCard = null; // Reset the dragged card variable
  targetList = null; // Reset the target list variable
}





//   delete functions

  // const cardContainer = document.createElement('div');
  // cardContainer.style.position = 'relative';
  // cardContainer.appendChild(card);
  // cardContainer.className = 'card-container';

  
  // const deleteButton = document.createElement('span');
  // deleteButton.className = 'delete-button';
  // deleteButton.innerHTML =  '<i class="fas fa-trash"></i>'; // '&#10006;';
  // deleteButton.style.cursor = 'pointer';
  // deleteButton.style.position = 'absolute';
  // deleteButton.style.top = '50%';  // vertically middle
  // deleteButton.style.right = '20px'; //  some right 
  // deleteButton.style.transform = 'translateY(-50%)'; //used to center the button vertically based on its own height
  
  // deleteButton.addEventListener('click', function() {
  //   cardContainer.remove();
  //   // adjustListHeight();
  // });
  // cardContainer.appendChild(deleteButton);  // is used to append the deleteButton element as a child of the card element.

  // list.insertBefore(cardContainer, addButton); // where to insert the element based on parent take two parameters  inserting element and reference elemnt before where the element will be placed
  
  // function adjustListHeight() {
  //   const cardContainers = list.getElementsByClassName('card-container');
  //   let totalHeight = 0;
  //   for (let i = 0; i < cardContainers.length; i++) {
  //     if (cardContainers[i] !== cardContainer) {
  //       totalHeight += cardContainers[i].offsetHeight;
  //     }
  //   }
  //   list.style.height = totalHeight + 'px';
  // }








/* here documention avalible */


// const addButtonSelectors = ['.AddaCard', '.AddaCard2', '.AddaCard3']; // In this line, an array named addButtonSelectors is declared and assigned with three CSS selector strings: '.AddaCard', '.AddaCard2', and '.AddaCard3'.

// addButtonSelectors.forEach((buttonSelector) => {
//   const addButton = document.querySelector(buttonSelector); //  in this foreach gets the document of all buttons
//   //  and assign eventlistner to all 
//   addButton.addEventListener('click', addCard);
// });

// function addCard(event) {
//   const addButton = event.target;
//   const list = addButton.parentNode; //  

//   const card = document.createElement('div');
//   card.contentEditable = true;
//   card.draggable = true;
//   card.className = 'card';
//   card.style.display = 'inline-block'; //  display to inline-block
//   card.style.wordWrap = 'break-word'; //  word-wrap property to break-word so that the word should break
//   card.style.minHeight = '2.7rem'; // Set min-height to 2rem
//   card.style.height = 'auto'; // Set height to auto so that the height hould increase ac ording to text
//   card.style.border = 'none';
//   card.style.outline = 'none';
//   card.style.borderRadius = '10px';
//   card.style.boxShadow = '5px 5px 5px 5px #81848b';
//   card.style.width = '18rem';
//   card.style.fontSize = '14px';
//   card.style.paddingTop = '10px';
//   card.style.textAlign = 'left';
//   card.style.boxShadow = '0 1px 0 rgba(9,30,66,.25)';
//   card.style.background = 'white';
//   card.style.marginTop = '10px';
//   card.style.marginLeft = '10px';
//   card.style.marginBottom = '3px';

//   //  the new card before the button so that the div should comes above the button
//   list.insertBefore(card, addButton);

//   const maxHeight = 500; // Set your desired maximum height here
//   const currentHeight = list.offsetHeight; // Get the current height of the list
//   const newHeight = currentHeight + card.offsetHeight; // Calculate the new height

//   if (newHeight > maxHeight) {
//     list.style.height = `${maxHeight}px`;
//     list.style.overflowY = 'scroll';
//   } else {
//     list.style.height = `${newHeight}px`;
//   }

//   addButton.scrollIntoView({ behavior: 'smooth', block: 'end' });

// // drag and drop + touch 
// card.addEventListener('dragstart', dragStart);
//   card.addEventListener('dragover', dragOver);
//   card.addEventListener('dragleave', dragLeave);
//   card.addEventListener('drop', drop);
//   card.addEventListener('touchstart', touchStart);
//   card.addEventListener('touchmove', touchMove);
//   card.addEventListener('touchend', touchEnd);
// }

// let dragCard = null;
// let targetList = null; // to keep track of the list where the card should be dropped.

// function dragStart(event) {
//   const card = event.target;
//   dragCard = card;
//   card.style.opacity = '0.8';
//   event.dataTransfer.effectAllowed = 'move';
//   event.dataTransfer.setData('text/html', card.innerHTML);
// }

// function dragOver(event) {
//   event.preventDefault();
//   const card = event.target;
//   card.style.opacity = '0.8';
// }

// function dragLeave(event) {
//   const card = event.target;
//   card.style.border = 'none';
// }

// function drop(event) {
//   event.preventDefault();
//   const card = event.target;
//   card.style.border = 'none';
//   card.style.opacity = '1';
//   card.style.background='#ffffff'
//   const list = card.parentNode;
//   list.insertBefore(dragCard, card);
//   dragCard = null;
// }
// function touchStart(event) {
//   const card = event.target;
//   dragCard = card;
//   card.style.opacity = '0.8';
//   targetList = card.parentNode; // Store the reference to the target list based on card parent node
// }

// function touchMove(event) {
//   const card = event.target;
//   card.style.position = 'fixed';
//   card.style.top = event.touches[0].clientY + 'px';
//   card.style.left = event.touches[0].clientX + 'px';
//   event.preventDefault();
// }

// function touchEnd(event) {
//   const card = event.target;
//   card.style.position = 'static';
//   card.style.opacity = '1';

//   if (targetList !== null) {
//     targetList.insertBefore(dragCard, card); // Insert the card back into the target list
//   }

//   dragCard = null;
//   targetList = null;
// }






