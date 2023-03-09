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
![image](https://user-images.githubusercontent.com/42935270/223382101-55065acb-139f-4911-8a40-18660b86ef2b.png)

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
- We have used agile development methods which rely on daily real-time communication,we had improvement cycles that provide early alignment of expectations and the discovery and correction of bugs by all team members.  
- The following figure shows our development methedology:

![Screenshot from 2023-03-09 10-29-03](https://user-images.githubusercontent.com/42935270/223984461-cbfff191-c28c-4890-99d8-f51a4528a883.png)


## Testing
- we have performed functional testing to ensure that all of the application's features function as expected.
- We have also performed behavioral testing to examine an app's features from the customer's point of view. 

## Deployment
- We have used Heroku to deploy our application.
- Here comes the link to the website in Heroku:  https://recruitpark.herokuapp.com/
- The deployed application works appropriately using the following browsers, you’re free to choose any <ol> version:
- Edge
- Firefox
- Chrome
- Safari


## Contributing
- Express.js was used to create this project, which offers many routes for a website.
To process requests and authenticate users, the program makes use of a number of middleware tools.
Sequelize is an object-relational mapper used by the app to communicate with the backend PostgreSQL database.   

- Here are some guidelines for future implementations:
- Create a new route file in the routes/ directory to specify your new routes if you need to add them to the application.
The route file may then be imported into app.js and used using app.use ().
Make sure your new routes are organized and designed in the same way as the current ones.


- If you need to make modifications to an already established route, you may do so by editing the associated route file in the routes/ directory.
Do extensive testing to make sure your modifications did not damage anything.

 
- A new middleware file may be created in the middleware/ directory to specify your middleware if you need to add it to the application.
The middleware file may then be imported into app.js and used using app.use ().
If you're writing new middleware, be sure to use the same format and style as the current software.


- If you need to make modifications to an already installed piece of middleware, you may do so by editing the associated file in the middleware/ directory.
Ensure sure your modifications do not interfere with any preexisting functionality by doing extensive testing.


- If you need to add a new model to the application, you may do so by creating a new model file under the models/ directory and defining your model there.
The model file is then added to the sequelize.define() function after being imported in the util/database.js file.
Make sure your new model has the same format and aesthetic as the examples we already have.


- If you need to make modifications to an existing model, you may do so by editing the model's related file in the models/ directory.
Do extensive testing to make sure your modifications did not damage anything.


- Defining a new view requires creating a new view file in the views/ directory.
The route file will then make use of the view through res.render().
Be careful to model your new views after the current ones structurally and stylistically.


- If you need to make modifications to an already-existing view, you may do so by editing the associated view file in the views/ directory.
Ensure sure your modifications do not interfere with any preexisting functionality by doing extensive testing.


- Adding support for new error codes is as simple as updating the Logerror middleware in the util/ErrorHandler.js module.
Ensure sure your modifications do not interfere with any preexisting functionality by doing extensive testing.


- If you need to update a dependency, you may do so by editing the package.json and pointing to the updated version.
The updated dependency may be installed using the npm install command.
Ensure sure your modifications do not interfere with any preexisting functionality by doing extensive testing.


Following these recommendations will get you off to a good start as you update and enhance the program.
Before pushing updates to users, be sure you've given them a thorough test. 

## Conclusion
This technical documentation provides a comprehensive overview of Recruitment Platform  and its technical requirements, architecture, development methodologies, and testing and deployment procedures. It is intended to provide developers with a clear understanding of the project and its requirements, as well as any necessary information for contributing to the project.

