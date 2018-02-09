
# Frontend Starter Kit

A boilerplate for frontend projects powered by [Gulp](https://github.com/gulpjs/gulp), latest [HTML5 bolierplate](https://github.com/h5bp/html5-boilerplate), [Sass](http://sass-lang.com/), [PostCss](https://github.com/postcss/postcss),  [Webpack](https://webpack.js.org/)(for transpiling latest ES6/ES7), and [Eslint](https://eslint.org/) with [AirBnB config](https://github.com/airbnb/javascript) and [Prettier](https://github.com/prettier/prettier).


### Prerequisites

* Small amount of time to setup config :)
* [npm](https://www.npmjs.com/get-npm).
* [Gulp](https://github.com/gulpjs/gulp)

### Installing

After you clone or download this repository, you can kickstart your project just with `npm install` in your terminal. After required packages are downloaded you can start using starter kit, or make changes to folder structure to suit your needs( remove images or icons folder if you are not using any images, or disable some gulp tasks that you don't need for your project etc. etc.)

## Getting Started

### Gulp Tasks

#### gulp watch
The basic usage of Frontend Starter Kit starts with `gulp watch` task, and it's the main gulp task. I usually start with this one first, and I recommend keeping this one turned on while you are working on your code, because it starts [Browsersync](https://www.browsersync.io) server on `localhost://3000` and is syncing with your work everytime it's saved. Depending on what file you've just saved it starts gulp styles or gulp scripts tasks automatically. 

__Usage__: just type in terminal `gulp watch` .

#### gulp styles
This task starts CSS processing, which process your code through Sass first, then through a few postcss plugins one by one. Code is being transpiled to CSS supported syntax, vendor prefixes are added for some properties, and a bunch of other things that you can look up in plugins docs.
This is how proccesing tree looks like: 
```
.sass.()
.pipe(postcss([
	require('postcss-partial-import')({prefix: '_', extension: '.css'}),
		postcssurl(),
			require('postcss-normalize')({browsers: 'last 2 versions'}),	
				fontMagician(),	// https://github.com/jonathantneal/postcss-font-magician	 
					cssnext(),	// http://cssnext.io/features/
						rucksack(), // http://simplaio.github.io/rucksack/docs/#
							require('postcss-nesting'),
								reporter()
			]))
```
I'll explain shortly what each of this plugins do.

[postcssurl()](https://github.com/postcss/postcss-url) Allows you to fix url()s according to postcss to and/or from options (rebase to to first if available, otherwise from or process.cwd()).

[('postcss-normalize')](https://github.com/jonathantneal/postcss-normalize) PostCSS Normalize lets you use the parts of normalize.css you need, based on your project’s browserlist. You can specify which versions of browsers are you going to support in options like this `require('postcss-normalize')({browsers: 'last 2 versions'})`.

[fontMagician](https://github.com/jonathantneal/postcss-font-magician) plugin that magically generates all of your @font-face rules.

[cssnext()](https://github.com/postcss/postcss) PostCSS-cssnext is a PostCSS plugin that helps you to use the latest CSS syntax today. It transforms CSS specs into more compatible CSS so you don’t need to wait for browser support. Really powerfull plugin with long list of [features](http://cssnext.io/features/).

[rucksack()](https://github.com/seaneking/rucksack) A plugin pack similar to postcss-cssnext, featuring incredible __responsive 
typography__.

[('postcss-nesting')](https://github.com/jonathantneal/postcss-nesting) allows writing nested CSS.

__Usage:__ `gulp styles`

#### gulp scripts

`gulp scripts` task is compiling all javascript files into one main file`( temp/scripts/App.js )` and while on it transpiling all ES6 code to ES5 through Webpack/Babel, so we can use new ES6 syntax in our work and not worry about browser support.

__Usage:__ `gulp scripts`

#### gulp modernizr 

`gulp modernizr` provides support for older browsers( IE6, IE7.. ) that doesnt support flexbox or other new CSS and Js stuff. This task is started automaticaly each time a js file is saved while in `gulp watch` mode, but it can be started manually with `gulp modernizr` command.

#### gulp build

`gulp build` task triggers building a docs directory in which all files are moved from development to production, CSS/HTML and Js are minified and optimized, images and icons are compressed and new source paths are build in index.html with help of [usemin](https://github.com/zont/gulp-usemin). The docs folder is the folder with files that end user is going to use.

## Contributing

Fork it if you can see a way to improve it or suggest improvenments, PR's are welcome.

## Changelog
* 0.3.0 Improved Sass support and proccessing, added a bunch of default Sass mixins, functions and placeholder variables. Also implemented possibility of using HTML templates.
-------------------------------------------------------------------------------------------
* 0.2.0 Added Sass support, updated dependencies and removed Lost Grid in favor of native CSS Grids
-------------------------------------------------------------------------------------------
* 0.1.5 Added gulp-load-plugins to build, and improved perfomance and startup time of tasks
* 0.1.4 Changed deprecated es-2015 babel preset to babel-preset-env., and added HTML minifier to build.
* 0.1.3 Removed gulp-uglify( problems with minifying ES6 code, and moved to babel-minify.
* 0.1.2 added Font Magician PostCss plugin to bundle.
* 0.1.1 commited initial setup to Github. 

## Author

* **Darkø Tasevski** - *Initial work* - [Puritanic](https://github.com/Puritanic)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to everyone who's code was used!
