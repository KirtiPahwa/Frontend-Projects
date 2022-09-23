var searchBox = document.getElementById("searchBox");
var arr = [];
fetch("https://dummyjson.com/products/")
  .then((res) => res.json())
  .then((data) => {
    data.products.map((product) => {
      arr.push(product.title);
      arr.push(product.description);
    });
  });
hideSearchingBox = () => {
  var searchingBox = document.getElementById("searchingBox");
  searchingBox.classList.remove("searchingBoxVisible");
  searchingBox.classList.add("searchingBoxHidden");
};
window.onscroll = () => {
  hideSearchingBox();
};
showSuggestionBox = (list) => {
  if (list.length > 0) {
    var searchingBox = document.getElementById("searchingBox");
    searchingBox.classList.remove("searchingBoxHidden");
    searchingBox.classList.add("searchingBoxVisible");
    searchingBox.innerHTML = list;
  }
};
searchBox.addEventListener("click", (e) => {
  let data = e.target.value;
  if (data != "") {
    var searchingBox = document.getElementById("searchingBox");
    searchingBox.classList.remove("searchingBoxHidden");
    searchingBox.classList.add("searchingBoxVisible");
  }
});
searchBox.addEventListener("input", (e) => {
  let data = e.target.value;
  var temp = arr;
  if (data == "") {
    var searchingBox = document.getElementById("searchingBox");
    searchingBox.classList.remove("searchingBoxVisible");
    searchingBox.classList.add("searchingBoxHidden");
    return;
  }
  var filtered = temp.filter((obj) => {
    return obj.toLocaleLowerCase().startsWith(data.toLocaleLowerCase());
  });
  filtered = filtered.map((e) => {
    return (e = `<li class="searchingBoxListItem">${e}</li>`);
  });
  showSuggestionBox(filtered);
  if (document.getElementById("searchingBox").style.display != "none") {
    var searchingBoxListItem = document.getElementsByClassName(
      "searchingBoxListItem"
    );

    for (let i = 0; i < searchingBoxListItem.length; i++) {
      searchingBoxListItem[i].setAttribute("onclick", "listItemSelected(this)");
    }
  }
});
var searchingBoxListItem = document.getElementsByClassName(
  "searchingBoxListItem"
);
function listItemSelected(element) {
  let a = element.innerText;
  searchBox.value = a;
  console.log(a);
}

var cartItems = [];
function addToCart(cartItem) {
  console.log("click", cartItem);
  cartItems.push(JSON.stringify(cartItem));
  localStorage.setItem("cartItem", JSON.stringify(cartItems));
}

fetchProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.total !== 0) {
        data.products.map((product) => {
          html += `
          <div class="card" >
          <div class="imageBox">
          <img src=${product.thumbnail}>
          </div>
          <div class="information">
              <h2>${product.title}</h2>  
              <p>${
                product.title.length > 30
                  ? product.description.substr(0, 120 - product.title.length) +
                    "...."
                  : product.description
              }
              </p> 
          </div>              
          <h4>${product.price} $</h4>

          <button class="cartBtn" type="button" onclick='addToCart(${JSON.stringify(
            product
          )})'>Add to Cart</button>

      </div>
          `;
        });
      } else {
        html += `<h1>Sorry, we didn't find any mobile!!</h1>`;
      }
      document.getElementsByClassName("container")[0].innerHTML += html;
    });
};
hideSearcheResults = () => {
  var searchContainer = document.getElementById("searchingContainer");
  if (searchContainer.style.display == "none") {
    searchContainer.classList.remove("searchedResultsVisible");
    searchContainer.classList.add("searchingBoxHidden");
  }
};
function backToHomePage() {
  // var
}
showSearchedResults = () => {
  var searchContainer = document.getElementsByClassName("searchContainer")[0];
  searchContainer.classList.remove("searchingBoxHidden");
  searchContainer.classList.add("searchedResultsVisible");
};
fetchSearchedData = (value) => {
  hideSearchingBox();
  var value = value.trim();
  if (value != "") {
    document.getElementsByClassName("container")[0].style.display = "none";
    showSearchedResults();
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        if (data.total !== 0) {
          data.products.map((product) => {
            html += `<div class="searchedItems">
            <div class="imgContainer">
            <img src="${product.thumbnail}">
            </div>
            <div class="info">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h5>${product.price} $</h5>
            </div>
            <button class="cartBtn" type="button" onclick='addToCart(${JSON.stringify(
              product
            )})'>Add to Cart</button>
        </div> `;
          });
        } else {
          html += `<h1>Not Found!!</h1>`;
        }

        document.getElementById("searchingContainer").innerHTML = html;
      });
  }
};

var form = document.getElementById("form");
if (form.addEventListener) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchSearchedData(searchBox.value);
  });
}

document
  .getElementById("searchBtn")
  .addEventListener(
    "submit",
    fetchSearchedData(document.getElementById("searchBox").value)
  );

window.onload = () => {
  hideSearcheResults();
  fetchProducts("https://dummyjson.com/products/");
};

