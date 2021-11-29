## Authentication App
---

### Prerequisites
* [Node.js@14.17.0](https://nodejs.org/en/)
* [npm@7.x](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Get started

1. Clone this repository
  
    Open your terminal window, switch to the directory you want to clone this repository to and run 

    >  `git clone https://fancychild27@bitbucket.org/fancychild27/authentication-app.git` 
        
    >    `git clone git@bitbucket.org:fancychild27/authentication-app.git` (*in case you're prefer ssh :)*)

2. Update your depencencies as they are specified in package.json file 

   > `cd ./authentication-app/api`
   > `npm install`
   > `cd ../client`
   > `npm install`

* Create an environment file 
    * `cd ./authentication-app/api`
    * `cp .example.env .env`

* Run the client app 
    * `cd ./authentication-app/client`
    * `npm start`
* Run the server 
    * `cd ./authentication-app/api`
    * `npm start`

