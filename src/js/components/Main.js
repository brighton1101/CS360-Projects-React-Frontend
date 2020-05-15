import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';
import './Main.css';
import AboutModal from './AboutModal';


class Main extends Component {
	constructor() {
		super();
		this.state = {
			project: 1,
			displayedOutput: ''
		}
		this.projectInfo = {
			1: {
				project_name: 'Project 1: DFS and ASTAR',
				project_description: 'This is a project',
				button_text: 'DFS/ASTAR',
				endpoint: 'http://127.0.0.1:5000/api/project_1',
				description_pdf: 'public/project1.pdf',
			},
			2: {
				project_name: 'Project 2: Minimax and Alpha Beta Pruning',
				button_text: 'Minimax/AB Pruning',
				endpoint: 'http://127.0.0.1:5000/api/project_2',
				description_pdf: 'public/project2.pdf',
			},
			3: {
				project_name: 'Project 3: Markov Decision Process',
				button_text: 'MDP',
				endpoint: 'http://127.0.0.1:5000/api/project_3',
				description_pdf: 'public/project3.pdf',
			}
		};
	}

	updateProject(project_number) {
		if ((Number.isInteger(project_number)) && (project_number > 0) && (project_number <= Object.keys(this.projectInfo).length)) {
			this.setState({
				project: project_number,
				displayedOutput: ''
			});
		}
	}

	fetchResult() {
		let innerText = document.querySelector('#requestInput').value;
		console.log(innerText);
		if(innerText[innerText.length-1] === '\n') {
			innerText = innerText.slice(0,-1);
		}
		fetch(this.projectInfo[this.state.project].endpoint, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				body: innerText
			})
		})
		.then(res => {
			return res.json();
		})
		.then(res => {
			console.log(res)
			this.setState({
				...this.state,
				displayedOutput: res.body
			});
		})
		.catch(err => {
			console.log(err);
		});
	}

	render() {
		return (
			<Fragment>
				<Box fluid="true" p={2}>
					<Grid container spacing={5} direction="row" justify="center" alignItems="center">
						<Grid item xs={6}>
							<p className="title-text xlarge-font">CS360 Projects - Brighton Balfrey</p>
						</Grid>
						<Grid item>
							<AboutModal />
						</Grid>
					</Grid>
				</Box>
				<Box maxWidth="75%" m="auto" bgcolor="text.disabled">
					<Box m="auto" pt={3} display="flex">
						<Box m="auto">
							<Button variant="outlined" color="primary" className="title-text" onClick={() => {this.updateProject(1)}}>DFS / ASTAR</Button>
							<Button variant="outlined" color="primary" className="title-text" onClick={() => {this.updateProject(2)}}>Minimax / AB Pruning</Button>
							<Button variant="outlined" color="primary" className="title-text" onClick={() => {this.updateProject(3)}}>MDP</Button>
						</Box>
					</Box>
					<Box m="auto" w={1} display="inline" align="center" justify="center">
						<p className="title-text large-font">{this.projectInfo[this.state.project].project_name}</p>
						<p><a className="title-text center-link" target="_blank" href={this.projectInfo[this.state.project].description_pdf}>Click here for description about inputs/outputs</a></p>
					</Box>
					<Box m="auto" display="inline" p={2}>
						<Grid container spacing={1} direction="row" justify="center" alignItems="center">
							<Grid item xs={4}>
								<label htmlFor="project-input" className="title-text">Input:</label>
								<textarea name="project-input" id="requestInput" width="100%" className="textarea-size">
								</textarea>
							</Grid>
							<Grid item xs={4}>
								<label htmlFor="project-output" className="title-text">Output:</label>
								<textarea name="project-output" id="responseOutput" className="textarea-size" contentEditable={false} value={this.state.displayedOutput}>
								</textarea>	
							</Grid>
						</Grid>
						<Box display="flex" m="auto" align="center" justify="center">
							<Grid container spacing={1} direction = "row" justify="center" alignItems="center">
								<Grid item xs={4}>
									<Button variant="outlined" color="secondary" onClick={() => {this.fetchResult()}}>Run!</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Box>
			</Fragment>
		);
	}
}

export default Main;

if (document.getElementById('body')) {
	ReactDOM.render(<Main />, document.getElementById('body'));
}