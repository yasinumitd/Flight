import data from "./fligthJSONList.JSON" assert { type: "json" };

const flightOptions = data.response.itineraryList[0].flightOptionList;

const flightListContainer = document.getElementById("flightList");

function showFlights() {
  flightListContainer.innerHTML = ""; 

  flightOptions.forEach(flightOption => {
    const flightContainer = createFlightContainer(flightOption);
    flightListContainer.appendChild(flightContainer);
  });
}

function createFlightContainer(flightOption) {
  const flightContainer = document.createElement("div");
  flightContainer.classList.add("container");

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("flightContainer", "innerContainer");

  const departureCity = document.createElement("div");
  departureCity.classList.add("textCity");
  departureCity.textContent = flightOption.departureAirport.name;

  const toText = document.createElement("div");
  toText.classList.add("textCity");
  toText.textContent = "to";

  const arrivalCity = document.createElement("div");
  arrivalCity.classList.add("textCity");
  arrivalCity.textContent = flightOption.arrivalAirport.name;

  innerContainer.appendChild(departureCity);
  innerContainer.appendChild(toText);
  innerContainer.appendChild(arrivalCity);

  const timeCodeContainer = document.createElement("div");
  timeCodeContainer.classList.add("timeCodeContainer");

  const timeContainer = document.createElement("div");
  timeContainer.classList.add("timeContainer");

  const departureTime = document.createElement("div");
  departureTime.classList.add("time", "text");
  departureTime.textContent = flightOption.departureTime;

  const arrowText = document.createElement("div");
  arrowText.classList.add("text");
  arrowText.textContent = "==>";

  const arrivalTime = document.createElement("div");
  arrivalTime.classList.add("time", "text");
  arrivalTime.textContent = flightOption.arrivalTime;

  timeContainer.appendChild(departureTime);
  timeContainer.appendChild(arrowText);
  timeContainer.appendChild(arrivalTime);

  const airportCode = document.createElement("div");
  airportCode.classList.add("airportCode");

  const departureAirportCode = document.createElement("div");
  departureAirportCode.classList.add("text");
  departureAirportCode.textContent = flightOption.departureAirport.code;

  const arrowText2 = document.createElement("div");
  arrowText2.classList.add("text");
  arrowText2.textContent = "==>";

  const arrivalAirportCode = document.createElement("div");
  arrivalAirportCode.classList.add("text");
  arrivalAirportCode.textContent = flightOption.arrivalAirport.code;

  airportCode.appendChild(departureAirportCode);
  airportCode.appendChild(arrowText2);
  airportCode.appendChild(arrivalAirportCode);

  timeCodeContainer.appendChild(timeContainer)
  timeCodeContainer.appendChild(airportCode)

  const priceContainer = document.createElement("div");
  priceContainer.classList.add("priceContainer");

  const price = document.createElement("div");
  price.textContent = flightOption.fareOptionList[0].priceInRequestedCurrency + "TL";

  priceContainer.appendChild(price);

  flightContainer.appendChild(innerContainer);
  flightContainer.appendChild(timeCodeContainer);
  flightContainer.appendChild(priceContainer);

  return flightContainer;
}

function hasConnection(flightOption) {
  return flightOption.flightList.length > 1;
}



var showConnections;
function filterFlights() {
  flightListContainer.innerHTML = ""; 

  const filteredOptions = flightOptions.filter(flightOption => {
    return showConnections ? hasConnection(flightOption) : !hasConnection(flightOption);
  });

  filteredOptions.forEach(flightOption => {
    const flightContainer = createFlightContainer(flightOption);
    flightListContainer.appendChild(flightContainer);
  });
}
const buttonsContainer = document.getElementById("buttonsContainer");

const showAllButton = document.createElement("button");
showAllButton.textContent = "Show All Flights";
showAllButton.classList.add("button")

showAllButton.addEventListener("click", () => {
  showConnections = true;
  showFlights();
});

const showConnectionsButton = document.createElement("button");
showConnectionsButton.textContent = "Show Connections";
showConnectionsButton.classList.add("button")

showConnectionsButton.addEventListener("click", () => {
  showConnections = true;
  filterFlights();
});

const showNonConnectionsButton = document.createElement("button");
showNonConnectionsButton.textContent = "Show Non-Connections";
showNonConnectionsButton.classList.add("button")

showNonConnectionsButton.addEventListener("click", () => {
  showConnections = false;
  filterFlights();
});
buttonsContainer.appendChild(showAllButton)
buttonsContainer.appendChild(showConnectionsButton)
buttonsContainer.appendChild(showNonConnectionsButton)



function filterFlightsPrice(minPrice, maxPrice) {
  flightListContainer.innerHTML = ""; 

  const filteredOptions = flightOptions.filter(flightOption => {
    const price = flightOption.fareOptionList[0].priceInRequestedCurrency;
    return price >= minPrice && price <= maxPrice;
  });

  filteredOptions.forEach(flightOption => {
    const flightContainer = createFlightContainer(flightOption);
    flightListContainer.appendChild(flightContainer);
  });
}

const priceButtons = [
  { label: "10000 - 25000 TL", minPrice: 10000, maxPrice: 25000 },
  { label: "25000 - 40000 TL", minPrice: 25000, maxPrice: 40000 },
  { label: "40000+ TL", minPrice: 40000, maxPrice: Infinity }
];

priceButtons.forEach(button => {
  const priceButton = document.createElement("button");
  priceButton.textContent = button.label;
  priceButton.classList.add("button")
  priceButton.addEventListener("click", () => {
    filterFlightsPrice(button.minPrice, button.maxPrice);
  });
  buttonsContainer.appendChild(priceButton)
  
});

showFlights();
