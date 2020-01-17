#!/usr/bin/env node

const inquirer = require('inquirer')
const crypto = require('crypto')
const qrcode = require('qrcode-terminal')

inquirer.prompt([
  {
    type: 'input',
    name: 'website',
    message: 'Which website ?'
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is your username ?'
  },
  {
    type: 'input',
    name: 'her',
    message: 'What is her name ?'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Private key'
  }
]).then(answers => {
  answers = Buffer.from(answers.website + answers.name + answers.her + answers.password)

  let h

  h = crypto.createHash('sha1')
  h.update(answers)
  h = h.digest('hex')

  console.log('Your password :', h)

  qrcode.generate(h, {small: true}, qr => {
	  console.log(qr)
  })
})
