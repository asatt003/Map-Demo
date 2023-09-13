# Map-Demo
Integrating the Leaflet library with React, Express, and Knex.


# Run the follwoing for React maps in JSON directory:

## How to use (NOTE: You will need to install a Postgres image inside of a Docker container for the database): 

#### 1. Clone this repository

#### 2. in the server directory, run "npm install". 

#### 3. in the client directory, run "npm install".

#### 4. Start up Postgres Docker container, log in, and create "map_09_13_23" database

#### 5. In database folder, run: npx knex migrate:latest

#### 6. In database folder, run: npx knex seed:run

#### 7. In server directory, run: npm start

#### 8. In client directory, run: npm start

#### 9. In the "localhost:3000" page, one marker should already be loaded.

#### npm install react react-dom leaflet

#### npm install react-leaflet

## About the project: 

### This project demonstrates proficiency in the following subjects:

#### Use of the Leaflet Javascript library to display a map in the application.

#### Add/Move/Delete markers on the map.

#### Using a toggle slider to enable geolocating the area around your personal position.

#### Using Express and Knex to store your marker data for later use.

## Features: 

#### Users may Add/Move/Delete markers on the map at any time.

#### Users may also toggle between adding markers and geolocating around their personal location.

#### When a user adds, moves, or deletes a marker, marker information is updated and stored in the database.

#### If a user quits the application, the marker data will load the next time the application is started.