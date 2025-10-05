describe('API Testing', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.contains('Rahul Shetty Academy');
    }
    )

    it('1 book retrieval using intercept', () => {

        //Setup the intercept
        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            },

            {
                statusCode: 200,
                body: [{
                    "book_name": "RestAssured with Java",
                    "isbn": "LSA",
                    "aisle": "2303"
                },

                ]
            }
        ).as('RetrieveOneBook')

        //then trigger the request
        cy.get('button[class="btn btn-primary"]').should('be.visible').click();

        //wait for the intrcept
        cy.wait('@RetrieveOneBook');

        //Assert
        cy.get('p').should('have.text', 'Oops only 1 Book available');
    })


    it('Checking whether the API response is correctly rendered in UI', () => {

    //Setup the intercept
    cy.intercept(
        {
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },

        {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "LSA",
                "aisle": "2303"
            },
            {
                "book_name": "RestAssured with Python",
                "isbn": "LSB",
                "aisle": "2304"
            },
            {
                "book_name": "RestAssured with Javascript",
                "isbn": "LSC",
                "aisle": "2304"
            },

            ]
        }
    ).as('RetrieveOneBook')

    //then trigger the request
    cy.get('button[class="btn btn-primary"]').should('be.visible').click();

    //wait for the intrcept
    cy.wait('@RetrieveOneBook').then(({ request, response }) => {
        cy.get('tr').should('have.length', response.body.length + 1);
    }

    );

})

it('Modifying HTTP request url (Intercepting in Security testing)', () => {

    //Setup the intercept
    cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        (req)=>
        {
            req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
            req.continue((res)=>
            
            {
                expect(res.statusCode).to.equal(403)
            })

            }).as('modifiedUrl');

    //then trigger the request
    cy.get('button[class="btn btn-primary"]').should('be.visible').click();

    //wait for the intrcept
    cy.wait('@modifiedUrl');

})
})

