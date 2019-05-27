import React from 'react';
import './ImageLinkForm.css';
import InputBtnForImgForm from './InputBtnForImgForm';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div>
			<p className="f4">
				{'This Magic Brain will ditect faces in your pictures. Give it a try.'}
			</p>
			<div className="center">
				<InputBtnForImgForm
					onInputChange={onInputChange}
					onPictureSubmit={onPictureSubmit} 
				/>
			</div>
		</div>
	);
};

export default ImageLinkForm;
