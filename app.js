// Get the elements
var uploadArea = document.getElementById("upload-area");
var fileInput = document.getElementById("file-input");
var uploadBtn = document.getElementById("upload-btn");

// Define a function to prevent default behavior
function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Define a function to handle the dragenter event
function handleDragEnter(e) {
    preventDefault(e);
    // Add a class to indicate dragover
    uploadArea.classList.add("dragover");
}

// Define a function to handle the dragleave event
function handleDragLeave(e) {
    preventDefault(e);
    // Remove the class to indicate dragover
    uploadArea.classList.remove("dragover");
}

// Define a function to handle the drop event
function handleDrop(e) {
    preventDefault(e);
    // Remove the class to indicate dragover
    uploadArea.classList.remove("dragover");
    // Get the dropped file
    var file = e.dataTransfer.files[0];
    // Set the file input value to the dropped file
    fileInput.files = e.dataTransfer.files;
    // Change the text of the upload area
    uploadArea.innerHTML = "File selected: " + file.name;
}

// Define a function to handle the click event on the upload area
function handleClick(e) {
    preventDefault(e);
    // Trigger a click on the file input
    fileInput.click();
}

// Define a function to handle the change event on the file input
function handleChange(e) {
    preventDefault(e);
    // Get the selected file from the input
    var file = fileInput.files[0];
    // Change the text of the upload area
    uploadArea.innerHTML = "File selected: " + file.name;
}

// Define a function to handle the click event on the upload button
function handleUpload(e) {
    preventDefault(e);
    // Get the selected file from the input
    var file = fileInput.files[0];
    
    if (file) {
    // Create a new FormData object
    var formData = new FormData();
    // Append the file to the form data
    formData.append("file", file);
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    // Set the request method and URL
    xhr.open("POST", "/upload"); // Change this to your upload URL
    // Set some headers for the request
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    // Define a function to handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the response as JSON
        var response = JSON.parse(xhr.responseText);
        // Check if the upload was successful
        if (response.status === "success") {
            // Change the text of the upload area
            uploadArea.innerHTML = "File uploaded successfully";
        } else {
            // Change the text of the upload area
            uploadArea.innerHTML = "File upload failed";
        }
        }
    };
    // Send the request with the form data
    xhr.send(formData);
    } else {
    // Change the text of the upload area
    uploadArea.innerHTML = "No file selected";
    }
}

// Add event listeners for the drag and drop events
uploadArea.addEventListener("dragenter", handleDragEnter, false);
uploadArea.addEventListener("dragover", preventDefault, false);
uploadArea.addEventListener("dragleave", handleDragLeave, false);
uploadArea.addEventListener("drop", handleDrop, false);

// Add event listeners for the click events
uploadArea.addEventListener("click", handleClick, false);
fileInput.addEventListener("change", handleChange, false);
uploadBtn.addEventListener("click", handleUpload, false);



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