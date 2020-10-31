import React from 'react'

const ErrorDisplay = (props) => {
	console.log('error display props', props);

	if (props.path === "/*") {
		return (
			<div className="error-msg">
				<p>Status: 404.</p>
				<p>Please check the URL you typed. </p>
			</div>
		)
	} else {
		return (
			<div className="error-msg">
				<h3>
					Sorry, we haven't been able to find the topic or article you are looking for.
				</h3>
				<h4>Please check whether you have typed the URL correctly.</h4>

				<p>Status: {props.status}. Message: {props.message}.</p>
			</div>
		)
	}
}

export default ErrorDisplay
