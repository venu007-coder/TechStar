/*
 * SimpleModal Basic Modal Dialog
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2009 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: basic.js 185 2009-02-09 21:51:12Z emartin24 $
 *
 */

$(document).ready(function () {
	$('a.position1 ').click(function (e) {
		e.preventDefault();
		$('#popup-1').modal();
	});
	$('a.position2 ').click(function (e) {
		e.preventDefault();
		$('#popup-2').modal();
	});
	$('a.position3 ').click(function (e) {
		e.preventDefault();
		$('#popup-3').modal();
	});
	$('a.position4 ').click(function (e) {
		e.preventDefault();
		$('#popup-5').modal();
	});
	$('a.position5 ').click(function (e) {
		e.preventDefault();
		$('#popup-5').modal();
	});
	$('a.position6 ').click(function (e) {
		e.preventDefault();
		$('#popup-6').modal();
	});
});