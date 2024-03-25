
## prep for project 3

1.Trello board `https://trello.com/b/uYlEjRly/project-3-admin-dashboard`


2. ![wireframe](public/images/dash-mint-wireframe.png)


1. ![erd](public/images/erd.png)


# Admin Panel for Small Shop

## Description

This admin panel is a standalone MERN (MongoDB, Express.js, React, Node.js) stack application designed for managing the operations of a small shop. It allows for adding and editing products. This project can be integrated with any storefront that uses the same MongoDB database.

## Features

- **Product Management**: Easily add and edit products.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Semantic UI React, CSS

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Connecting Your Storefront

To integrate your existing storefront with this admin dashboard:

1. **Configure Database Access**: Adjust the server-side code of the admin dashboard to connect to the MongoDB database using the same URI as your storefront. You'll typically find this connection string in the `.env` file.
2. **Use Shared Data Model**: It's important that both the admin dashboard and storefront operate under the same data models for products. Ensure that the structure of the product data and the attributes name, price, description, and imageUrl remain consistent across both applications.
3. **API Endpoints and Routes**: The actions of fetching, adding, and editing products in the admin dashboard are managed through API endpoints, which are defined in an application's routes and handled by controllers. Make sure that these API endpoints are correctly matching in the routes folder and that the logic matches to both the admin dashboard and storefront.
