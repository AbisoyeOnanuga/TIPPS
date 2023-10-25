// Load the Dropbox Chooser script
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
script.id = 'dropboxjs';
script.setAttribute('data-app-key', '2585oqjb1y2unzo'); // replace with your own app key from Dropbox
document.head.appendChild(script);

// Launch the Dropbox Chooser when the button is clicked
document.getElementById("chooser-button").addEventListener("click", function() {
  Dropbox.choose({
    success: handleDropboxResult,
    linkType: 'direct',
    multiselect: false,
  });
});

// Handle the result from Dropbox Chooser
function handleDropboxResult(files) {
  if (files.length > 0) {
    var file = files[0]; // get the first file
    var link = file.link; // get the direct link to the file
    var url = 'https://docs.google.com/gview?url='+link+'&embedded=true'; // create a URL for the Google Docs Viewer
    var iframe = document.getElementById("embed-div"); // get the iframe element with id "embed-div"
    iframe.src = url; // set the src attribute of the iframe element to the viewer URL
    iframe.style.visibility = "visible"; // make the iframe element visible
    iframe.style.display = "block"; // make the iframe element take up space in the layout
  }
}

/*
// Handle the result from Dropbox Chooser
function handleDropboxResult(files) {
  if (files.length > 0) {
    var file = files[0]; // get the first file
    var link = file.link; // get the direct link to the file
    var url = 'https://docs.google.com/gview?url='+link+'&embedded=true'; // create a URL for the Google Docs Viewer
    document.getElementById("embed-div").src = url; // set the src attribute of the iframe element with id "file-viewer" to the viewer URL
  }
}
*/