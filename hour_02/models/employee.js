"use strict";

module.exports = function (firstname, lastname, department) {
	this.firstname = firstname;
        this.lastname = lastname;
	this.department = department;

	this.print = function() {
		return firstname + ' ' + lastname + ' - ' + department;
	};
};
