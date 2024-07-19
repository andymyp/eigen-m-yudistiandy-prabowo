<a id="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">EIGEN-M-YUDISTIANDY-PRABOWO</h3>

  <p align="center">
    Project backend for technical test
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>
<br />


<!-- ABOUT THE PROJECT -->
## Built With

This project build with Node.js, Express, JWT, MySQL, Joi, Bcrypt, and Swagger

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Prerequisites

* NPM
  ```sh
  npm install npm@latest -g
  ```

<br />

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/andymyp/eigen-m-yudistiandy-prabowo.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your database connection at `config/database.js` or you can create env file
   ```js
   {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'db_library',
   }
   ```
4. Import the database `db_library.sql`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Run
   ```sh
   npm run dev
   ```
2. API Docs
   ```sh
   http://localhost:3000/api-docs
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andymyp