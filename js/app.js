let index = 0;
let countriesListArray = [];

function countriesList() {
  let countriesList = document.getElementById("countriesList");
  let body = "";
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((dataList) => {
      countriesListArray = dataList;
      dataList.forEach((element) => {
        body += `<div class="col" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
                <div class="card shadow-sm">
                    <img src="${element.flags.png}" alt="${element.flags.alt}">
                    <h2 class="card-text">${element.name.common}</h2>
                  <div class="card-body">
                    <p class="card-text">Capital : ${element.capital}</p>
                    <p class="card-text">Region  : ${element.region}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" onclick = "loadModal(${index++})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    	                more info-->
                        </button>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>`;
      });
      countriesList.innerHTML = body;
    });
}
countriesList();

function loadModal(index) {
  let modalTitle = document.getElementById("staticBackdropLabel");
  modalTitle.innerHTML = `<h2>${countriesListArray[index].name.common}</h2>`;
  let totLanguages = "";
  let languages = Object.values(countriesListArray[index].languages); //get an languages details in every country

  for (let i = 0; i < languages.length; i++) {
    totLanguages += languages[i] + " ";
  }

  let modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
                        <img src="${countriesListArray[index].flags.png}" alt="">
                        <p>Official Name : ${countriesListArray[index].name.official}</p>
                        <p>Capital       : ${countriesListArray[index].capital}</p> 
                        <p>Region        : ${countriesListArray[index].region}</p>
                        <p>Sub Region    : ${countriesListArray[index].subregion}</p>
                        <p>Languages     : ${totLanguages}</p>
                        <p>Time-Zone     : ${countriesListArray[index].timezones}</p>
                        <p>Start of Week     : ${countriesListArray[index].startOfWeek}</p>
                        <p>Population     : ${countriesListArray[index].population}</p>
                        <a href="${countriesListArray[index].maps.googleMaps}">Google Map</a>
  `;
}

function loadCountryDetails() {
  let searchedCountry = document
    .getElementById("default-search")
    .value.trim()
    .toLowerCase();
  let position = countriesListArray.findIndex(
    (country) => country.name.common.toLowerCase() === searchedCountry
  );

  if (position !== -1) {
    loadModal(position);
    let modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
    modal.show();
  } else {
    alert("Country Not Found...");
  }
}
