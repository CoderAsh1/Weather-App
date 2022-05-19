let content = document.querySelector(".content");
let result = document.querySelector(".result");
let tempresult = result.querySelector(".numb");
let arrow = document.querySelector("#arrow-back");
let input = document.querySelector("#location-input");
let feelsLike = result.querySelector(".feels");
let cityName = result.querySelector("#location");
let images = result.querySelector("#images");
let locButton = document.querySelector("#locButton");
let api;
let response;

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
  codeid = response.weather[0].id;
  dynamicImg(codeid);
};

//geoLocation................................................

let accessedLoc = async (position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  api = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce6df84c4c96611f55a9124eb7d907f1`
  );
  let response = await api.json();
  content.classList.remove("active");
  result.classList.add("active");
  arrow.classList.add("active");

  let city = response.main.temp - 273.15;
  tempresult.innerHTML = city.toFixed(2);
  feelsLike.textContent = response.weather[0].description;
  cityName.textContent = `${response.name}, ${response.sys.country}`;
  console.log(city);
  codeid = response.weather[0].id;
  dynamicImg(codeid);
};

let errorInLoc = (error) => {
  console.error(error);
};

locButton.addEventListener("click", () => {
  return navigator.geolocation.getCurrentPosition(accessedLoc, errorInLoc);
});

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
