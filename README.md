# Retappd

Retappd is a stripped down version of Untappd, a popular website to socially share the brew with friends. Retappd was made with React.js and Python.

### Link to live site

https://thunder-shark.onrender.com/

### Technologies Used

- JavaScript
- Python
- Flask
- React.js
- REST API
- PostgreSQL
- Render

### Features

- Get / Create / Update / Delete beers
- Get / Create / Update / Delete breweries
- Get / Create / Delete beer reviews
- Get / Create beer users

### Installation

1. Copy example .env file

```
cp backend/.env.example backend/.env
```

Your .env file should look like this:

```
DB_FILE=db/dev.db
JWT_SECRET=****
SCHEMA=my_beers_schema
FLASK_DEBUG=true
```

2. Run `openssl rand -base64 10` to generate a random JWT secret and add to your `.env` file.

3. In the backend folder, run the following command to install the dependencies.

```
pipenv install -r requirements.txt
```

4. After dependencies installed, still in backend folder, run the following command to migrate and seed the database.

```
pipenv shell
```

```
flask db upgrade
```

```
flask seed all
```

5. Run `flask run` in backend folders.

6. Run `npm install` in frontend folder (react-app).

7. Run `npm start` in frontend folder.

- Get / Create / Delete beer reviews
- Get / Create beer users

### Screenshots

##### Beer List

![beer_list]

##### Beer Detail and Create Beer Review

![beer_detail]

##### Create a beer

![create_a_beer]

##### Update or Delete a beer and Delete a beer review

![update_delete_a_beer]

##### Brewery List

![brewery_list]

##### Update or Delete a brewery

![update_delete_a_brewery]

[beer_list]: ./beer_list.jpg
[beer_detail]: ./beer_detail.jpg
[create_a_beer]: ./create_a_beer.jpg
[update_delete_a_beer]: ./update_delete_a_beer.jpg
[brewery_list]: ./brewery_list.jpg
[update_delete_a_brewery]: ./update_delete_a_brewery.jpg
