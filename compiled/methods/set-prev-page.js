"use strict";

module.exports = function (e) {
  e.preventDefault();
  this.setPage(this.page - 1);
};