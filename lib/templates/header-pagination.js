import merge from 'merge';

module.exports = function (h, modules, classes, slots) {

    var filterId = 'VueTables__search_' + this.id;
    var ddpId = 'VueTables__dropdown-pagination_' + this.id;
    var perpageId = 'VueTables__limit_' + this.id;
    var perpageValues = require('../modules/per-page-values').call(this, h);

    var genericFilter = this.hasGenericFilter ?
        <div class="VueTables__search-field">
            <label for={filterId} class={classes.label}>{this.display('filter')}</label>
            {modules.normalFilter(classes, filterId)}
        </div> : '';

    var perpage = perpageValues.length > 1 ? <div class="VueTables__limit-field">
        <label class={classes.label} for={perpageId}>{this.display('limit')}</label>
        {modules.perPage(perpageValues, classes.select, perpageId)}
    </div> : '';

    var dropdownPagination = this.opts.pagination && this.opts.pagination.dropdown ?
        <div class="VueTables__pagination-wrapper">
            <div class={`${classes.field} ${classes.inline} ${classes.right} VueTables__dropdown-pagination`}
                 v-show={this.totalPages > 1}
            >
                <label for={ddpId}>{this.display('page')}</label>
                {modules.dropdownPagination(classes.select, ddpId)}
            </div>
        </div> : '';

    var paginationTop = <div class={`VueTables__pagination-top ${classes.left} `}>
        {modules.paginationTop(classes, slots, perpage)}
    </div>;

    var columnsDropdown = this.opts.columnsDropdown ?
        <div class="VueTables__columns-dropdown-wrapper">
            {modules.columnsDropdown(classes)}
        </div> : '';

    var footerHeadings = this.opts.footerHeadings ?
        <tfoot>
        <tr>{modules.headings(classes.right)}</tr>
        </tfoot> : '';

    var shouldShowTop = genericFilter ||
        dropdownPagination ||
        columnsDropdown ||
        slots.actions ||
        slots.beforeFilter ||
        slots.afterFilter ||
        slots.beforeLimit ||
        slots.afterLimit;

    var tableTop = <div class={`VueTables__header ${classes.row}`} v-show={shouldShowTop}>
        <div class={classes.column}>
            {slots.actions}
            {paginationTop}
            <div class={`${classes.field} VueTables__search`}>
                {slots.beforeFilter}
                {genericFilter}
                {slots.afterFilter}
            </div>
            {dropdownPagination}
            {columnsDropdown}
        </div>
    </div>;

    return <div class={"VueTables VueTables--" + this.source}>
        {tableTop}
        {slots.beforeTable}
        <div class="table-responsive">
            <table class={`VueTables__table ${this.opts.skin ? this.opts.skin : classes.table}`}>
                <thead>
                <tr>
                    {modules.headings(classes.right)}
                </tr>
                {slots.beforeFilters}
                {modules.columnFilters(classes)}
                {slots.afterFilters}
                </thead>
                {footerHeadings}
                {slots.beforeBody}
                <tbody>
                {slots.prependBody}
                {modules.rows(classes)}
                {slots.appendBody}
                </tbody>
                {slots.afterBody}
            </table>
        </div>
        {slots.afterTable}
    </div>
}
