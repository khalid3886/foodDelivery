This README provides a brief overview of the API endpoints available, along with their functionalities and expected usage.

Authentication
POST /users/register
This endpoint allows users to register. The password provided will be hashed and stored securely.

POST /users/login
This endpoint allows users to log in. Upon successful login, a JWT token will be returned for authentication purposes.

User Management
PATCH /users/:id/reset
This endpoint enables users to reset their password by providing their current password and the new password in the request body.

Restaurant Management
POST /api/restaurants
This endpoint allows the addition of new restaurants.

GET /api/restaurants
This endpoint returns a list of all available restaurants.

GET /api/restaurants/:id
This endpoint returns the details of a specific restaurant identified by its ID.

GET /api/restaurants/:id/menu
This endpoint returns the menu of a specific restaurant identified by its ID.

POST /api/restaurants/:id/menu
This endpoint allows users to add a new item to a specific restaurant's menu identified by its ID.

DELETE /api/restaurants/:id/menu/:id
This endpoint allows users to delete a particular menu item identified by its ID from a specific restaurant.

Order Management
POST /api/orders
This endpoint allows users to place an order.

GET /api/orders/:id
This endpoint returns the details of a specific order identified by its ID, including all relevant information.

PUT / PATCH /api/orders/:id
This endpoint allows users to update the status of a specific order identified by its ID.
