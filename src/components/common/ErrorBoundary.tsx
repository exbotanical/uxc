import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
const o = 1;
class ErrorBoundary extends Component {
	state = {
		hasError: false,
		redirect: false
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// log error to service
		console.error(`error boundary captured ${error} ${info}`);

		setTimeout(() => {
			this.setState({
				redirect: true
			});
		}, 5000);
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		if (this.state.hasError) {
			return (
				<h1>
					<Link to="/">click here</Link>
					to go back to the homepage
				</h1>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
