import {useStaticQuery, graphql} from 'gatsby';

export const tocSiteMap = (docPath) => {
	const {allMarkdownRemark} = useStaticQuery(
		graphql`
		query TocSiteMap {
		  allMarkdownRemark {
			edges {
			  node {
				fields {
				  path
				}
				headings {
				  depth
				  value
				}
			  }
			}
		  }
		}
    `
	);
	return allMarkdownRemark.edges.map(e => e.node).filter(n => n.fields.path === docPath)[0];
};
