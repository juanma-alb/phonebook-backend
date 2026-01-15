**Phonebook Backend**

A RESTful API built with Node.js and Express for managing phonebook entries. This project is part of the **Full Stack Open** course (Part 3).

🔗 Links: [View Source Code](https://github.com/juanma-alb/fullstackopen) | [ Live Demo on Render](https://phonebook-backend-0stg.onrender.com).

 
 
## Technologies Used
- **Node.js** - JavaScript runtime environment.
- **Express** - Web framework for backend logic.
- **MongoDB & Mongoose** - Database and Object Data Modeling (ODM).
- **Morgan** - HTTP request logger middleware.
- **Cors** - Middleware to enable Cross-Origin Resource Sharing.
- **ESLint** - Linting tool for code quality.
- **Dotenv** - Environment variable management.


## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/persons` | Get all persons |
| `GET` | `/api/persons/:id` | Get a single person |
| `DELETE` | `/api/persons/:id` | Delete a person |
| `POST` | `/api/persons` | Add a new person |
| `PUT` | `/api/persons/:id` | Update a number |
| `GET` | `/info` | Get phonebook stats |

## License
This project is created for educational purposes as part of the Full Stack Open curriculum.

