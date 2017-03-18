# starwars-ng
This project was developed using Angular2 framework, TypeScript. Deployment wise, it was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3. All the sites are created to be responsive until 320px width.

Demo page can be [viewed here](https://tendouji.github.io/starwars-ng/).


## Development
Main structure of the files includes; 
* app.component (main container to hold everything), 
* header.component
* footer.component
* ship-panel.component (act as template to generate individual spaceship record)


**app.component** triggers the AJAX call to get spaceship records and once done, it will communicate with **ship-panel.component** to generate appropriate amount of record panels. 

Editing crew records and sorting features are located within **ship-panel.component** for ease of development.


## Further 

For the other 2 **jQuery + SASS** and **javascript** repo README, [check here](https://github.com/tendouji/starwars-api-v2/blob/master/README.md).
