describe('Check broken links', () => {
  it('Validate URLs from JSON file', () => {
    cy.fixture('links.json').then(links => {
      links.forEach(link => {
        cy.request({
          method: 'GET',
          url: link.url,
          failOnStatusCode: false
              })
          })
      })
  })
})
