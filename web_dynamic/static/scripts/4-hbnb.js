$(document).ready(function () {
  let checkedAmenities = {};

  // Check API status and update the status div
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Listen for changes on amenity checkboxes
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }

    // Display the selected amenities
    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });

  // Fetch places and update UI
  function fetchPlaces(data = {}) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (places) {
        $('.places').empty(); // Clear the places section
        for (let place of places) {
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
          $('.places').append(placeArticle); // Append the place to the places section
        }
      }
    });
  }

  // Initial fetch of all places
  fetchPlaces({});

  // Filter places by selected amenities when the search button is clicked
  $('button').click(function () {
    let amenityIds = Object.keys(checkedAmenities);
    fetchPlaces({amenities: amenityIds});
  });
});
