var cartIte = {};
var cartItems = [];

var cartContainer = document.getElementsByClassName("cartContainer")[0];
var elements = "";
let html = "";
window.onload = () => {
  cartItems = localStorage.getItem("cartItem");
  cartItems = JSON.parse(cartItems);
  for (let i = 0; i < cartItems.length; i++) {
    html += ` <div class="cartInnerContainer">
<div class="imgContainer">
<img src=${JSON.parse(cartItems[i]).thumbnail}>
</div>
<div class="cartInfo">
<h2>${JSON.parse(cartItems[i]).title}</h2>
<p>${JSON.parse(cartItems[i]).description}</p>
<h5>${JSON.parse(cartItems[i]).price} $</h5>
</div>
<button type="button" onclick='removeFromCart(${JSON.stringify(
      JSON.parse(cartItems[i])
    )})' class="removeCart">Remove from cart</button>
</div>`;
  }
  cartContainer.innerHTML += html;
};
function removeFromCart(cartIte) {
  for (let i = 0; i < cartItems.length; i++) {
    if (JSON.parse(cartItems[i]).id == cartIte.id) {
      console.log("Found");
      cartItems.splice(i, 1);
    }
  }
  localStorage.removeItem("cartItem");
  localStorage.setItem("cartItem", JSON.stringify(cartItems));
  location.reload();
}
