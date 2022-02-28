describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Maija Meikalainen',
            username: 'mmeikalainen',
            passwordHash: 'salainen1'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mmeikalainen')
            cy.get('#password').type('salainen1')
            cy.get('#login-button').click()
            cy.contains('Maija Meikalainen logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('joku')
            cy.get('#password').type('salainen1')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('mmeikalainen')
            cy.get('#password').type('salainen1')
            cy.get('#login-button').click()

            cy.contains('create new blog').click()
            cy.get('#title-input').type('new cypress blog2')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('cypress.com')
            cy.get('#create-button').click()
        })
    
        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title-input').type('new cypress blog')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('cypress.com')
            cy.get('#create-button').click()
            cy.contains('new blog new cypress blog by cypress added')
        })

        it('A blog can be liked', function() {
            cy.contains('view').click()
            cy.get('#like-button').click().should('contain', 'Like')
            cy.contains('1')
        })

        it('A blog can be deleted', function() {
            cy.reload()
            cy.contains('view').click()
            cy.get('#remove-button').click()
            cy.get('html').should('not.contain', 'new cypress blog2')
            cy.contains('Blog deleted')
        })
    })
})
