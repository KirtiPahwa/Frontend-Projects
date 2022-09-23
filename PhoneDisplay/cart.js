var cartContainer = document.getElementsByClassName("cartContainer")[0];
var elements = "";
var cartItems = [];
let html = "";
window.onload = () => {
  cartItems = localStorage.getItem("cartItem");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems[0]);

  console.log(cartItems[0].title);
  for (let i = 0; i < cartItems.length; i++) {
    html += ` <div class="cartInnerContainer">
<div class="imgContainer">
<img src=${cartItems[i].product}>
</div>
<div class="cartInfo">
<h2>${cartItems[i].title}</h2>
<p>${cartItems[i].description}</p>
<h5>${cartItems[i].price} $</h5>
</div>
</div>`;
  }
  cartContainer.innerHTML += html;
};
