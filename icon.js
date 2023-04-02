const form = document.forms["icon_form"];

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(this);

  //!DEBUG
  console.log(formData);

  var icon_counter = 0;
  var dd_counter = 0;
  for (const formElement of formData) {
    // count number of selections
    if (formElement[0].indexOf("_dd") != -1) {
      dd_counter += 1;
    } else {
      icon_counter += 1;
    }
  }
  // handle too many checkboxes selcted
  if (icon_counter > 5) {
    alert("Too many icons selected. Please select 5 or less icons.")
    form.reset();
    return;

  } else if ( dd_counter > 5) {
    alert("Too many drop down items selected. Please select 5 or less items.")
    form.reset();
    return;
  } else if (dd_counter == 0 && icon_counter == 0) {
    alert("Nothing selected.")
    form.reset();
    return;
  }


  // TODO: make sure no unpaired dd selected

  // Convert to JSON, and write the file
  let object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  let json = JSON.stringify(object);
  console.log(json);

  // download the file
 
   let a = document.createElement('a');
a.href = "data:application/octet-stream,"+encodeURIComponent(json);
a.download = 'icon_select_tool.txt';
alert("Your selections have been downloaded to the file: icon_select_tool.txt", a.click());



});