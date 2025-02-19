# passportjs-oauth-local-jwt-combined

## Author

Author : [Arijit Banerjee](https://www.github.com/ArijitCodes)

About : Full Stack Web Developer | Cyber Security Enthusiast | Actor

Social Media : &nbsp;
[![Instagram](https://i.ibb.co/4t76vTc/insta-transparent-14px.png) Instagram](https://www.instagram.com/arijit.codes)
&nbsp;
[![Linkedin](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/arijitban)
&nbsp;
[![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/ArijitCodes)
&nbsp;
[![Website](https://i.ibb.co/wCV57xR/Internet-1.png) Website](https://iamarijit.dev)

Email: arijit.codes@gmail.com

<hr>

<!-- ## Live Demo

For a Live Demo, check : [https://passportjs-oauth-local-jwt-combined.iamarijit.dev](https://passportjs-oauth-local-jwt-combined.iamarijit.dev)

<hr> -->

## Functionalities and Technologies Used

`Stack` : NodeJS, ExpressJS, MongoDB, ReactJS

`Technologies Used` : NodeJS, ExpressJS, MongoDB, Mongoose, PassportJS, JSONWebToken (JWT), Dotenv, Axios, Bootstrap 5, Bun, ReactJS, Material-UI, Docker, Docker Compose, etc.

`Functionalities` :

- User Registration with Local Strategy
- OAuth 2.0 Authentication with Google and GitHub
- JWT Token Generation and Verification
- Middleware for JWT Authentication
- Dynamic Configuration for OAuth Providers
- Error Handling and Logging
- Theming and Dark Mode Toggle
- Profile Management
- Docker and Docker Compose for Containerization

<hr>

## From the Developer:

This repo demonstrates a combined authentication system using PassportJS with Local Strategy, OAuth 2.0, and JWT. It is designed to be modular and easily extendable to add more OAuth providers.

Additionally, it includes a client web app, built with React that demonstrates the implementation of the backend.

If you have any suggestions, please feel free to leave the suggestions. Constructive Criticism is always appreciated.

<hr>

## Tips

### Using Docker and Docker Compose

#### Backend

1. Navigate to the root directory of the project.

2. Build the Docker image:

   ```sh
   docker compose build
   ```

3. Start the services:
   ```sh
   docker compose up
   ```

Make sure to set the environment variables in your system or in a `.env` file.

PS: If you go with Docker, the backend app will be available on port 5000.

#### Client Web Application

1. Navigate to the `clients/webapp` directory.

2. Build and start the Docker container using Docker Compose:
   ```sh
   docker compose up --build
   ```

The client web application will be available on port 80.

### Without Docker

#### Backend

1. Clone the project and run:

   ```sh
   npm install
   ```

2. Create a file named `.env` in the root. You can use the `.env.sample` file as a reference for the ENV Variables that are needed for the app.

3. Set up the required Env Variables to be used in the app.

4. Run:
   ```sh
   npm start
   ```

#### Client Web Application

1. Navigate to the `clients/webapp` directory.

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a file named `.env` in the `clients/webapp` directory. You can use the `.env.sample` file as a reference for the ENV Variables that are needed for the app.

4. Set up the required Env Variables to be used in the app.

5. Run:
   ```sh
   npm start
   ```

<hr>
