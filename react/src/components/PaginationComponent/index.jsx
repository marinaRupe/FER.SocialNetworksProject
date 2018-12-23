import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PageItem, PageLink } from 'mdbreact';

class PaginationComponent extends Component {
  pagination = (current, max) => {
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= max; i++) {
      if (i === 1 || i === max || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  render() {
    const { current = 1, total = 20, action } = this.props;
    const shownPages = this.pagination(current, total);

    return (
      <Pagination className='pg-red'>
        <PageItem disabled={current === 1}>
          <PageLink className='page-link' aria-label='Previous' onClick={action.bind(null, current - 1)}>
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>Previous</span>
          </PageLink>
        </PageItem>

        {shownPages.map(p => (
          <PageItem key={p} active={p === current}>
            <PageLink className='page-link' onClick={action.bind(null, p)}>
              {p} {(p === current) && (<span className='sr-only'>(current)</span>)}
            </PageLink>
          </PageItem>
        ))}

        <PageItem disabled={current === total}>
          <PageLink className='page-link' onClick={action.bind(null, current + 1)}>
            &raquo;
          </PageLink>
        </PageItem>
      </Pagination>
    );
  }
}

PaginationComponent.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};

export default PaginationComponent;
