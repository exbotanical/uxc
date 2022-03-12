import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import 'cypress-real-events/support';

import './commands';

Cypress.on('uncaught:exception', (err) => {
	console.log(err);

	// Cannot set properties of null (setting 'onopen')

	return false;
});
