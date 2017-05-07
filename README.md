# Webpack starter kit

Build set-up based on webpack and npm scripts for common needs.

## Concepts
- dividing source code from compiled
- separated production task
- modularity
- modern, future-proof technologies
- linting (code style / syntax errors checking)
- browsers live reloading
- dependencies through node modules (you can install libraries through NPM and import them in your styles/scripts)

## Content

Build:
- Webpack 2.x

Styles:
- Normalize.css
- PostCSS: CSSNext **OR** Sass + autoprefixer
- Sourcemaps

**Note** You can choose only PostCSS or Sass (default is Sass):
- change `STYLES` variable in package.json
- remove unecessary folder (/src/postcss or /src/scss).
- change styles file include in src/app.js

Scripts: 
- Javascript: ES2015, ES2016
- Sourcemaps

Code style checking:
- (Styles) Stylelint: standard config (+ `stylelint-scss` for Sass) + some sensible settings
- (Scripts) ESLint: recommended config (+ optional: Airbnb config)

Images:
- sprites generator (spritesmith)
- imagemin

Browsers live reload:
- Webpack dev server

## Base structure

**src/**

PostCSS (postcss/) / Sass (scss/):
- main source file (main.css / main.scss)
- base/:
  - settings: project setup (variables, etc)
  - elements: base html elements styles
- objects/: OOCSS
- components/: BEM, Atomic Design
- tools/: mixins
  
JavaScript (js/):
- main source file (main.js)
- modules/: folder for javascript modules

Images (img/):
- img/ - source images
- img/sprite/ - source images for sprite

Fonts (fonts/) - source fonts

**dist/**

- css/main.css - output css
- js/main.js - output js
- assets/ - output files which relate to build (images, fonts, etc)

## Requirements

- Node.js - latest v6.x LTS "Boron" is recommended

## Installation

`npm install`

## Usage

- `npm run build` - build project
- `npm run start` - build and watch changes
- `npm run start:with-server` - local server which watches your changes (Webpack dev server)
- `npm run build:prod` - build production-ready code

Also, you can see subtasks in `package.json`.

## Browser support

- \> 0.5%
- last 2 versions

## Related links

- [nvm](https://github.com/creationix/nvm), [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/lang/en/)
- [Webpack](https://webpack.js.org/)
- [Webpack dev server](https://github.com/webpack/webpack-dev-server/)
- CSS: [Normalize.css](http://necolas.github.io/normalize.css/), [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/), [BEM](http://getbem.com/introduction/), [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)
- [PostCSS](http://postcss.org/): [CSSNext](http://cssnext.io/)
- [Sass (SCSS)](http://sass-lang.com/)
- [Sourcemaps](https://blog.logentries.com/2014/12/what-are-javascript-source-maps/)
- JavaScript: [ES2015](https://babeljs.io/learn-es2015/), [ES2016](http://www.2ality.com/2016/01/ecmascript-2016.html), [JavaScript Modules](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.gckmsqgz5)
- [Module Bundling](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.jylmhm5v0)
- Linters: [Stylelint](https://stylelint.io/), [ESLint](http://eslint.org/)
- Images: [spritesmith](https://github.com/twolfson/gulp.spritesmith), [imagemin](https://github.com/sindresorhus/gulp-imagemin)


# Credits

- png icon examples (for sprite) designed by Vectors Market from Flaticon (http://www.flaticon.com/packs/business-and-finance-11)
