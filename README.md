# aratta-express-boilerplate

This is an express boilerplate which inspired from laravel framework with some simplifications.

# Features

* Easy jwt authentication
* Routing system
* MVC pattern
* Migrations
* Env
* Sequelize Orm
* mySql

# Creating the project

Install the aratta-express cli if it isn't already installed

```
npm i -g @aratta-studios/aratta-express
```

Then

```
aratta-express projectName
```

Select aratta-express-boilerplate

# Usage
```
cd projectName
npm start
```

# Models and migrations
For models and migrations we used sequelize
Read more in this link:
http://docs.sequelizejs.com/manual/migrations.html
Also you can generate models from database using this library
https://github.com/sequelize/sequelize-auto

# Folder Structure

```
project name
  /auth ( authentication functions, currently configured for jwt authentication )
  /controllers (controllers)
  /env (project environment configurations)
  /migrations (sequelize migrations)
  /models (models)
  /routes (connects routes to controller functions)
```



