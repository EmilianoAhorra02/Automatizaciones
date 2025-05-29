const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'tvp8q2',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
