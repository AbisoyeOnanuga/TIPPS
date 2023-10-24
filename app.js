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
/*
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
      // Get the file link
      var fileLink = file.link;
      // Get the anchor element by its id
      var embedLink = document.getElementById("embed-link");
      // Set the href attribute of the anchor element to the file link
      embedLink.setAttribute("href", fileLink);
    }
  });
});
*/

document.getElementById("chooser-button").addEventListener("click", function() {
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
      // Get the file link
      var fileLink = file.link;
      // Get the input element by its id
      var linkInput = document.getElementById("link-input");
      // Set the value of the input element to the file link
      linkInput.value = fileLink;
    }
  });
});

document.getElementById("embed-button").addEventListener("click", function() {
  // Get the input element by its id
  var linkInput = document.getElementById("link-input");
  // Get the value of the input element
  var fileLink = linkInput.value;
  // Get the div element by its id
  var embedDiv = document.getElementById("embed-div");
  // Invoke the Dropbox Embedder
  Dropbox.embed({
    // Specify the file link to embed
    link: fileLink,
    // Specify the container element to display the embedded file
    element: embedDiv
  });
});