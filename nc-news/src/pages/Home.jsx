import React from 'react'

const Home = () => {

	const enterSite = (event) => {

	}

	return (
		<section>
			<div className="welcome-page">
				<h1>Welcome to NC News</h1>
				<h2>Read the latest news that matters to you</h2>
				<h2>Post comments and join the conversation</h2>
			</div>
			<div>
				<button className="enter-site-btn" onClick={enterSite}>Enter</button>
			</div>
		</section >
	)
}


export default Home
