"use strict";

var _merge = _interopRequireDefault(require("merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (h, modules, classes, slots) {
  var filterId = 'VueTables__search_' + this.id;
  var ddpId = 'VueTables__dropdown-pagination_' + this.id;
  var perpageId = 'VueTables__limit_' + this.id;

  var perpageValues = require('../modules/per-page-values').call(this, h);

  var genericFilter = this.hasGenericFilter ? h("div", {
    "class": "VueTables__search-field"
  }, [h("label", {
    attrs: {
      "for": filterId
    },
    "class": classes.label
  }, [this.display('filter')]), modules.normalFilter(classes, filterId)]) : '';
  var perpage = perpageValues.length > 1 ? h("div", {
    "class": "VueTables__limit-field"
  }, [h("label", {
    "class": classes.label,
    attrs: {
      "for": perpageId
    }
  }, [this.display('limit')]), modules.perPage(perpageValues, classes.select, perpageId)]) : '';
  var dropdownPagination = this.opts.pagination && this.opts.pagination.dropdown ? h("div", {
    "class": "VueTables__pagination-wrapper"
  }, [h("div", {
    "class": "".concat(classes.field, " ").concat(classes.inline, " ").concat(classes.right, " VueTables__dropdown-pagination"),
    directives: [{
      name: "show",
      value: this.totalPages > 1
    }]
  }, [h("label", {
    attrs: {
      "for": ddpId
    }
  }, [this.display('page')]), modules.dropdownPagination(classes.select, ddpId)])]) : '';
  var paginationTop = h("div", {
    "class": "VueTables__pagination-top ".concat(classes.left, " ")
  }, [modules.paginationTop(classes, slots, perpage)]);
  var columnsDropdown = this.opts.columnsDropdown ? h("div", {
    "class": "VueTables__columns-dropdown-wrapper"
  }, [modules.columnsDropdown(classes)]) : '';
  var footerHeadings = this.opts.footerHeadings ? h("tfoot", [h("tr", [modules.headings(classes.right)])]) : '';
  var shouldShowTop = genericFilter || dropdownPagination || columnsDropdown || slots.actions || slots.beforeFilter || slots.afterFilter || slots.beforeLimit || slots.afterLimit;
  var tableTop = h("div", {
    "class": "VueTables__header ".concat(classes.row),
    directives: [{
      name: "show",
      value: shouldShowTop
    }]
  }, [h("div", {
    "class": classes.column
  }, [slots.actions, paginationTop, h("div", {
    "class": "".concat(classes.field, " VueTables__search")
  }, [slots.beforeFilter, genericFilter, slots.afterFilter]), dropdownPagination, columnsDropdown])]);
  return h("div", {
    "class": "VueTables VueTables--" + this.source
  }, [tableTop, slots.beforeTable, h("div", {
    "class": "table-responsive"
  }, [h("table", {
    "class": "VueTables__table ".concat(this.opts.skin ? this.opts.skin : classes.table)
  }, [h("thead", [h("tr", [modules.headings(classes.right)]), slots.beforeFilters, modules.columnFilters(classes), slots.afterFilters]), footerHeadings, slots.beforeBody, h("tbody", [slots.prependBody, modules.rows(classes), slots.appendBody]), slots.afterBody])]), slots.afterTable]);
};