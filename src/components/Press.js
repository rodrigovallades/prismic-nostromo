import React from 'react';
import PropTypes from 'prop-types';

export default class CMSPress extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      press: {
        image: (data.length && data[0].image.url) || '',
        author: (data.length && data[0].author)|| '',
        text: (data.length && data[0].text) || '',
      },
    };
  }

  handleClick = ({ currentTarget }) => {
    const { data } = this.props;
    const { index } = currentTarget.dataset;

    const selected = data[index];

    this.setState({
      press: {
        image: selected.image.url,
        author: selected.author,
        text: selected.text,
      },
    });
  };

  render() {
    const { press } = this.state;
    const { data } = this.props;

    if (!data.length) {
      return null;
    }

    return (
      <div className="app__cms__press">
        <div className="app__cms__press__container">
          <div className="app__cms__press__content">
            <p className="app__cms__press__text">{press.text}</p>
            {press.author && <p className="app__cms__prext__author">{press.author}</p>}
          </div>
          <div className="app__cms__press__images">
            {data.map((d, i) => {
              const imageClasses = ['app__cms__press__image'];

              if (d.image.url === press.image) {
                imageClasses.push('app__cms__press__image--active');
              }
              return (
                <button
                  type="button"
                  key={i}
                  className={imageClasses.join(' ')}
                  onClick={this.handleClick}
                  data-index={i}
                >
                  <img src={d.image.url} alt="" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

CMSPress.propTypes = {
  data: PropTypes.array.isRequired,
};
