const _ = require(`lodash`);
const crypto = require(`crypto`);
const {createFilePath} = require(`gatsby-source-filesystem`);


async function onCreateNode({node, getNode, actions, loadNodeContent}) {

	const {createNode, createParentChildLink} = actions;

	function transformObject(obj, id, type) {
		const objStr = JSON.stringify(obj)
		const contentDigest = crypto
			.createHash(`md5`)
			.update(objStr)
			.digest(`hex`)
		const jsonNode = {
			...obj,
			id,
			children: [],
			parent: node.id,
			myPath: node.relativeFilePath,
			internal: {
				contentDigest,
				type,
			},
		}
		createNode(jsonNode)
		createParentChildLink({parent: node, child: jsonNode})
	}


	// We only care about JSON content.
	if (node.internal.mediaType !== `application/json`) {
		return
	}

	// We only care about the metadata JSON content
	if (node.relativePath.includes('config.json')) {
		return
	}

	const content = await loadNodeContent(node);
	const parsedContent = JSON.parse(content);

	const relativeFilePath = createFilePath({
		node,
		getNode,
		basePath: ''
	});

	const sections = relativeFilePath.split('/');
	const propertyNames = _.keys(parsedContent.properties);

	// Excluded properties from each type json
	const excludedProperties = ['describedBy', 'schema_version', 'schema_type', 'provenance'];

	const properties = propertyNames.filter(name => !excludedProperties.includes(name)).map(name => {

		// stringify properties.example
		// gatsby infers type on build and chooses type based on first read - graphiql cannot handle a field of differing type
		parsedContent.properties[name].example = JSON.stringify(parsedContent.properties[name].example);

		return {
			name: name,
			properties: parsedContent.properties[name]
		}
	});

	const entity = {
		coreEntity: sections[2], // core type biomaterial, project,
		description: parsedContent.description,
		name: parsedContent.name,
		properties: properties,
		relativeFilePath: relativeFilePath,
		required: parsedContent.required,
		schemaType: sections[1], // core, type or module
		title: parsedContent.title
	};

	transformObject(
		entity,
		`${node.id}  >>> JSON`,
		'MetadataSchemaEntity');


}

exports.onCreateNode = onCreateNodede = onCreateNode;
