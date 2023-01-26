//broken-link1.cy.js

describe('Test External Links', () => {

    it('should verify links', () => {
  
      cy.fixture('links').then((data) => {
  
        for (var index in data) {
  
          cy.log(data[index].url)
  
          cy.request({
  
            url:data[index].url,
  
            failOnStatusCode: false
  
          })
  
        }
  
      })
  
    })
  
  })