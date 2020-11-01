import React from 'react'

export const Footer = () => {
	const currentYear = new Date().getFullYear()
	return (
		<footer className="footer">
			<p>Copyright © {currentYear}</p>
			<p><span className="nc-logo">N</span>ORTH<span className="nc-logo">C</span>ODER <span className="nc-logo">N</span>EWS</p>
		</footer>
	)
}
