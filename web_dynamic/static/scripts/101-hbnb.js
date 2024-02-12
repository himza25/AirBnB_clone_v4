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

  // Update the text of the H4 element with selected amenities, states, and cities
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
          // Append place details here
          // Make sure to include a container for reviews similar to the HTML structure
        });
      }
    });
  }

  // Initial fetch of all places
  fetchPlaces({});

  // Filter places by selected amenities, states, and cities when the search button is clicked
  $('button').click(function () {
    let amenityIds = Object.keys(checkedAmenities);
    fetchPlaces({amenities: amenityIds, states: Object.keys(checkedStates), cities: Object.keys(checkedCities)});
  });

  // Toggle reviews visibility
  $(document).on('click', '.toggle-reviews', function () {
    const placeId = $(this).data('place-id'); // Ensure you have a data-place-id attribute on each place's review toggle span
    const reviewsContainer = $(`[data-place-id="${placeId}"] .reviews-list`);

    if ($(this).text() === 'show') {
      // Fetch and display the reviews
      $.get(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`, function (reviews) {
        reviews.forEach(function (review) {
          const reviewHTML = `<div class="review">${review.text} - ${review.user_id}</div>`; // Simplified review display
          reviewsContainer.append(reviewHTML);
        });
        $(`[data-place-id="${placeId}"] .toggle-reviews`).text('hide');
      });
    } else {
      // Hide the reviews
      reviewsContainer.empty();
      $(`[data-place-id="${placeId}"] .toggle-reviews`).text('show');
    }
  });
});
