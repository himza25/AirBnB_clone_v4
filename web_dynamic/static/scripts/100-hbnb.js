$(document).ready(function () {
  let checkedAmenities = {};
  let checkedStates = {};
  let checkedCities = {};

  // Check API status and update the status div
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Listen for changes on amenity checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
    let amenityId = $(this).data('id');
    if (this.checked) {
      checkedAmenities[amenityId] = $(this).data('name');
    } else {
      delete checkedAmenities[amenityId];
    }
    updateH4();
  });

  // Listen for changes on state checkboxes
  $('.locations .states input[type="checkbox"]').change(function () {
    let stateId = $(this).data('id');
    if (this.checked) {
      checkedStates[stateId] = $(this).data('name');
    } else {
      delete checkedStates[stateId];
    }
    updateH4();
  });

  // Listen for changes on city checkboxes
  $('.locations .cities input[type="checkbox"]').change(function () {
    let cityId = $(this).data('id');
    if (this.checked) {
      checkedCities[cityId] = $(this).data('name');
    } else {
      delete checkedCities[cityId];
    }
    updateH4();
  });

  function updateH4() {
    let textList = Object.values(checkedAmenities).concat(Object.values(checkedStates), Object.values(checkedCities));
    $('.filters h4').text(textList.join(', '));
  }

  // Fetch places and update UI based on selected amenities, states, and cities
  function fetchPlaces(data = {}) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (places) {
        $('.places').empty();
        places.forEach(function (place) {
          let placeArticle = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
          $('.places').append(placeArticle);
        });
      }
    });
  }

  // Filter places by selected amenities, states, and cities when the search button is clicked
  $('button').click(function () {
    fetchPlaces({
      amenities: Object.keys(checkedAmenities),
      states: Object.keys(checkedStates),
      cities: Object.keys(checkedCities)
    });
  });
});
