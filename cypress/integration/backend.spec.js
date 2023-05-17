const apiUrl = `${Cypress.env("apiUrl")}`

describe('Backend Test Spec', () => {

  it('should call ping', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should call get all transactions', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transactions/`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should call get transaction by id', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transactions/461d8d68-8a1d-48b9-bb21-8fb69138056b/`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should call get transaction by id and return 404', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transactions/non-existent-id/`,
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('should call post transaction and return 201', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions/`,
      body: {
        "account_id": "c87832f6-a711-4f28-8855-d29f7e75e57a",
        "amount": 10
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('should call post transaction and return 400', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions/`,
      body: {
        "invalid_body": "yes"
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should call post transaction and return 400', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions/`,
      body: {
        "account_id": "c87832f6-a711-4f28-8855-d29f7e75e57a",
        "amount": "invalid_amount"
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should call post transaction and deduct the posted amount', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions/`,
      body: {
        "account_id": "c87832f6-a711-4f28-8855-d29f7e75e57a",
        "amount": 10
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  var balanceBeforeTransaction = 0

  // post a transaction and check if the amount is deducted from the account
  it('should call get transaction by id and check if the amount is deducted', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/c87832f6-a711-4f28-8855-d29f7e75e57a/`,
    }).then((response) => {
      balanceBeforeTransaction = response.body.balance
    })
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions/`,
      body: {
        "account_id": "c87832f6-a711-4f28-8855-d29f7e75e57a",
        "amount": 10
      }
    })

    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/c87832f6-a711-4f28-8855-d29f7e75e57a/`,
    }).then((response) => {
      const balanceAfterTransaction = response.body.balance
      expect(balanceAfterTransaction).to.eq(balanceBeforeTransaction - 10)
    })
  })

  it('should get an account by id', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/c87832f6-a711-4f28-8855-d29f7e75e57a/`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should get an account by id and return 404', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/non-existent-id/`,
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('should get all accounts', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
  
})