describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Testaaja',
      username: 'testaaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('front page can be opened', function () {
      cy.contains('Blogs')
    })

    it('login fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
          .should('contain', 'Wrong credentials')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Logged in')
    })

    it('login succeeds with valid credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'Logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testaaja', password: 'salainen' })
    })

    describe('multiple blogs can be created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog 1',
          author: 'tester 1',
          url: 'test1.org',
          user: {
            username: 'testaaja',
            password: 'salainen'
          }
        })
        cy.createBlog({
          title: 'test blog 2',
          author: 'tester 2',
          url: 'test2.org',
          user: {
            username: 'testaaja',
            password: 'salainen'
          }
        })
      })

      it('a single can be liked', function () {
        cy.contains('test blog 1')
            .contains('view')
            .click()

        cy.contains('likes: 0')

        cy.contains('test blog 1')
            .contains('like')
            .click()

        cy.contains('likes: 1')
      })

      it('a blog can be deleted when user has proper credentials', function () {
        cy.contains('test blog 1')
            .contains('view')
            .click()

        cy.contains('test blog 1')
            .contains('remove')
            .click()

        cy.get('html').should('not.contain', 'test blog 1')
      })


    })
  })


})