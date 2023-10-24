// Create a Dropbox Chooser button
/*
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
*/

document.getElementById("db-chooser").addEventListener("click", function() {
  // Invoke the Dropbox Chooser
  Dropbox.choose({
    // Specify the file types to show
    extensions: ['.pdf', '.docx'],
    // Specify the link type to use
    linkType: "direct",
    // Specify the callback function when a file is selected
    success: function(files) {
      // Get the first file object from the array
      var file = files[0];
      // Get the file name and link
      var fileName = file.name;
      var fileLink = file.link;
      // Invoke the Dropbox Embedder
      Dropbox.embed({
        // Specify the file link to embed
        link: fileLink,
        // Specify the container element to display the embedded file
        element: document.getElementById("embed-container")
      });
    }
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