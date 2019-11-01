let addToy = false
const TOYS_URL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  loadToys();
  initializePostForm(toyForm);
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function initializePostForm(form)
{
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        let name = ev.target.elements.name.value;
        let img = ev.target.elements.image.value;

        fetch(TOYS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: name,
                image: img,
                likes: 0
            })
        })
        .then(res => res.json())
        .then(toy => {
            let toyElement = createToy(toy)
            let toyColl = document.getElementById("toy-collection")
            toyColl.prepend(toyElement);
        })
        
    })
}

function loadToys()
{
    fetch(TOYS_URL)
    .then(res => {return res.json();})
    .then(json => {
        const toyArray = json;
        displayToys(toyArray);
    })
}

function displayToys(toyArray)
{
    let toyColl = document.getElementById("toy-collection")
    for (let i = 0; i < toyArray.length; i++)
    {
        let toyDisplay = document.createElement("div");
        let name = document.createElement("h2");
        let imgTag = document.createElement("img");
        let likes = document.createElement("p");
        let likeButton = document.createElement("button");

        toyDisplay.class = 'card';
        imgTag.class = 'toy-avatar';
        likeButton.class = 'like-btn';
        likeButton.textContent = 'Like <3';
        
        name.textContent = toyArray[i]["name"];

        let att = document.createAttribute('src');
        att.value = toyArray[i]["image"];
        imgTag.setAttributeNode(att);

        likes.textContent = ` ${toyArray[i]["likes"]} Likes `;

        toyDisplay.appendChild(name);
        toyDisplay.appendChild(imgTag);
        toyDisplay.appendChild(likes);
        toyDisplay.appendChild(likeButton);
        likeButton.addEventListener('click', () => {
            incrementLikes(toyArray[i], toyDisplay)
            likes.textContent = ` ${toyArray[i]["likes"]} Likes `;
        })
        toyColl.appendChild(toyDisplay);
        
    }
}

function createToy(submission)
{
    let toyDisplay = document.createElement("div");
    let name = document.createElement("h2");
    let imgTag = document.createElement("img");
    let likes = document.createElement("p");
    let likeButton = document.createElement("button");

    toyDisplay.class = 'card';
    imgTag.class = 'toy-avatar';
    likeButton.class = 'like-btn';
    likeButton.textContent = 'Like <3';

    name.textContent = submission.name
    let att = document.createAttribute('src');
    att.value = submission.image;
    imgTag.setAttributeNode(att);
    likes.textContent = 0

    toyDisplay.appendChild(name);
    toyDisplay.appendChild(imgTag);
    toyDisplay.appendChild(likes);
    toyDisplay.appendChild(likeButton);
    return toyDisplay;
}

function incrementLikes(toy, entireDisplay)
{
    //toy["likes"]++;

    fetch(TOYS_URL + '/' + toy.id, {
        method: 'PATCH',
        headers: 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "likes": toy.likes++
            })
    })
}
    

/*let imgTag = document.createElement(‘img’);
   let att = document.createAttribute(‘src’);
   att.value = imgUrl;
   imgTag.setAttributeNode(att);
   imgNode.appendChild(imgTag);
   */
