import { join } from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(join(__dirname, './graphql'), {
	extensions: ['graphql']
});

export const typeDefs = mergeTypeDefs(typesArray);
