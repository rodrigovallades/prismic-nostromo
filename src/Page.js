import React from 'react';
import NotFound from './NotFound';
import PrismicReact from 'prismic-reactjs';

import Quote from './components/Quote';
import ExtendedGrid from './components/ExtendedGrid';
import Press from './components/Press';

import './Page.css'

// Declare your component
export default class Page extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: null,
      notFound: false,
    }
    if (props.prismicCtx) {
      this.fetchPage(props);
    }
  }

  componentDidUpdate(prevProps) {
    this.props.prismicCtx.toolbar();
    // We fetch the page only after it's ready to query the api
    if (!prevProps.prismicCtx) {
      this.fetchPage(this.props);
    }
  }

  fetchPage(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getByUID('page', props.match.params.uid, {}, (err, doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ doc });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
	}

	render() {
		const { doc } = this.state;

		if (doc) {
			return (
				<div className='app__cms__container' data-wio-id={doc.id} data-disjointed-align={doc.data.disjointed}>
					{/* This is how to insert a Rich Text field as plain text */}
					<h1>{PrismicReact.RichText.asText(doc.data.title)}</h1>
					{Array.isArray(doc.data.body) && doc.data.body.map((d, i) => {
						switch (d.slice_type) {
							case 'quote': {
								return (<Quote data={d.primary} key={i} />)
							}
							case 'extended_grid': {
								return (<ExtendedGrid data={d.primary} key={i} />)
							}
							case 'press': {
								return (<Press data={d.items} key={i} />)
							}
							default: {
								return null;
							}
						}
					})}
				</div>
			);
		} else if (this.state.notFound) {
			return <NotFound />;
		}
		return <h1>Loading</h1>;
	}
}
