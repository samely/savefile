
## Context
This project is a sample of an API meant to read a `.csv` file and upload its content to a data base.

### Assumptions
#### About `.csv` headers
Assuming that the headers of the CSV could:
- differ to the names specified in the database model, there is a layout functionality that maps the names before uploading the data into the database.
- be in a random order, which is handled by converting the CSV to JSON.

### Design
- The chosen architecture style is REST over HTTP using JSON.
- The language used in Node.js alongside the express.js framework.
- The `.cvs` input file is uploaded to the server to more efficient processing and streaming of data (to handle big loads)