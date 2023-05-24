import Swal from "sweetalert2";
import "./style.css";

const button = document.querySelector("button");
const coinTitle = document.querySelector("h2");
const mainContent = document.querySelector("#main-content");

function createDiv(key, value) {
  const newDiv = document.createElement("div");
  newDiv.className = "content";
  mainContent.appendChild(newDiv);
  const description = document.createElement("p");
  const coinValue = document.createElement("p");
  newDiv.appendChild(description);
  newDiv.appendChild(coinValue);
  description.innerHTML = key;
  description.className = "coin-name";
  coinValue.innerHTML = value;
  coinValue.className = "coin-value";
}

function validateInput() {
  const inputValue = document.querySelector("#text-input").value;
  if (!inputValue) {
    return false;
  } else {
    return true;
  }
}

function clearInput() {
    return document.querySelector("#text-input").value = '';
}

button.addEventListener("click", () => {
  if (validateInput() === false) {
    return Swal.fire("Você precisa passar uma moeda");
  } else {
    let coin = document.querySelector("#text-input").value;
    mainContent.innerHTML = "";
    fetch(`https://api.exchangerate.host/latest?base=${coin}`)
      .then((response) => response.json())
      .then((data) => {
        const { rates } = data;
        const ratesInfo = Object.entries(rates);
        if (Object.keys(rates).includes(coin) === false) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Moeda não existente!",
            })
        } else {
            coinTitle.innerHTML = `Valores referentes a 1 ${coin}`;
          ratesInfo.forEach((el) => createDiv(el[0], el[1]));
        }
      })
      .catch((error) => Swal.fire(error.message));
  }
    clearInput();
});
