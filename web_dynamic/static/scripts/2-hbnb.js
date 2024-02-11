/* global $ */
$(document).ready(function () {
  const checkedAmenities = {};

  // Handler for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      // If checkbox is checked, store the Amenity ID in the checkedAmenities object
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      // If checkbox is unchecked, remove the Amenity ID from the checkedAmenities object
      delete checkedAmenities[$(this).data('id')];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    const amenityNames = Object.values(checkedAmenities);
    $('div.amenities h4').text(amenityNames.join(', '));
  });

  // Request to the API to check its status
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(apiUrl, function (data) {
    if (data.status === 'OK') {
      // If the status is "OK", add the class "available" to the div#api_status
      $('#api_status').addClass('available');
    } else {
      // Otherwise, remove the class "available" from the div#api_status
      $('#api_status').removeClass('available');
    }
  });
});
