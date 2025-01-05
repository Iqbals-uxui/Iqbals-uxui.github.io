document.addEventListener("DOMContentLoaded", () => {
  const worldMap = document.getElementById("world-map");
  const countryName = document.getElementById("country-name");
  const continentName = document.getElementById("continent-name");
  const currencyName = document.getElementById("currency-name");

  worldMap.addEventListener("load", () => {
    const svgDoc = worldMap.contentDocument; // Access the SVG document inside the object
    const countries = svgDoc.querySelectorAll("[id]"); // Select all countries with an ID

    countries.forEach((country) => {
      country.addEventListener("click", () => {
        const countryID = country.id;
        const countryInfo = countryData[countryID];

        if (countryInfo) {
          countryName.innerHTML = `<strong>Country:</strong> ${countryInfo.name}`;
          continentName.innerHTML = `<strong>Continent:</strong> ${countryInfo.continent}`;
          currencyName.innerHTML = `<strong>Currency:</strong> ${countryInfo.currency}`;
        } else {
          countryName.innerHTML = `<strong>Country:</strong> Unknown`;
          continentName.innerHTML = `<strong>Continent:</strong> Unknown`;
          currencyName.innerHTML = `<strong>Currency:</strong> Unknown`;
        }
      });
    });
  });
});
