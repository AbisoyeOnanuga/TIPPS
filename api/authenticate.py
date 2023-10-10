import requests
import dropbox

import os
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
APP_KEY = os.getenv("APP_KEY")
APP_SECRET = os.getenv("APP_SECRET")

# Create a flow object and generate an authorization URL
flow = dropbox.DropboxOAuth2FlowNoRedirect(APP_KEY, APP_SECRET)
authorize_url = flow.start()
print(f"Please go to this URL: {authorize_url}")

# Get the authorization code from the user
code = input("Enter the authorization code: ")

# Exchange the authorization code for an access token and a refresh token
oauth_result = flow.finish(code)
access_token = oauth_result.access_token
refresh_token = oauth_result.refresh_token

# Store the refresh token securely in your app
# For example, in a .env file
with open(".env", "w") as f:
    f.write(f"REFRESH_TOKEN={refresh_token}")

# Create a Dropbox object with the access token and the refresh token
dbx = dropbox.Dropbox(
    oauth2_access_token=access_token,
    oauth2_refresh_token=refresh_token,
    app_key=APP_KEY,
    app_secret=APP_SECRET,
)

# Use the Dropbox object to make API calls
# For example, to get the account information
account_info = dbx.users_get_current_account()
print(f"Account name: {account_info.name.display_name}")

# When the access token expires or becomes invalid, refresh it with the refresh token
dbx.check_and_refresh_access_token()
new_access_token = dbx._oauth2_access_token

# Use the new access token to make API calls
# For example, to list the files in the root folder
entries = dbx.files_list_folder("").entries
print(f"Files in the root folder: {[entry.name for entry in entries]}")