import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type AboutState = {
	loading: boolean;
	userId?: number;
};

interface MatchParams {
	id: string | undefined;
}

interface AboutProps extends RouteComponentProps<MatchParams> {}

class About extends Component<AboutProps, AboutState> {
	constructor(props: AboutProps) {
		super(props);

		this.state = {
			loading: true
		};
	}

	async componentDidMount() {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/todos/${
				this.props?.match?.params?.id || 1
			}`
		).then((response) => response.json());

		this.setState(
			Object.assign(
				{
					loading: false
				},
				res
			)
		);
	}

	render() {
		return (
			<div>
				WHOA DUDE
				{this.state.loading ? 'loading...' : this.state.userId}
			</div>
		);
	}
}

export default About;
