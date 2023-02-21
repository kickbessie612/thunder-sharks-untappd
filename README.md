# `UNTAPPD Clone`

## API (Backend)

### Features

- Drinks (CRUD)
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
  - URL: /api/me
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
  - URL: /api/session
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
  - URL: /users
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

## DRINKS

### Get all Drinks

Returns all the drinks in database.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /drinks
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Drinks": [
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

### Get all Spots owned by the Current User

# Returns all the drinks owned (created) and reviewed by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /me/drinks
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Drinks": [
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

### Get details of a Drink from an id

Returns the details of a drink specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /drinks/:drinkId
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

- Error response: Couldn't find a Drink with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Drink couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Drink

Creates and returns a new drink.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /drinks
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

### Edit a Drink

Updates and returns an existing drink.

- Require Authentication: true
- Require proper authorization: Drink must belong to the current user
- Request

  - Method: PUT
  - URL: /drinks/:drinkId
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

- Error response: Couldn't find a Drink with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Drink couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Drink

Deletes an existing drink.

- Require Authentication: true
- Require proper authorization: Spot must belong to the current user
- Request

  - Method: DELETE
  - URL: /drinks/:drinkId
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

- Error response: Couldn't find a Drink with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Drink couldn't be found",
      "statusCode": 404
    }
    ```

## Browser Application (Frontend)

### Page Tree
