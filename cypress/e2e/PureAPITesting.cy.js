describe('API Testing: GET and POST Requests', () => {

  // GET request: Fetch all posts
  it('GET - Fetch all posts', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        expect(response.status).to.eq(200)                   // Status code check
        expect(response.body).to.be.an('array')             // Response type check
        expect(response.body.length).to.be.greaterThan(0)   // Ensure data exists
      })
  })

  // POST request: Create a new post
  it('POST - Create a new post', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
      title: 'My New Post',
      body: 'This is a test post created via Cypress',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(201)                  // Created successfully
      expect(response.body).to.have.property('id')        // Check if ID is returned
      expect(response.body.title).to.eq('My New Post')    // Validate title
    })
  })

})
