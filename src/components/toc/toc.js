/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toc component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import {tocSiteMap} from '../../hooks/toc-siteMap';

// Styles
import compStyles from './toc.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class TOC extends React.Component {

	constructor(props) {
		super(props);
		this.state = ({isTOC: true});
	}

	componentDidMount() {
		let isTOC = this.props.toc.length > 0;
		this.setState({isTOC: isTOC});
		this.props.isTOC(this.state.isTOC);
	};

	getAnchor = (heading) => {

		let specialCharacters = /[:?.,]/g,
			whiteSpace = /\s/g;

		return heading.replace(whiteSpace, '-').replace(specialCharacters, '').toLowerCase();
	};

	isActive = (heading, activeTOC) => {
		return `#${this.getAnchor(heading)}` === activeTOC;
	};

	render() {
		const {activeTOC, toc} = this.props;
		return (
			<div className={compStyles.hcaToc}>
				<ul className={compStyles.tocs}>
					{toc ? toc.map((heading, i) =>
						<li key={i}
							className={classNames({[compStyles.active]: this.isActive(heading.value, activeTOC)})}>
							<a className={classNames(fontStyles.xs, {[compStyles.depth3]: heading.depth === 3})} href={`#${this.getAnchor(heading.value)}`}>{heading.value}</a>
						</li>) : null}
				</ul>
			</div>
		);
	}
}

export default (props) => {

	let docPath = props.docPath,
		pagesTOC = tocSiteMap(docPath);
	const toc = pagesTOC ? pagesTOC.headings.slice(1).filter(heading => heading.depth <= 3) : '';

	return (
		<TOC toc={toc} {...props}/>
	);
}
