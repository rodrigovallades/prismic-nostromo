import React from 'react';
import PropTypes from 'prop-types';

import { minScreenSize } from '../modules/dom';

import './ExtendedGrid.css';

export default class ExtendedGrid extends React.Component {
	state = {
		size: window.innerWidth
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize = () => {
		this.setState({ size: window.innerWidth })
	}

	renderSmallImages(images) {
		return (
			<div className='extended-grid__small'>
				{images.map((d, i) => {
					return (
						<div key={i} className='extended-grid__small__item'>
							<h3>{d.text}</h3>
							<img src={d.url} />
						</div>
					)
				})}
			</div>
		)
	}

	render() {
		const { data } = this.props;
		const smallImages = [];

		const classes = ['extended-grid'];

		if (data.skip_margin === 'true') {
			classes.push('prismic--skip-margin')
		}

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

		if (!data && !data.big_image.url) {
			return null;
		}

		return (
			<div className={classes.join(' ')}>
				<div className="extended-grid__container">
					<div className="extended-grid__big">
						<h2>{data.big_image_text.map(d => d.text)}</h2>
						<img src={minScreenSize('md') && data.big_image.large.url ? data.big_image.large.url : data.big_image.url} />
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
