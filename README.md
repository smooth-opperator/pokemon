## A simple application to fetch Pokemon built against https://pokeapi.co/
I built the application using v2 of the API, before noticing that they had GraphQL supported in beta. Something for next time.
It returns a paginated list of pokemon (50 per page), pokemon can be marked as favorites, which persists when clicking through the paginated list.
Clicking on any particular pokemon takes you to a detail page.
Have included some basic unit tests for the List and Detail pages.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
