import React from 'react'
import { Link } from '@reach/router';


const Home = () => {

	return (
		<section className="welcome-page">
			<div className="welcome-page-text-container">
				<h1 className="welcome-page-text">Welcome to NorthCoder News</h1>
				<h2 className="welcome-page-text">Read the latest news that matters to you</h2>
				<h2 className="welcome-page-text">Post comments and join the conversation</h2>
			</div>
			<div>
				<button className="enter-site-btn"><Link className="enter-site-link" to={'/articles'}>Enter site</Link></button>
			</div>
		</section>
	)
}


export default Home
