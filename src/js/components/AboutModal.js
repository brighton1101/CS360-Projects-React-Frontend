import React, { Fragment, Component } from "react";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

class AboutModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.handleClose.bind(this);
		this.handleOpen.bind(this);
	}

	handleClose(e) {
		this.setState({
			show: false
		});
	}

	handleOpen(e) {
		this.setState({
			show: true
		})
	}

	render(){
		return (
			<Fragment>
				<Button variant="outlined" color="secondary" onClick={() => {this.handleOpen()}}>About</Button>
				<Modal
					open={this.state.show}
					onClose={() => {this.handleClose()}}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<Fragment>
						<Box fluid="true" p={5}>
							<Box fluid="true" p={5} bgcolor="white" className="title-text">
								<p className="xlarge-font">Why did I make this? / About</p>
								<Grid container spacing={5} direction="row" justify="center" >
									<Grid item xs={4}>
										<p>1.</p>
										<p>I wanted to create a backend Python app to serve up various AI projects that I did in my class over the course of the semester, and learn more about connecting/integrating existing scripts to a web service. Also, I wanted to gain more experience using Flask and writing basic web apps in Python.</p>
									</Grid>
									<Grid item xs={4}>
										<p>2.</p>
										<p>I wanted to connect the backend service to an interactive, Single Page App frontend. I love using React, hence my Library choice. Plus I also wanted to learn more about how Webpack compiles JS apps for you.</p>
									</Grid>
									<Grid item xs={4}>
										<p>3.</p>
										<p>To use this App you must also be running the Flask backend application on port 5000. Assuming you've started the Webpack Dev Server, you should be good to go.</p>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Fragment>
				</Modal>
			</Fragment>
		);
	}
}

export default AboutModal;