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
  
  const likes=(e)=> {
  e.preventDefault()
  const add = Number(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": add
      })
    })
    .then(r => r.json())
    .then((d => {
      e.target.previousElementSibling.innerText = `${add} likes`;
    }))
}


  const renderToys = toy => {
      const h2 = document.createElement('h2');
      h2.innerText = toy.name;
    
      const img = document.createElement('img');
      img.setAttribute('src', toy.image);
      img.classList.add('toy-avatar');
    
      const p = document.createElement('p');
      p.innerText = `${toy.likes} likes`;
    
      const btn = document.createElement('button');
      btn.classList.add("like-btn");
      btn.setAttribute('id', toy.id);
      btn.innerText = "like";
      
      btn.onClick= (e) => likes(e);
      
    
      const card = document.createElement('div');
        card.classList.add('card');
        card.append(h2, img, p, btn);
        divCollect.append(card);
  };



  const getToys=()=>  
    fetch('../db.json')
    .then(r => r.json()).then(d=>console.log(d));
    
    const postToy=(name,img)=> 
      fetch('../db.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": name.value,
          "image": img.value,
          "likes": 0
        })
    })
    .then(r => r.json())
    .then(d => renderToys(d));
    
    toyFormContainer.onsubmit=e=>{
      const inputs=document.getElementsByClassName("input-text");
      e.preventDefault();
      postToy(inputs[0].value,inputs[1].value);
    };

});
