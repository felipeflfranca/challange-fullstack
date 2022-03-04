# Clinic registration App - Challenge Fullstack

## About

This work is part of a challenge.

The intention is to create an application where the user can search and obtain the address data along with the latitude and longitude through the Google Maps API, register it in a database and do research by displaying the markers on the map with the name, cnpj and address of the clinic

## Registering and searching clinics with Google API

- REST API backend is powered by Express.js, Node.js with Typescript and PostgreSQL database
- The front-end is developed with React.js library

## Prerequisites

- Docker is required to run the application (Note: My docker version - 4.5.1)
- Add a google maps api key:
```
app > .env | REACT_APP_GOOGLE_MAPS_APIKEY=apikey
```

## Running the application

- To start go to the project root directory and run the following command in your terminal
```
docker-compose up -d
```
![image](https://user-images.githubusercontent.com/34171021/156740040-02c516af-ac6b-494a-8387-7b64a2bf078f.png)

- After completing open the browser and access:
```
localhost:3000
```
## Accessing the logs
![Animação](https://user-images.githubusercontent.com/34171021/156743956-a99061e5-5f63-4e47-96e4-9cb0ee0b45f5.gif)


## Using the API

### Clinics

Insert a new clinic - HTTP /POST

- cURL
```
curl --location --request POST 'localhost:3001/api/clinics' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Clinica vida",
    "cnpj": "46563575000113",
    "address": {
      "place": "Avenida Dois de Abril",
      "number": "208",
      "district": "Urupa",
      "city": "Ji-Parana",
      "postalCode": "76900213",
      "state": "Roraima",
      "country": "Brasil",
      "lat": -10.867678,
      "lng": -61.970721
    }
  }'
```

Get all clinic - HTTP /GET

- cURL
```
curl --location --request GET 'localhost:3001/api/clinics'
```
