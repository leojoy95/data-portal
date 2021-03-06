/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Page displaying 404 (page not found) errors.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Layout from '../components/layout';

// Styles
import compStyles from './error.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

const ErrorPage = () => (
	<Layout homeTab={false} noNav={true} noTab={true} sectionTitle={'Error'}>
		<div className={compStyles.cellImage}/>
		<h1 className={globalStyles.md}>Oops!</h1>
		<p className={fontStyles.m}>An error has occurred processing your request.</p>
	</Layout>
);

export default ErrorPage;
