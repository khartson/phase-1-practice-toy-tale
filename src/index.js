let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// GET Request: Add toys to the DOM 

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#toy-collection");
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    for (toy in data){
      renderToy(data[toy]); 
    }
  })
})

function renderToy(toy) {
    const container = document.querySelector("#toy-collection");
    let div = document.createElement('div');
    div.className = 'card'; 
    let h2 = document.createElement('h2');
    h2.innerText = toy.name;
    let img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';
    let p = document.createElement('p');
    p.innerText = `${toy.likes} Likes`
    let btn = document.createElement('button');
    btn.innerText = 'Like'; 
    btn.className = 'like-btn';
    btn.id        = toy.id;
    btn.addEventListener('click', handleClick);
    div.appendChild(h2); 
    div.appendChild(img);
    div.appendChild(p); 
    div.appendChild(btn);
    container.append(div); 
}

// POST Request: Add toys with form
document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let name  = document.querySelectorAll('.input-text')[0].value;
  let image = document.querySelectorAll('.input-text')[1].value;
  
  const inputData = {
    name: `${name}`,
    image: `${image}`,
    likes: 0
  };
  
  const configure = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(inputData),
  };
  fetch("http://localhost:3000/toys", configure)
  .then(response => response.json())
  .then(toy => renderToy(toy));
})

// PATCH Request: Edit number of likes on a toy

function handleClick(e) {
  currentLikes = parseInt(e.target.previousElementSibling.innerText);
  e.target.previousElementSibling.innerText = `${currentLikes+1} likes`; 
  const patch = {
    likes: currentLikes + 1, 
  };
  const configure = {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(patch)
  };
  fetch(`http://localhost:3000/toys/${e.target.id}`, configure)
}