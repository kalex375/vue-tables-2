"use strict";

module.exports = function (h) {
  var _this = this;

  return function (classes, slots, perpage) {
    if (_this.opts.pagination && _this.opts.pagination.dropdown) return '';
    var rowTemplate = _this.$scopedSlots && _this.$scopedSlots['pagination'];

    if (rowTemplate) {
      return rowTemplate({
        text: _this.countMessage(),
        page: _this.page,
        totalPages: _this.totalPages,
        next: _this.setNextPage.bind(_this),
        prev: _this.setPrevPage.bind(_this)
      });
    }
    /*v-show={this.totalPages > 1}*/


    return h("div", {
      "class": "".concat(classes.inline)
    }, [h("span", [_this.countMessage()]), h("button", {
      "class": classes.btnPrimary,
      attrs: {
        disabled: _this.page == 1
      },
      on: {
        "click": _this.setPrevPage.bind(_this)
      }
    }, [h("i", {
      "class": _this.opts.prevIcon
    })]), h("button", {
      "class": classes.btnPrimary,
      attrs: {
        disabled: _this.totalPages == _this.page
      },
      on: {
        "click": _this.setNextPage.bind(_this)
      }
    }, [h("i", {
      "class": _this.opts.nextIcon
    })]), h("div", {
      attrs: {
        className: "".concat(classes.field, " ").concat(classes.inline, " VueTables__limit")
      }
    }, [slots.beforeLimit, perpage, slots.afterLimit])]);
  };
};