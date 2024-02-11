$(document).ready(() => {
  let amenities = {};
  $('input[type="checkbox"]').change(() => {
    let checkBoxs = $('input[type = "checkbox"]')
    for (let i = 0; i < checkBoxs.length; i++) {
      let key = $(checkBoxs[i]).attr('data-id');
      if ($(checkBoxs[i]).prop('checked')) {
        if (!(key in amenities)) {
          amenities[key] = $(checkBoxs[i]).attr('data-name');
        }
      } else {
        if (key in amenities) {
          delete amenities[key];
        }
      }
    }
    let amenText = $(".amenities h4");
    amenText.css("text-overflow", "ellipsis");
    amenText.css("white-space", "nowrap");
    amenText.html("&nbsp;");
    initWidth = amenText.width();
    let i = 0, b = 0;
    for (let key in amenities) {
      if ($(".amenities h4").width() > initWidth) {
        amenText.append('...');
        break;
      }
      if (i >= 1) {
        amenText.append(", ");
      }
      amen = amenities[key]
      for (let j = 0; j < amen.length; j++) {
        if ($(".amenities h4").width() > initWidth) {
          amenText.append('...');
          b = 1;
          break;
        }
        amenText.append(amen[j]);
      }
      if (b) { break; }
      i++;
    }
  })
})
