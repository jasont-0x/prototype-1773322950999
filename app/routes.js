const router = require('govuk-prototype-kit/lib/utils').getRouter()

function generateReference(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

// Start page
router.get('/', function (req, res) {
  res.render('start')
})

// Is your child currently attending school in England?
router.get('/child-in-school', function (req, res) {
  res.render('child-in-school', { errors: null, data: req.session.data })
})

router.post('/child-in-school', function (req, res) {
  const answer = req.session.data['child-in-school']
  if (!answer || answer.trim() === '') {
    return res.render('child-in-school', {
      errors: { 'child-in-school': 'Select yes if your child is currently attending school in England' },
      data: req.session.data
    })
  }

  if (answer === 'No') {
    return res.redirect('/ineligible-child-in-school')
  }
  res.redirect('/receive-benefits')
})

// Ineligible — child-in-school
router.get('/ineligible-child-in-school', function (req, res) {
  res.render('ineligible-child-in-school')
})

// Do you receive any qualifying benefits?
router.get('/receive-benefits', function (req, res) {
  res.render('receive-benefits', { errors: null, data: req.session.data })
})

router.post('/receive-benefits', function (req, res) {
  const answer = req.session.data['receive-benefits']
  if (!answer || answer.trim() === '') {
    return res.render('receive-benefits', {
      errors: { 'receive-benefits': 'Select yes if you receive qualifying benefits' },
      data: req.session.data
    })
  }

  if (answer === 'No') {
    return res.redirect('/ineligible-receive-benefits')
  }
  res.redirect('/child-name')
})

// Ineligible — receive-benefits
router.get('/ineligible-receive-benefits', function (req, res) {
  res.render('ineligible-receive-benefits')
})

// What is your child\'s full name?
router.get('/child-name', function (req, res) {
  res.render('child-name', { errors: null, data: req.session.data })
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || answer.trim() === '') {
    return res.render('child-name', {
      errors: { 'child-name': 'Enter your child\'s full name' },
      data: req.session.data
    })
  }

  res.redirect('/child-date-of-birth')
})

// What is your child\'s date of birth?
router.get('/child-date-of-birth', function (req, res) {
  res.render('child-date-of-birth', { errors: null, data: req.session.data })
})

router.post('/child-date-of-birth', function (req, res) {
  const answer = req.session.data['child-date-of-birth']
  if (!answer || answer.trim() === '') {
    return res.render('child-date-of-birth', {
      errors: { 'child-date-of-birth': 'Enter your child\'s date of birth' },
      data: req.session.data
    })
  }

  res.redirect('/school-name')
})

// What is the name of your child\'s school?
router.get('/school-name', function (req, res) {
  res.render('school-name', { errors: null, data: req.session.data })
})

router.post('/school-name', function (req, res) {
  const answer = req.session.data['school-name']
  if (!answer || answer.trim() === '') {
    return res.render('school-name', {
      errors: { 'school-name': 'Enter your child\'s school name' },
      data: req.session.data
    })
  }

  res.redirect('/national-insurance-number')
})

// What is your National Insurance number?
router.get('/national-insurance-number', function (req, res) {
  res.render('national-insurance-number', { errors: null, data: req.session.data })
})

router.post('/national-insurance-number', function (req, res) {
  const answer = req.session.data['national-insurance-number']
  if (!answer || answer.trim() === '') {
    return res.render('national-insurance-number', {
      errors: { 'national-insurance-number': 'Enter your National Insurance number' },
      data: req.session.data
    })
  }

  res.redirect('/check-answers')
})

// Check answers
router.get('/check-answers', function (req, res) {
  res.render('check-answers', { data: req.session.data })
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

// Confirmation
router.get('/confirmation', function (req, res) {
  res.render('confirmation', { data: req.session.data })
})

module.exports = router
