'use strict';

module.exports = function(app/*, express*/) {

	/*
	*	Home
	*/

	app.get('/', (req, res) => res.render('home'));

	/*
	*	img
	*/

	app.get('/:width([0-9]{1,})x:height([0-9]{1,})/:bg([a-f0-9]{3,6})/:fg([a-f0-9]{3,6})', require(GLOBAL.paths.getRoute('img')));
	app.get('/:width([0-9]{1,})x:height([0-9]{1,})/:bg([a-f0-9]{3,6})', require(GLOBAL.paths.getRoute('img')));
	app.get('/:width([0-9]{1,})x:height([0-9]{1,})', require(GLOBAL.paths.getRoute('img')));
	app.get('/:width([0-9]{1,})', require(GLOBAL.paths.getRoute('img')));

	return;
};
