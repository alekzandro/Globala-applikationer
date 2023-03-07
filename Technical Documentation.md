# Recruitment Platform technical documentation 

## Introduction
The purpose of this document is to provide technical documentation for Recruitment Platform, a web-based application to facilitate a recruitment process for a company , they benefit from this web based recruitment tool.
Recruitment Platform intendend to be a robust, scalable and well-documented
system that can easily be expanded with new functionality.The system distinguishes between two types of users, applicants and recruiters. An applicant applies for a position within the company while a recruiter manages applications. The system is divided into two parts: The registration of job applications and the administration of applications.. This document is intended for developers who will be working on the project and is meant to provide a comprehensive understanding of the project's architecture, development methodologies, and technical requirements.

## Getting Started
### Prerequisites
- [Insert any prerequisites or dependencies required for the project]

### Installation
1. Clone the project from GitHub using the command: `git clone https://github.com/alekzandro/Globala-applikationer.git
2. Install any necessary dependencies using the following commands: 
   sudo apt-get install postgresql-12   (to install postgresql-12)
   sudo createuser -s postgres          (to create a user in postgres)

3. [Insert any additional installation instructions, such as setting up the environment]

### Running the Project
Navigate to the backend folder in the project directory, you can run:

1. `npm install`
2. `npm run dev`

### Installing PostgreSQL:
For Linux terminal:
1. `sudo apt update`
2. `sudo apt-get install postgresql-12`
3. `sudo createuser -s postgres`
4. `psql -U postgress` (to get access to psql)

For windows : see https://www.guru99.com/download-install-postgresql.html
3. [Insert any additional instructions for running the project, such as setting environment variables]

## Architecture
### Overview
- Choice of architecture:Server-side rendering with Express and EJS.
- ![image](https://user-images.githubusercontent.com/42935270/223382101-55065acb-139f-4911-8a40-18660b86ef2b.png)

### Front-end
- We have chosen Server-side rendering with Express and EJS so the rendering of view happens in the server side with views implemented in ejs.
### Back-end
- We have built the back-end according to MVC architecture
- [Insert any relevant back-end frameworks, libraries, or technologies used]
- [Insert any notable features or functions of the back-end]

### Database
- Choice of database: Relationsdatabas med SQL.
- [Insert any relevant database frameworks, libraries, or technologies used]
- [Insert any notable features or functions of the database]

## Development Methodologies
- [Insert information about the development methodologies used]
- [Insert any relevant software development methodologies or best practices used, such as Agile, Scrum, or Test-driven development]

## Testing
- [Insert information about the testing methodologies used]
- [Insert any relevant testing frameworks, libraries, or technologies used, such as Jest, Mocha, or Selenium]

## Deployment
- We have used Heroku to deploy our application.
- Here comes the link to the website in Heroku:  https://recruitpark.herokuapp.com/
- The deployed application works appropriately using the following browsers, you’re free to choose any <ol> version:
- Edge
- Firefox
- Chrome
- Safari


## Contributing
- [Insert information about how to contribute to the project]
- [Insert any relevant contribution guidelines or code of conduct]

## Conclusion
This technical documentation provides a comprehensive overview of Recruitment Platform  and its technical requirements, architecture, development methodologies, and testing and deployment procedures. It is intended to provide developers with a clear understanding of the project and its requirements, as well as any necessary information for contributing to the project.

## License
This project is licensed under the [insert license name] License - see the [insert LICENSE.md file path] file for details.
