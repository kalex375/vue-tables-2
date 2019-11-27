module.exports = function (h) {

    return (classes, slots, perpage) => {

        if (this.opts.pagination && this.opts.pagination.dropdown) return '';

        let rowTemplate = this.$scopedSlots && this.$scopedSlots['pagination'];
        if (rowTemplate) {
            return rowTemplate({
                text: this.countMessage(),
                page: this.page,
                totalPages: this.totalPages,
                next: this.setNextPage.bind(this),
                prev: this.setPrevPage.bind(this)
            })
        }
        /*v-show={this.totalPages > 1}*/
        return <div class={`${classes.inline}`}>
            <span>{this.countMessage()}</span>
            <button class={classes.btnPrimary} disabled={this.page == 1} onClick={this.setPrevPage.bind(this)}><i
                class={this.opts.prevIcon}></i></button>
            <button class={classes.btnPrimary} disabled={this.totalPages == this.page}
                    onClick={this.setNextPage.bind(this)}><i class={this.opts.nextIcon}></i></button>
            <div className={`${classes.field} ${classes.inline} VueTables__limit`}>
                {slots.beforeLimit}
                {perpage}
                {slots.afterLimit}
            </div>
        </div>
    }

}
