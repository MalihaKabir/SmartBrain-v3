import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div className="form center pa4 br3 shadow-5">
			<input
				type="text"
				className="f4 pa2 w-70 center shadow-5"
				onChange={onInputChange}
				placeholder={'Your photo link'}
			/>
            <button
                className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple shadow-5" onClick={onPictureSubmit}>
				Detect
			</button>
		</div>
	);
};

export default ImageLinkForm;