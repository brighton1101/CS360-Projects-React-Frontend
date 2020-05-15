import React, { Component } from "react";
import ReactDOM from "react-dom";

class ExampleComponent extends Component {
	constructor() {
		super();
		this.state = {
	    	value: ""
	    };
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('here')
	}

	render() {
		return <div>
			<form onSubmit={this.handleSubmit}>
				<button>Click me</button>
			</form>
		</div>
	}
};

export default ExampleComponent;

if (document.getElementById('example-component')) {
	ReactDOM.render(<ExampleComponent />, document.getElementById('example-component'));
}