module.exports = function() {
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let totalPages = this.totalPages;

    if (/{page}/.test(this.opts.texts.count)) {

        if (totalPages <= 1) return '';

        return this.opts.texts.count.replace('{page}', this.page).replace('{pages}', totalPages);
    }

    var parts = this.opts.texts.count.split('|');
    var from = (this.page - 1) * this.limit + 1;
    var to = this.page == totalPages ? this.count : from + this.limit - 1;
    var i = Math.min(this.count == 1 ? 2 : totalPages == 1 ? 1 : 0, parts.length - 1);

    return parts[i].replace('{count}', formatNumber(this.count)).replace('{from}', formatNumber(from)).replace('{to}', formatNumber(to));
}
