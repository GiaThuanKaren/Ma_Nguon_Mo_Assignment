import pdfkit
import requests
# html_link ="https://drive.google.com/file/d/1blCkibb2iFgM3YMWwB13xTgOUhQcn6OM/view?usp=share_link"
# file_id = html_link.split("/")[-2]
# # Construct the URL to download the file
# download_url = f"https://drive.google.com/uc?id={file_id}&export=download"

# # Download the HTML file as a string
# html_string = requests.get(download_url).text

# Convert the HTML string to a PDF file
pdfkit.from_file("./2.html","output.pdf")
# https://drive.google.com/file/d/1blCkibb2iFgM3YMWwB13xTgOUhQcn6OM/view?usp=share_link
