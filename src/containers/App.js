import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';

const app = new Clarifai.App({
	apiKey: '036f526ad4d4471d87379a83017d3cbf'
});

const particlesOptions = {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 850
			}
		}
	}
};

// Outside of the app, we'll call it- Initial State:
const initialState = {
	input: '',
	imgURL: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		});
	};

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImageId');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		};
	};

	displayDetectedFaceBox = (mybox) => {
		this.setState({ box: mybox });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onPictureSubmit = () => {
		this.setState({ imgURL: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) => {
				if (response) {
					fetch('http://localhost:3001/image', {
						method: 'put',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then((response) => response.json())
						.then((count) => this.setState(Object.assign(this.state.user, { entries: count })))
						.catch(console.log); // to log out any errors we have.
					// It's important to have '.catch()' every time you do 'fetch()' something to make sure that we don't have Errors that happen without us knowing. This is the best way to practice Error Handling.
				}
				this.displayDetectedFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, route, box, imgURL } = this.state;
		return (
			<div className="App">
				<Particles params={particlesOptions} className="particles" />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries} />
						<ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
						<FaceRecognition box={box} imgURL={imgURL} />
					</div>
				) : route === 'signin' ? (
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
					<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;