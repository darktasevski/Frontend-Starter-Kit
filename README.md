
# Frontend Starter Kit

A boilerplate for frontend projects powered by [Gulp](https://github.com/gulpjs/gulp), latest [HTML5 bolierplate](https://github.com/h5bp/html5-boilerplate), [PostCss](https://github.com/postcss/postcss) and  Webpack(for Babel transpiling).


### Prerequisites

The only requirement is  [npm](https://www.npmjs.com/get-npm).

### Installing

After you clone or download this repository, you can kickstart your project just with `npm install` in your terminal. After required packages are downloaded you can start using starter kit, or make changes to folder structure to suit your needs( remove images or icons folder if you are not using any images, or disable some gulp tasks that you don't need for your project etc. etc.)

## Getting Started

### Gulp Tasks

#### gulp watch
The basic usage of Frontend Starter Kit starts with `gulp watch` task, and it's the main gulp task. I usually start with this one first, and I recommend keeping this one turned on while you are working on your code, because it starts [Browsersync](https://www.browsersync.io) server on `localhost://3000` and are syncing with your work everytime it's saved. Depending on what file you've just saved it starts gulp styles or gulp scripts tasks automatically.

__Usage__: just type in terminal `gulp watch` .

#### gulp styles
This task starts CSS processing featuring [PostCss](https://github.com/postcss/postcss) and its [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) plugin which allows you to use CSS syntax that isn't supported yet, but will be, so while working with new syntax you will learn it for tomorrow. This is how proccesing tree looks like: 
```
.pipe(postcss([
			require('postcss-partial-import')({prefix: '_', extension: '.css'}),
				postcssurl(),
					require('postcss-normalize')({browsers: 'last 2 versions'}),	
						fontMagician(),	// https://github.com/jonathantneal/postcss-font-magician	 		
							cssnext(),	// http://cssnext.io/features/
								rucksack(), // http://simplaio.github.io/rucksack/docs/#
									require('postcss-nesting'),
										lost(), // lost must be after nesting, so that media queries can work with it http://lostgrid.org/lostgrid-example.html
											reporter()
			]))
```
I'll explain shortly what each of this plugins do.

[postcssurl()](https://github.com/postcss/postcss-url) Allows you to fix url()s according to postcss to and/or from options (rebase to to first if available, otherwise from or process.cwd()).

[('postcss-normalize')](https://github.com/jonathantneal/postcss-normalize) PostCSS Normalize lets you use the parts of normalize.css you need, based on your project’s browserlist. You can specify which versions of browsers are you going to support in options like this `require('postcss-normalize')({browsers: 'last 2 versions'})`.

[fontMagician(https://github.com/jonathantneal/postcss-font-magician)]()  plugin that magically generates all of your @font-face rules.

[cssnext()](https://github.com/postcss/postcss) PostCSS-cssnext is a PostCSS plugin that helps you to use the latest CSS syntax today. It transforms CSS specs into more compatible CSS so you don’t need to wait for browser support. REally powerfull plugin with long list of [features](http://cssnext.io/features/).

[rucksack()](https://github.com/seaneking/rucksack) A plugin pack similar to postcss-cssnext, featuring incredible __responsive 
typography__.

[('postcss-nesting')](https://github.com/jonathantneal/postcss-nesting) allows writing nested CSS.

[lost()](http://lostgrid.org) the must if you are planning to work with grids!

#### gulp scripts



## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Changelog

v 1.1 added Font Magician PostCss plugin to bundle.
v 1.0 commited initial setup to Github. 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

