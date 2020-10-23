import React from 'react'
import { Link } from '@reach/router';

export const Header = () => {
	return (
		<header className="header">
			<Link className="nc-logo" to={`/articles`}>
				<span className="nc-logo-first-letters">N</span>ORTH<span className="nc-logo-first-letters">C</span>ODER <span className="nc-logo-first-letters">N</span>EWS
			</Link>
		</header>
	)
}
