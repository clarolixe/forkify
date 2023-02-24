import View from './view';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--inline`);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generatePaginationButton(true, curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePaginationButton(false, curPage);
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._generatePaginationButton(false, curPage) +
        this._generatePaginationButton(true, curPage)
      );
    }
    // Page 1, and there is no other pages
    return ``;
  }

  _generatePaginationButton(next, page) {
    return `<button 
      data-goto='${next ? page + 1 : page - 1}'
      class="btn--inline pagination__btn${next ? '--next' : '--prev'}">
        <span>Page ${next ? page + 1 : page - 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${next ? 'right' : 'left'}"></use>
        </svg>
    </button> `;
  }
}

export default new paginationView();
