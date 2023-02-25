# `UNTAPPD Clone`

## API (Backend)

### Features

- Beers (CRUD)
- Reviews (CRUD)
- Review Feed
- Profiles

### Database Design

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/me
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Beers

### Get all Beers

Returns all the beers in database.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/beers
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Beers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Keelin' It Exploration IPA",
          "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
          "ABV": 0.06,
          "IBU": "N/A",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 3.74,
          "picture": "image url"
        }
      ]
    }
    ```

### Get all Beers owned by the Current User

??Returns all the beers owned (created) and reviewed by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/me/beers
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Beers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Keelin' It Exploration IPA",
          "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
          "ABV": 0.06,
          "IBU": "N/A",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 3.74,
          "picture": "image url"
        }
      ]
    }
    ```

### Get details of a Beer from an id

Returns the details of a beer specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/beers/:beerId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Keelin' It Exploration IPA",
      "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
      "ABV": 0.06,
      "IBU": "N/A",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "avgRating": 3.74,
      "picture": "image url",
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```

- Error response: Couldn't find a Beer with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Beer couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Beer

Creates and returns a new beer.

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/beers
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Keelin' It Exploration IPA",
      "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
      "ABV": 0.06,
      "IBU": "N/A",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "picture": "image url"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Keelin' It Exploration IPA",
      "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
      "ABV": 0.06,
      "IBU": "N/A",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "avgRating": 3.74,
      "picture": "image url"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "ABV": "ABV is required"
      }
    }
    ```

### Edit a Beer

Updates and returns an existing beer.

- Require Authentication: true
- Require proper authorization: Beer must belong to the current user
- Request

  - Method: PUT
  - URL: api/beers/:beerId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Keelin' It Exploration IPA",
      "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
      "ABV": 0.06,
      "IBU": "N/A",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "picture": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Keelin' It Exploration IPA",
      "description": "Citrus and stone fruit notes. Mildly hoppy. Lightly floral.",
      "ABV": 0.06,
      "IBU": "N/A",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "avgRating": 3.74,
      "picture": "image url"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "ABV": "ABV is required"
      }
    }
    ```

- Error response: Couldn't find a Beer with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Beer couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Beer

Deletes an existing beer.

- Require Authentication: true
- Require proper authorization: Spot must belong to the current user
- Request

  - Method: DELETE
  - URL: api/beers/:beerId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Beer with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Beer couldn't be found",
      "statusCode": 404
    }
    ```

## Beer Reveiews

### Get all reviews by a Beer's id

Gets all reviews of a beer

- Require Authentication: false
- Require proper authorization: Spot must belong to the current user
- Request
  - Method: GET
  - URL: api/beer/:beerId/reviews
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "beerId": 1,
          "body": "I love this beer!",
          "rating": 4.5,
          "pictures": "stringUrl",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "User": {
            "id": 1,
            "username": "JohnSmith"
          }
        }
      ]
    }
    ```

- Error response: Couldn't find any reviews for beer

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reviews couldn't be found",
      "statusCode": 404
    }
    ```

### Create a review by Beer Id

Create and return a new review for a beer specified by id.

- Require Authentication: True
- Require proper authorization: User must be logged in
- Request
  - Method: POST
  - URL: api/beer/:beerId/reviews
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "body": "I love this beer!",
      "images": "stringURLs",
      "ratings": 4.5
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:


    ```json
    {
      "id": 1,
      "userId": 1,
      "beerId": 1,
      "body": "I love this beer!",
      "images": "stringURLs",
      "ratings": 4.5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

- Error response: Validation error

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Review body text is required"
      }
    }
    ```

- Error response: Couldn't find a Beer with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Beer ID couldn't be found",
      "statusCode": 404
    }
    ```

### Edit Review

Edit an existing review of a beer

- Require Authentication: True
- Require proper authorization: Review must be created by same user editing
- Request
  - Method: PUT
  - URL: api/reviews/:reviewId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "body": "I hate this beer!",
      "ratings": 1
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:


    ```json
    {
      "id": 1,
      "userId": 1,
      "beerId": 1,
      "body": "I hate this beer!",
      "images": "stringURLs",
      "ratings": 1,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

- Error response: Body validation error

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Review body text is required"
      }
    }
    ```

- Error response: Couldn't find the Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Couldn't find review",
      "statusCode": 404
    }
    ```

### Delete review

Removes an existing review

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request
  - Method: DELETE
  - URL: api/reviews/:reviewId
  - Body: none

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Review with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Browser Application (Frontend)

### Page Tree
