import React from 'react';
import PropTypes from 'prop-types';

import './Quote.css'

const Quote = ({data})=> {
	if (!data || !data.text) {
		return null;
	}

	return (
		<div className='quote' data-position={data.image_position}>
			<div className='quote__container'>
				<div className='quote__image'>
					<img className='image' src={data.image.url} alt="Quote" />
				</div>
				<div className="quote__content">
					<p>{data.text.map(d => d.text)}</p>
				</div>
			</div>
		</div>
	)
};

Quote.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Quote;
