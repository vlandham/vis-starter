# Vis Starter

Start your D3 visualization quick and easy!

## Development

Clone into a new directory

```bash
git clone git@github.com:vlandham/vis-starter.git my_cool_vis
```

Install the dependencies:

```bash
npm install
```

Start up the server:

```bash
npm start
```

Start making your visualization! Server should refresh each time you change and save new code.

## Deployment

**Warning: This has only been tested on Mac OSX.**

This repo includes a basic setup for deploying to [Github Pages](https://pages.github.com/) a free hosting solution for static websites.

To try this out, run:

```bash
npm run deploy
```

This should perform the following processes:

- Build the project
- Package necessary files into `build` directory
- Deploy to Github Pages using the [gh-pages](https://www.npmjs.com/package/gh-pages) package.

The package functionalty currently only includes the following files / directories:

- `index.html`
- `bundle.js` (created as part of the build process)
- `data/`
- `css/`

If you need additional files to be deployed, you will need to modify the `package` script in `package.json`.

## File Organization

The entry-point to the JS code is in `index.js`.
There is some basic data transformation there as well, you might want to change.

A basic chart has been implemented in `chart.js`.
The idea is that you modify this code to make your new chart.

Basic styling is included in `css/` including [Skeleton CSS](http://getskeleton.com/).

Data files are meant to go in `data/`.

## Development Packages

- budo - for the server>
- browserify - for building.
- babelify - to use ES6.
- eslint - for linting.
- uglify-js - for packaging in deployment.
- gh-pages - to deploy to gh-pages!
- prettier - for cleaning up that messy JS.
