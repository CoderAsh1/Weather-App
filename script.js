let content = document.querySelector(".content");
let result = document.querySelector(".result");
let tempresult = result.querySelector(".numb");
let arrow = document.querySelector("#arrow-back");
let input = document.querySelector("#location-input");
let feelsLike = result.querySelector(".feels");
let cityName = result.querySelector("#location");
let images = result.querySelector("#images");
let locButton = document.querySelector("#locButton");
let darktheme = document.querySelector("#day");
let darktheme2 = document.querySelector("#night");
let myBody = document.querySelector("#myBody");
let container = document.querySelector(".container");
let or = document.querySelector(".or");
let api;
let response;

darktheme.addEventListener("click", () => {
  myBody.classList.add("gray");
  container.classList.add("black");
  content.classList.add("black");
  darktheme.classList.add("disp");
  darktheme2.classList.remove("disp");
  input.classList.add("gray");
  or.classList.add("gray");
});
darktheme2.addEventListener("click", () => {
  myBody.classList.remove("gray");
  container.classList.remove("black");
  content.classList.remove("black");
  darktheme2.classList.add("disp");
  darktheme.classList.remove("disp");
  input.classList.remove("gray");
  or.classList.remove("gray");
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && input.value != "") {
    requestApi(input.value);

    setTimeout(() => {
      content.classList.remove("active");
      result.classList.add("active");
      arrow.classList.add("active");
    }, 1000);
  }
});

//For Back Button ------------------------------------------------------------

arrow.addEventListener("click", () => {
  content.classList.add("active");
  result.classList.remove("active");
  arrow.classList.remove("active");
});

let requestApi = async (city) => {
  api = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce6df84c4c96611f55a9124eb7d907f1`
  );
  let response = await api.json();
  if (response.cod == 404) {
    result.innerHTML = "City not Found";
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  console.log(response);
  city = response.main.temp - 273.15;
  console.log(city.toFixed(2));
  tempresult.innerHTML = city.toFixed(2);
  feelsLike.textContent = response.weather[0].description;
  cityName.textContent = `${response.name}, ${response.sys.country}`;
  let codeid = response.weather[0].id;
  dynamicImg(codeid);
};

//geoLocation................................................

locButton.addEventListener("click", () => {
  return navigator.geolocation.getCurrentPosition(accessedLoc, errorInLoc);
});

let accessedLoc = async (position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  api = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce6df84c4c96611f55a9124eb7d907f1`
  );
  content.classList.remove("active");
  result.classList.add("active");
  arrow.classList.add("active");

  let response = await api.json();
  let city = response.main.temp - 273.15;
  tempresult.innerHTML = city.toFixed(2);
  feelsLike.textContent = response.weather[0].description;
  cityName.textContent = `${response.name}, ${response.sys.country}`;
  console.log(city);
  let codeid = response.weather[0].id;
  dynamicImg(codeid);
};

let errorInLoc = (error) => {
  console.error(error);
  result.classList.add("active");
  result.innerHTML = "Location Permisson Denide";
  result.style.color = "red";
  result.style.backgroundColor = "rgb(204, 197, 197)";
  result.style.padding = ".6rem";
  result.style.borderRadius = "10px";
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

function dynamicImg(codeid) {
  if (codeid == 721) {
    images.src = "icons/haze.svg";
  }
  if (codeid == 800) {
    images.src = "icons/clear.svg";
  }
  if (codeid >= 600 && codeid <= 622) {
    images.src = "icons/snow.svg";
  }
  if (codeid >= 500 && codeid <= 531) {
    images.src = "icons/rain.svg";
  }
  if (codeid >= 200 && codeid <= 232) {
    images.src = "icons/storm.svg";
  }
  if (codeid > 800 && codeid <= 804) {
    images.src = "icons/cloud.svg";
  }
  if (codeid >= 300 && codeid <= 321) {
    images.src = "icons/drizzle.png";
  }
}
