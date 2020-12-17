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

  //new code

  const toyCollectionDiv = document.querySelector("#toy-collection")

  //initial fetch
  getToys = () => {
    fetch("http://localhost:3000/toys")
    .then( r => r.json())
    .then(resObj => {
      resObj.forEach(createToyCard)
      //for delegation
      // addEventsToLikeButtons()
    })
  }


  // delegation with innerHTML
  // createToyCard = (toyObj) => {
  //   toyCollectionDiv.innerHTML += `
  //     <div class="card" data-id=${toyObj.id}>
  //       <h2>${toyObj.name}</h2>
  //       <img src=${toyObj.image} class="toy-avatar" />
  //       <p>${toyObj.likes} Likes </p>
  //       <button class="like-btn">Like <3</button>
  //     </div>
  //   `
  // }

  //add likes

  //can use this for delegation and closure
  //with closure can add event listener directly to button when creating it

  // addEventsToLikeButtons = () => {
  //   const likeButtons = document.querySelectorAll(".like-btn")
  
  //   likeButtonEvent = (event) => {
  //     const likesP = event.target.previousElementSibling
  //     const toyID = event.target.parentElement.dataset.id
      
  //     fetch(`http://localhost:3000/toys/${toyID}`, {
  //       method: "PATCH",
  //       headers: 
  //       {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         "likes": parseInt(likesP.innerText) + 1
  //       })
  //     })
  //     .then( r => r.json())
  //     .then(resObj => {
  //       likesP.innerText = `${resObj.likes} likes`
  //     })
  //   }
  
  //   addEventToButtons = (button) => {
  //     button.addEventListener("click", likeButtonEvent)
  //   }
  
  //   likeButtons.forEach(addEventToButtons)
  // }

  //with closure
  //add likes
  likeButtonEvent = (event) => {
    const likesP = event.target.previousElementSibling
    const toyID = event.target.parentElement.dataset.id
    
    fetch(`http://localhost:3000/toys/${toyID}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": parseInt(likesP.innerText) + 1
      })
    })
    .then( r => r.json())
    .then(resObj => {
      likesP.innerText = `${resObj.likes} likes`
    })
  }

  addEventToButtons = (button) => {
    button.addEventListener("click", likeButtonEvent)
  }


  //closure
  createToyCard = (toyObj) => {
   const cardDiv = document.createElement("div")
   cardDiv.className = "card"
   cardDiv.dataset.id = toyObj.id
   
   const nameHeader = document.createElement("h2")
   nameHeader.innerText = toyObj.name
   
   const toyImage = document.createElement("img")
   toyImage.src = toyObj.image
   toyImage.className = "toy-avatar"
   
   const pLikes = document.createElement("p")
   pLikes.innerText = `${toyObj.likes} Likes`
   
   const likeButton = document.createElement("button")
   likeButton.className = "like-btn"
   likeButton.innerText = "Like <3"

   likeButton.addEventListener("click", likeButtonEvent)

   cardDiv.append(nameHeader, toyImage, pLikes, likeButton)
   toyCollectionDiv.append(cardDiv)
  }

  //grab from from DOM

  const newToyForm = document.querySelector(".add-toy-form")


  newToyFormEvent = (event) => {
    event.preventDefault()
    const newToyObj = {
      name: event.target.children[1].value,
      image: event.target.children[3].value
    }

    postNewToy(newToyObj)
  }

  newToyForm.addEventListener("submit", newToyFormEvent)


  postNewToy = (newToy) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify({
        "name": newToy.name,
        "image": newToy.image,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then(resObj => {
      createToyCard(resObj)
      // addEventsToLikeButtons()
    })
  }


  getToys()

});
