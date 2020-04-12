# CSV uploader API sample

An example of API to read data from a `.csv` file and upload it into a database.

_In this case we have a `.csv` file that contains vehicles data_

:point_right: Check [context](docs/context.md) for more information.


## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Install [node](https://nodejs.org/en/download/)
* Install [yarn](https://yarnpkg.com/getting-started/install)
* Download the project on your local machine by running 
```
git clone git@github.com:samely/savefile.git
```

### Installing
* Go to `savefile/` and install all the dependencies

```
yarn install
```

* For development and testing

```
yarn dev
```

### Build and start

* Build the project, which will create a `dist` folder from where the API will run

```
yarn build
```

* Start the API 
```
yarn start
```

## Running the tests
* Tests are in the `test` folder, run:

```
yarn test
```

## Built With

* [Express](https://expressjs.com/) - a web application framework for Node.js 
* [csvtojson](https://www.npmjs.com/package/csvtojson) - converts csv to json. A JSON approach helps to handle the uncertainty of the `csv` headers order.
* [morgan](https://www.npmjs.com/package/morgan) - an HTTP request logger middleware, so we are able to see the requests logged in the console.
* [multer](https://www.npmjs.com/package/multer) - a middleware to upload files.
* [sequelize](https://sequelize.org/) - a ORM that support many DBMS.
* [sqlite](https://sqlite.org/index.html) - a SQL database engine.

## API
### Vehicle

#### GET `/api/vehicles`

List vehicles from the database.

```
Example

http://localhost:4000/api/vehicles
```


#### POST `/api/vehicles?<file>&<provider>`

Upload the file to the server and create an entry for each row in the file.

parameter| description
---|---
file| a `.csv` file containing the data
provider| the name of the file provider in order to get a personalized layout.

_Use [postman](https://www.postman.com/) or [insommia](https://insomnia.rest/) for testing._
_You can use the `test/feature/vehicle.csv` file as a test file_