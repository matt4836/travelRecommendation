function search() {
  const keywords = ["beach", "count", "temple"];
  let searchInput = document.getElementById("input").value.toLowerCase();
  clearResults();
  if (keywords.some((keyword) => searchInput.startsWith(keyword))) {
    fetchData(searchInput);
  }
}

function clearResults() {
  document.getElementById("input").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

function fetchData(value) {
  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let displayableData = null;
      if (value.startsWith("b")) {
        displayableData = data.beaches;
      }
      if (value.startsWith("c")) {
        displayableData = data.countries;
      }
      if (value.startsWith("t")) {
        displayableData = data.temples;
      }
      displayData(displayableData);
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));

  function displayData(data) {
    let results = document.getElementById("searchResults");

    data.forEach((datum) => {
      const divElement = document.createElement("div");
      divElement.classList.add("item");
      const destinationElement = document.createElement("div");
      if (datum.hasOwnProperty("cities")) {
        datum.cities.forEach((city) => {
          destinationElement.innerHTML = `<h2>${city.name}</h2><img height="100px" src="${city.imageUrl}" alt="${city.name}"><p>${city.description}</p>`;
          divElement.appendChild(destinationElement);
        });
      } else {
        destinationElement.innerHTML = `<h2>${datum.name}</h2><img height="100px" src="${datum.imageUrl}" alt="${datum.name}"><p>${datum.description}</p>`;
        divElement.appendChild(destinationElement);
      }
      results.appendChild(divElement);
    });
  }
}
