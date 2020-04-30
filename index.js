#!/usr/bin/env node

const inquirer = require('inquirer')
const crypto = require('crypto')
const qrcode = require('qrcode-terminal')

inquirer.prompt([
  {
    type: 'text',
    name: 'website',
    message: 'Which website ?'
  },
  {
    type: 'text',
    name: 'name',
    message: 'What is your username ?'
  },
  {
    type: 'password',
    name: 'her',
    message: 'What is her name ?'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Private key'
  },
  {
    type: 'confirm',
    name: 'encode',
    message: 'Base64 ?',
    default: true
  }
])
.then(answers => {
  let password = Buffer.from(answers.website + answers.name + answers.her + answers.password)

  let h

  h = crypto.createHash('sha1')
  h.update(password)
  h = h.digest('hex')

  if (answers.encode) {
    h = Buffer.from(h).toString('base64')
  }

  console.log('Your password :', h)

  qrcode.generate(h, {small: true}, qr => {
	  console.log(qr)
  })

  setTimeout(() => {
    console.clear()
  }, 10000)
})
.catch(err => {
  console.error(err)
  process.exit()
})