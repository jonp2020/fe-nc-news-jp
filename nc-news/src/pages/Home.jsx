import React from 'react'
import { Link } from '@reach/router';


const Home = () => {

	const enterSite = (event) => {
		event.preventDefault()

	}

	return (
		<section>
			<div className="welcome-page">
				<h1>Welcome to NC News</h1>
				<h2>Read the latest news that matters to you</h2>
				<h2>Post comments and join the conversation</h2>
			</div>
			<div>
				<button className="enter-site-btn"><Link className="enter-site-btn" to={'/articles'}>Enter site</Link></button>
			</div>
		</section >
	)
}


export default Home
