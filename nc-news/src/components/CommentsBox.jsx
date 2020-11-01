import axios from 'axios'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textBox: {
		width: 650,
		'@media (max-width:420px)': {
			width: 300,
		}
  },
});

class CommentsBox extends Component {
	state = {
		commentsText: '',
	}

	handleChange = (event) => {
		const text = event.target.value
		this.setState((currentState) => {
			return { commentsText: text }
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		let { articleId, username } = this.props;
		if (username.length === 0) username = 'jessjelly'
		axios.post(
			`https://nc-news-fe-jonp.herokuapp.com/api/articles/${articleId}/comments`,
			{
				body: this.state.commentsText,
				username: username,
			})
			.then((res) => {
				this.setState({ commentsText: '' })

				this.props.addComments(res.data)
			}).catch((response) => {
				this.setState({
					error: {
						status: response.status,
						message: response.data.msg
					}
				})
			})
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="comments-box">
				<div className="comment-box-text">
			  <TextField className={classes.textBox} id="filled-basic" label="Add a comment" variant="filled" value={this.state.commentsText} onChange={this.handleChange}/>
				</div>
				<div className="comments-box-btn">
					<button className="comments-submit-btn" disabled={this.state.commentsText.length === 0} onClick={this.handleSubmit}>Post</button>
				</div>
			</div>
		)
	}
}

CommentsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentsBox);
