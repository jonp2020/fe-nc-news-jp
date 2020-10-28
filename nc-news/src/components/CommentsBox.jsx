import axios from 'axios'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textBox: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // color: 'white',
    // height: 48,
    // padding: '0 30px',
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
		console.log('props', this.props);
		const { classes } = this.props;

		return (
			<div className="comments-box">
			  <TextField className={classes.textBox} id="filled-basic" label="Add a comment" variant="filled" value={this.state.commentsText} onChange={this.handleChange}/>

				{/* <textarea value={this.state.commentsText} onChange={this.handleChange}></textarea> */}
				<Button variant="contained" size="small" disabled={this.state.commentsText.length === 0} onClick={this.handleSubmit} className="comments-btn">Post</Button>
			</div>

		)
	}
}

CommentsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentsBox);
