// Create a Dropbox Chooser button

function chooserCallback(files) {
  if (files.length > 0) {
    // Get the first file's link
    var link = files[0].link;
    // Create an options object for embedding
    var options = {
      link: link,
      file: {
        zoom: "best"
      },
      folder: {
        view: "list",
        headerSize: "normal"
      }
    };
    // Get the element where you want to embed the file
    var element = document.getElementById("file-embedder");
    element.style.display = "block";
    // Call the embed function with the options and element
    Dropbox.embed(options, element);
  }
}

// Get the button element by its id
var button = document.getElementById("db-chooser");
// Add a click event listener to the button
button.addEventListener("click", function() {
  // Call the choose function with an options object and a callback function
  Dropbox.choose({
    success: chooserCallback,
    cancel: function() {},
    linkType: "direct",
    multiselect: false
  });
});

document.getElementById("db-sign").addEventListener("DbxSignSuccess", 
function(e) 
{ // e.file contains an object with information about the signed file 
  var file = e.file; // get the signed file 
  var link = file.link; // get the link to the signed file 
  var name = file.name; // get the name of the signed file 
  Dropbox.save(link, name); // invoke the Dropbox Saver to save the signed file back to Dropbox 
});