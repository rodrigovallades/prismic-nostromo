import React from 'react';
import PropTypes from 'prop-types';

export default class ExtendedGrid extends React.Component {

	renderSmallImages(images) {
		console.log('images', images);

		return (
			<div className='extended-grid__small'>
				{images.map((d, i) => {
					return (
						<div key={i} style={{backgroundImage: `url(${d.url})` }}>
							<span>{d.text}</span>
						</div>
					)
				})}
			</div>
		)
	}

	render() {
		const { data } = this.props;
		const smallImages = [];

		if (data.small_image_1) {
			smallImages.push({
				text: data.small_image_1_text.map(d => d.text) || '',
				url: data.small_image_1.url
			})
		}

		if (data.small_image_2) {
			smallImages.push({
				text: data.small_image_2_text.map(d => d.text)	 || '',
				url: data.small_image_2.url
			})
		}

		console.log('ExtendedGrid', data);

		if (!data && !data.big_image.url) {
			return null;
		}

		return (
			<div className='extended-grid'>
				<div className="extended-grid__container">
					<div className="extended-grid__big" style={{backgroundImage: `url(${data.big_image.url})` }}>
						<span>{data.big_image_text.map(d => d.text)}</span>
					</div>
					{smallImages.length && (this.renderSmallImages(smallImages))}
				</div>
			</div>
		)
	}
};

ExtendedGrid.propTypes = {
	data: PropTypes.object.isRequired,
};
