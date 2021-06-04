const inputlogin = document.querySelector('form')
const input1 = document.querySelector('#username')
const input2 = document.querySelector('#email')
const input3 = document.querySelector('#password')
inputlogin.addEventListener('submit', (e) => {
  const username = input1.value
  const email = input2.value
  const password = input3.value
  console.log(username)
  console.log(email)
  console.log(password)
  console.log(JSON.stringify({
    username: username,
    email: email,
    password: password,
}))
  e.preventDefault()
  
  fetch('/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          name: username,
          email: email,
          password: password,
      })
    }).then((response) => {
      console.log(response)
      if(!response.ok){
        alert('Invalid Credentials')
    }
    else{
      location.href = "/dashboard"
    }
      // location.href = "/tasks"
    }).then((data) => {
          console.log(data)
          // location.href = "/dashboard"
          // fetch('/test').then(() => {
          //     document.querySelector('#m2').innerHTML = '<h1>Hello</h1>'
          // })
          // location.href = "/test"
          // document.querySelector('#m2').innerHTML = '<h1>Hello</h1>'
          
      }).catch((err) => {
          console.log(err)
          console.log('Error Occured')
      })
  })

  
