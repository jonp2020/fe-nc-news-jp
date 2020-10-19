import React from 'react'

export const Footer = () => {
	const currentYear = new Date().getFullYear()
	return (
		<footer className="footer">
			Copyright © {currentYear}
		</footer>
	)
}
