import React from 'react'

const Pagination = (props) => {
	const resultsOnEachPage = props.resultsPerPage
	const totalPosts = props.totalPosts
	const pageCount = Math.ceil(totalPosts / resultsOnEachPage)
	const atStart = props.page === 1
	const atEnd = props.page === pageCount

	return (
		<section className="pagination-container">
			<button disabled={atStart} className="paginate-btn" onClick={() => props.setPage(props.page - 1)}>{'<'}</button>
			<p className="paginate-page-text">Page {props.page} of {pageCount}</p>
			<button disabled={atEnd} className="paginate-btn" onClick={() => props.setPage(props.page + 1)}> {'>'}</button>
		</section>
	)
}


export default Pagination