/// <reference types='cypress'/>
let id
import { postRequestBody, putRequestBody } from '../../fixtures/testData.json'

describe('API-Cypress Practice01', () => {
  // before('Delete All', () => {
  //   cy.request({
  //     method: 'DELETE',
  //     url: `${Cypress.env('baseURL')}/all/delete`,
  //   })
  // })
  it('TASK-1: Get All Students', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseURL')}`,
    }).then((response) => {
      expect(response.status).to.equal(200)

      expect(response.body).to.have.length.gte(2)
      response.body.forEach((student) => {
        expect(student).to.have.property('STUDENT_ID')
      })
    })
  })

  it('TASK-2: Create a New Student', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseURL')}`,
      body: postRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.STUDENT_ID).to.be.greaterThan(2)
      expect(response.body.DOB.split('T')[0]).to.equal(postRequestBody.DOB)
      expect(response.body.EMAIL).to.equal(postRequestBody.EMAIL)
      expect(response.body.FIRST_NAME).to.equal(postRequestBody.FIRST_NAME)
      expect(response.body.LAST_NAME).to.equal(postRequestBody.LAST_NAME)
      expect(response.body.INSTRUCTOR_ID).to.equal(postRequestBody.INSTRUCTOR_ID)
      id = response.body.STUDENT_ID
    })
  })

  it('TASK-3: Get Newly Created Student', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseURL')}/${id}`,
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.DOB.split('T')[0]).to.equal(postRequestBody.DOB)
      expect(response.body.EMAIL).to.equal(postRequestBody.EMAIL)
      expect(response.body.FIRST_NAME).to.equal(postRequestBody.FIRST_NAME)
      expect(response.body.LAST_NAME).to.equal(postRequestBody.LAST_NAME)
      expect(response.body.INSTRUCTOR_ID).to.equal(postRequestBody.INSTRUCTOR_ID)
    })
  })

  it('TASK-4: Update Newly Created Student with a Different Instructor', () => {
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('baseURL')}/${id}`,
      body: putRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.eq(`Successfully updated ${postRequestBody.FIRST_NAME}`)
    })
  })

  it('TASK-5: Delete Newly Created Student', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseURL')}/${id}`,
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.eq(`Successfully deleted user with Id: ${id}`)
    })
  })
})
