import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgURL, box }) => {
	return (
		<div className="center ma shadow-5 br6">
			<div className="absolute mt2">
				<img
					id="inputImageId"
					alt="recognizedImage"
					src={imgURL}
					width="500px"
					height="auto"
					className="shadow-5 br3"
				/>
				<div
					className="bounding-box"
					style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
				/>
			</div>
		</div>
	);
};

export default FaceRecognition;
