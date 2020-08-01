import login from "../../src/services/login";

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
          title: 'blog_1',
          author: 'tester 1',
          url: 'test1.org',
          user: {
            username: 'testaaja',
            password: 'salainen'
          }
        })
        cy.createBlog({
          title: 'blog_2',
          author: 'tester 2',
          url: 'test2.org',
          user: {
            username: 'testaaja',
            password: 'salainen'
          }
        })
      })

      it('a single can be liked', function () {
        cy.contains('blog_1')
            .contains('view')
            .click()

        cy.contains('likes: 0')

        cy.contains('blog_1')
            .contains('like')
            .click()

        cy.contains('likes: 1')
      })

      it('a blog can be deleted when user has proper credentials', function () {
        cy.contains('blog_1')
            .contains('view')
            .click()

        cy.contains('blog_1')
            .contains('remove')
            .click()

        cy.get('html').should('not.contain', 'blog_1')
      })

      // ei mikään maailman elegantein ratkaisu, mutta pitäisi toimia
      it('blog should be ordered by likes', function () {
        // molemmat blogit näkyviin
        cy.contains('blog_1')
            .contains('view')
            .click()

        cy.contains('blog_2')
            .contains('view')
            .click()

        // tykätään blogista nro 2 kaksi kertaa --> pitäisi siirtyä nro 1 yläpuolelle
        cy.contains('blog_2')
            .contains('like')
            .click()
            .click()

        cy.get('#blog-view')
            .each(element => {
              // haetaan kaikki elementit ja poimitaan oleellinen tieto niiden tekstisisällöstä
              let elementsString = element[0].textContent
              let elementsArray = elementsString.split(' ')
              let blog_1_index, blog_2_index;

              // 1. lisätyllä blogilla on testi1.org
              elementsArray.map(el => {
                if (el === 'test1.org')
                  blog_1_index = elementsArray.indexOf(el)  // tallennetaan 1. lisätyn blogin indeksi
                if (el === 'test2.org')
                  blog_2_index = elementsArray.indexOf(el)
              })

              console.log('blogi 1: ', blog_1_index)
              console.log('blogi 2: ', blog_2_index)

              // vähemmän tykätyn blogin pitäisi olla indeksiltään suurempi
              expect(blog_1_index).to.be.greaterThan(blog_2_index)
            })
      })
    })
  })
})