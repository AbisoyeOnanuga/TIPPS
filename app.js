Dropbox.choose(options);

// Create a Dropbox Chooser button
var chooserOptions = {
  success: function(files) {
    // Enable the saver and download buttons
    document.getElementById("saver-button").disabled = false;
    document.getElementById("download-button").disabled = false;
    // Save the file link, name, and size
    document.getElementById("saver-button").dataset.link = files[0].link;
    document.getElementById("saver-button").dataset.name = files[0].name;
    document.getElementById("saver-button").dataset.size = files[0].bytes;
    document.getElementById("download-button").dataset.link = files[0].link;
    alert("Here's the file link: " + files[0].link);
  },
  cancel: function() {
    // Disable the saver and download buttons
    document.getElementById("saver-button").disabled = true;
    document.getElementById("download-button").disabled = true;
  },
  linkType: "direct", // or "preview"
  multiselect: false, // or true
};
var chooserButton = Dropbox.createChooseButton(chooserOptions);
document.getElementById("container").appendChild(chooserButton);

// Create a Dropbox Saver button
var saverButton = document.getElementById("saver-button");
saverButton.addEventListener("click", function() {
// Get the file link, name, and size from the dataset
var link = saverButton.dataset.link;
var name = saverButton.dataset.name;
var size = saverButton.dataset.size;
// Create a saver options object
var saverOptions = {
  files: [
    {
      url: link,
      filename: name,
      size: size,
    },
  ],
  success: function() {
    alert("File saved to Dropbox.");
  },
  progress: function(progress) {},
  cancel: function() {},
  error: function(errorMessage) {},
};
// Trigger the saver
Dropbox.save(saverOptions);
});