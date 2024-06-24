# server 2024

> [!NOTE]
> change **<http://localhost:5000/>** to your **process.env.PORT**

## users resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | CRUD Operation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [http://localhost:5000/users/signin](http://localhost:5000/users/signin) | POST | user sign in | --- | --- |--- |{ email ,password}|---|user+token|READ|
| [http://localhost:5000/users/signup](http://localhost:5000/users/signin) | POST | user sign up | --- |---|---|{name, password, email,address}|---|user+token|CREATE|
| [http://localhost:5000/users](http://localhost:5000/users/:id)| GET | get all users | admin |---|---|---|Authorization|user[]|READ|

## categories resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | CRUD Operation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [http://localhost:5000/categories](http://localhost:5000/categories) | GET | get all categories | --- |---|---|---|---|category[]|READ|
| [http://localhost:5000/categories/withRecipes](http://localhost:5000/categories/withRecipes) | GET | get full data of all categories (categories with recipes data) | --- |category id|---|---|---|category|READ|
| [http://localhost:5000/categories/getAllCategoryWithRecipesById/:id](http://localhost:5000/categories/getAllCategoryWithRecipesById/:id) | GET | get category with recipes by *id* | --- | category id |---|---|---|category[...,recipe[]]|READ|


## recipes resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | CRUD Operation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [http://localhost:5000/recipes/:id](http://localhost:5000/recipes/:id) | GET | get recipe by id | --- |recipe id|---|---|---|recipe|READ|
| [http://localhost:5000/recipes/getByUserId/:id](http://localhost:5000/recipes/getByUserId/{id}) | GET | get full recipes of id user | registered user |recipe id|search - חיפוש לפי שם קורס,page - מס' עמוד,perPage - מס' קורסים לעמוד|---|---|recipe[]|READ|
| [http://localhost:5000/recipes](http://localhost:5000/recipes) | GET | get all recipes | --- |---|---||---|recipe[]|READ|
| [http://localhost:5000/recipes/?time=](http://localhost:5000/recipes/?time=) | GET | get all recipes the timePreper less then "time" | --- |time - maximum preparation time  |time - זמן הכנה מקסימאלי|---|---|recipe[]|READ|
| [http://localhost:5000/recipes](http://localhost:5000/recipes) | POST | add a recipe | registered user |---|---|{name,description,category,preparationTime,DifficultyLevel,Addeddate,layers:[],instruction,images[],IsPrivate,user:{}}|Authorization|recipe|CREATE|
| [http://localhost:5000/recipes/:id](http://localhost:5000/recipes/:id) | PUT | update a recipe | Administrator (role=admin) or user whose name the recipe is registered on | recipe id |---|{name,description,category,preparationTime,DifficultyLevel,Addeddate,layers:[],instruction,images[],IsPrivate,user:{}}|Authorization|recipe|UPDATE|
| [http://localhost:5000/recipes/:id](http://localhost:5000/recipes/:id) | DELETE | delete a recipe | Administrator (role=admin) or user whose name the recipe is registered on | recipe id |---|---|Authorization|---|DELETE|
