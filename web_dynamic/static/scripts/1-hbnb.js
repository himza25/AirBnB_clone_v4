$(document).ready(function () {
  let checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }

    let amenityNames = Object.values(checkedAmenities);
    $('div.amenities > h4').text(amenityNames.edy(function () {
  let checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }

    let amenityNames = Object.values(checkedAmenities);
    $('div.amenities > h4').text(amenityNames.join(', '));
  });
});
