// Create a Dropbox Chooser button
document.getElementById("db-chooser").addEventListener("DbxChooserSuccess", 
function(e) 
{ // e.files contains an array of file objects for each selected file 
  var file = e.files[0]; // get the first file 
  var link = file.link; // get the direct link to the file 
  document.getElementById("file-embedder").style.display = "block"; // show the iframe element 
  Dropbox.embed(link, document.getElementById('file-embedder')); // invoke the Dropbox Embedder with the link and the iframe element 
});

document.getElementById("db-sign").addEventListener("DbxSignSuccess", 
function(e) 
{ // e.file contains an object with information about the signed file 
  var file = e.file; // get the signed file 
  var link = file.link; // get the link to the signed file 
  var name = file.name; // get the name of the signed file 
  Dropbox.save(link, name); // invoke the Dropbox Saver to save the signed file back to Dropbox 
});