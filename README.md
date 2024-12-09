Problem Breakdown
Roles and Responsibilities
Admin:

Add, update, delete grocery items.
Manage inventory.
View all items and their inventory status.
User:

View available grocery items.
Place orders for grocery items.
View their past orders.
API Design
Base URL: /api/v1
Admin Endpoints
Add Grocery Item

URL: /admin/grocery-items
Method: POST
Request Body:
json
:-
{
  "name": "Apple",
  "price": 50.0,
  "category": "Fruit",
  "quantity": 100
}
Response:
json
:-
{
  "message": "Grocery item added successfully.",
  "itemId": 1
}
Update Grocery Item

URL: /admin/grocery-items/{itemId}
Method: PUT
Request Body (partial updates allowed):
json
 
{
  "name": "Apple",
  "price": 55.0,
  "quantity": 150
}
Response:
json
:-
{
  "message": "Grocery item updated successfully."
}
Delete Grocery Item

URL: /admin/grocery-items/{itemId}
Method: DELETE
Response:
json
:-
{
  "message": "Grocery item removed successfully."
}
View All Grocery Items

URL: /admin/grocery-items
Method: GET
Response:
json
:-
[
  {
    "id": 1,
    "name": "Apple",
    "price": 50.0,
    "category": "Fruit",
    "quantity": 100
  },
  {
    "id": 2,
    "name": "Banana",
    "price": 20.0,
    "category": "Fruit",
    "quantity": 200
  }
]
User Endpoints
View Available Grocery Items

URL: /grocery-items
Method: GET
Query Params (optional for filtering):
category: string (e.g., Fruit)
name: string (e.g., Apple)
Response:
json
:-
[
  {
    "id": 1,
    "name": "Apple",
    "price": 50.0,
    "category": "Fruit",
    "availableQuantity": 100
  },
  {
    "id": 2,
    "name": "Banana",
    "price": 20.0,
    "category": "Fruit",
    "availableQuantity": 200
  }
]
Place an Order

URL: /orders
Method: POST
Request Body:
json
:-
{
  "userId": 123,
  "items": [
    { "itemId": 1, "quantity": 2 },
    { "itemId": 2, "quantity": 3 }
  ]
}
Response:
json
:-
{
  "orderId": 101,
  "message": "Order placed successfully."
}
View User Orders

URL: /users/{userId}/orders
Method: GET
Response:
json
[
  {
    "orderId": 101,
    "items": [
      { "name": "Apple", "quantity": 2, "price": 50.0 },
      { "name": "Banana", "quantity": 3, "price": 20.0 }
    ],
    "totalPrice": 160.0,
    "orderDate": "2024-12-09T10:00:00Z"
  }
]
Database Schema
Table: GroceryItems
Column	Type	Constraints
id	INTEGER	PRIMARY KEY
name	VARCHAR(255)	NOT NULL
price	DECIMAL(10,2)	NOT NULL
category	VARCHAR(100)	NOT NULL
quantity	INTEGER	NOT NULL
Table: Users
Column	Type	Constraints
id	INTEGER	PRIMARY KEY
name	VARCHAR(255)	NOT NULL
email	VARCHAR(255)	UNIQUE NOT NULL
Table: Orders
Column	Type	Constraints
id	INTEGER	PRIMARY KEY
userId	INTEGER	FOREIGN KEY -> Users.id
orderDate	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP
Table: OrderItems
Column	Type	Constraints
orderId	INTEGER	FOREIGN KEY -> Orders.id
itemId	INTEGER	FOREIGN KEY -> GroceryItems.id
quantity	INTEGER	NOT NULL
price	DECIMAL(10,2)	NOT NULL
Authentication
Admin Authentication:

Use token-based authentication (e.g., JWT).
Admins must include a token in the request header:
Authorization: Bearer <token>.
User Authentication:

Implement user login and registration endpoints.
Users must also use token-based authentication.
Advanced Challenge: Dockerize the API
Dockerfile:
dockerfile
:-
# Base Image
FROM node:18-alpine

# Set Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy Application Files
COPY . .

# Expose Application Port
EXPOSE 3000

# Run Application
CMD ["npm", "start"]
docker-compose.yml:
yaml
:-
version: '3.9'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=admin
      - DB_PASSWORD=password
      - DB_NAME=grocery
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: grocery
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
