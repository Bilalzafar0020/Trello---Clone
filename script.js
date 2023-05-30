
/*  ISSUes (1)  when all div are drap off the height did'nt adjust
(2) not draging on empty list
(3) little rotate like trello with drag
*/

const addButtonSelectors = ['.AddaCard', '.AddaCard2', '.AddaCard3']; // In this line, an array named addButtonSelectors is declared and assigned with three CSS selector strings: '.AddaCard', '.AddaCard2', and '.AddaCard3'.

addButtonSelectors.forEach((buttonSelector) => {
  const addButton = document.querySelector(buttonSelector); //  in this foreach gets the document of all buttons
  //  and assign eventlistner to all 
  addButton.addEventListener('click', addCard);
});

function addCard(event) {
  const addButton = event.target;
  const list = addButton.parentNode; //  

  const card = document.createElement('div');
  card.contentEditable = true;
  card.draggable = true;
  card.className = 'card';
  card.style.display = 'inline-block'; //  display to inline-block
  card.style.wordWrap = 'break-word'; //  word-wrap property to break-word so that the word should break
  card.style.minHeight = '2.7rem'; // Set min-height to 2rem
  card.style.height = 'auto'; // Set height to auto so that the height hould increase ac ording to text
  card.style.border = 'none';
  card.style.outline = 'none';
  card.style.borderRadius = '10px';
  card.style.boxShadow = '5px 5px 5px 5px #81848b';
  card.style.width = '18rem';
  card.style.fontSize = '14px';
  card.style.paddingTop = '10px';
  card.style.textAlign = 'left';
  card.style.boxShadow = '0 1px 0 rgba(9,30,66,.25)';
  card.style.background = 'white';
  card.style.marginTop = '10px';
  card.style.marginLeft = '10px';
  card.style.marginBottom = '3px';

  //  the new card before the button so that the div should comes above the button
  list.insertBefore(card, addButton);

  const maxHeight = 500; // Set your desired maximum height here
  const currentHeight = list.offsetHeight; // Get the current height of the list
  const newHeight = currentHeight + card.offsetHeight; // Calculate the new height

  if (newHeight > maxHeight) {
    list.style.height = `${maxHeight}px`;
    list.style.overflowY = 'scroll';
  } else {
    list.style.height = `${newHeight}px`;
  }

  addButton.scrollIntoView({ behavior: 'smooth', block: 'end' });

// drag and drop + touch 
card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragover', dragOver);
  card.addEventListener('dragleave', dragLeave);
  card.addEventListener('drop', drop);
  card.addEventListener('touchstart', touchStart);
  card.addEventListener('touchmove', touchMove);
  card.addEventListener('touchend', touchEnd);
}

let dragCard = null;
let targetList = null; // to keep track of the list where the card should be dropped.

function dragStart(event) {
  const card = event.target;
  dragCard = card;
  card.style.opacity = '0.8';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', card.innerHTML);
}

function dragOver(event) {
  event.preventDefault();
  const card = event.target;
  card.style.opacity = '0.8';
}

function dragLeave(event) {
  const card = event.target;
  card.style.border = 'none';
}

function drop(event) {
  event.preventDefault();
  const card = event.target;
  card.style.border = 'none';
  card.style.opacity = '1';
  card.style.background='#ffffff'
  const list = card.parentNode;
  list.insertBefore(dragCard, card);
  dragCard = null;
}
function touchStart(event) {
  const card = event.target;
  dragCard = card;
  card.style.opacity = '0.8';
  targetList = card.parentNode; // Store the reference to the target list based on card parent node
}

function touchMove(event) {
  const card = event.target;
  card.style.position = 'fixed';
  card.style.top = event.touches[0].clientY + 'px';
  card.style.left = event.touches[0].clientX + 'px';
  event.preventDefault();
}

function touchEnd(event) {
  const card = event.target;
  card.style.position = 'static';
  card.style.opacity = '1';

  if (targetList !== null) {
    targetList.insertBefore(dragCard, card); // Insert the card back into the target list
  }

  dragCard = null;
  targetList = null;
}
























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
//   const list = card.parentNode;
//   list.insertBefore(dragCard, card);
//   dragCard = null;
// }



