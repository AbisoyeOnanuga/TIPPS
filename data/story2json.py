import os
import json
import chardet

# Define the path of your folder of .story files
folder_path = "./stories"

# Define the name of your output .json file
output_file = "cnnarticles.json"

# Define the maximum number of tokens allowed
max_tokens = 1024

# Create an empty list to store the examples
examples = []

# Loop through all the files in the folder
for file in os.listdir(folder_path):
    # Check if the file is a .story file
    if file.endswith(".story"):
        # Open the file and read its content
        with open(os.path.join(folder_path, file), "r", encoding='UTF-8') as f:
            content = f.read()
        # Split the content by the @highlight marker
        content = content.split("@highlight")
        # Get the article text and strip any whitespace
        article = content[0].strip()
        # Get the highlights text and join them by a newline character
        highlights = "\n".join(content[1:]).strip()
        # Get the file name without the extension as the id
        id = file[:-6]
        # Create a dictionary with the fields
        example = {"article": article, "highlights": highlights, "id": id}
        # Get the number of tokens in the article and highlights fields
        num_tokens = len(article.split()) + len(highlights.split())
        # Check if the number of tokens is within the limit
        if num_tokens > max_tokens:
            # Skip this file and move on to the next one
            continue
        # Append the example to the list
        examples.append(example)

# Open the output file and write the examples as JSON lines
with open(output_file, "w") as f:
    for example in examples:
        # Convert the example to a JSON string
        json_string = json.dumps(example)
        # Write the JSON string to the file followed by a newline character
        f.write(json_string + "\n")

# Print a message to indicate that the conversion is done
print("Conversion done. You can find your .json dataset in", output_file)