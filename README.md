# E-Commerce-Lite-Capstone-Project
Web Technologies 4th Semester Project

A frontend-only e-commerce application built using HTML, CSS, and JavaScript. The project simulates a real online shopping experience by consuming data from a mock REST API created with JSON Server. Users can browse products, add items to their cart, and manage cart contents, while administrators can manage product data through a dedicated admin page.

## Project Preview

![Project Preview](./screenshots/project-preview.png)

---

## Features

### User Features

* Browse products fetched from a mock API
* View product information including image, title, description, and price
* Add products to cart
* View cart in a sidebar panel
* Update product quantities
* Remove products from cart
* Dynamic cart total calculation
* Responsive user interface

### Admin Features

* Dedicated admin page
* Manage product data stored in the mock API
* Add new products
* Update existing products
* Delete products

### API Features

* Mock REST API using JSON Server
* Product data served from `db.json`
* Simulated backend functionality without a real server

---

## Screenshots

### User Home Page

Browse products and add items to the shopping cart.

![User Home Page](./screenshots/user-home.png)

### Cart Sidebar

The shopping cart appears as a sidebar when the cart button is clicked.

![Cart Sidebar](./screenshots/cart-sidebar.png)

### Admin Page

Admin interface for managing products stored in the mock API.

![Admin Page](./screenshots/admin-page.png)

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API
* JSON Server
* REST API Concepts

---

## Project Structure

```text
E-COM CAPSTONE PROJECT/
│
├── images/
    ├── curated.png
    ├── curated2.png
    ├── logo.png
│   ├── project-preview.png
│   ├── user-home.png
│   ├── cart-sidebar.png
│   └── admin-page.png
│
├── index.html
├── admin.html
├── styles.css
├── index.js
├── admin.js
├── db.json
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Project Directory

```bash
cd E-COM CAPSTONE PROJECT
```

### Install JSON Server

```bash
npm install -g json-server
```

### Start the Mock API

```bash
json-server --watch db.json --port 3000
```

The API will be available at:

```text
http://localhost:3000
```

### Run the Project

Open `index.html` in your browser or run the project using a local development server such as VS Code Live Server.

---

## API Endpoints

Example endpoints provided by JSON Server:

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id

GET    /messages
GET    /messages/:id
POST   /messages
```

---

## Learning Outcomes

This project helped demonstrate:

* DOM Manipulation
* Event Handling
* Asynchronous JavaScript
* Fetch API
* CRUD Operations
* REST API Integration
* Responsive Web Design
* Cart Management Logic
* Frontend State Management

---

## Limitations

* No real backend implementation
* No user authentication
* No payment gateway integration
* Data persistence depends on JSON Server
* Not intended for production use

---

## Future Improvements

* User authentication and authorization
* Product search functionality
* Product filtering and sorting
* Wishlist feature
* Checkout system
* Order management
* Database integration
* Backend API development

---

## Author

**Sohaib Amir**

Web Technologies – 4th Semester Capstone Project

---

## License

This project was developed for educational purposes as part of a university coursework project.
