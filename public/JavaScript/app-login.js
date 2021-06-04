const inputlogin = document.querySelector('form')
const input2 = document.querySelector('#email')
const input3 = document.querySelector('#password')
inputlogin.addEventListener('submit', (e) => {
    e.preventDefault()
  console.log('anubhav')
  const email = input2.value
  const password = input3.value
  
  fetch('/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          email: email,
          password: password
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
        //   if(password){
        //       location.href = "/dashboard"
        //   }
          // fetch('/test').then(() => {
          //     document.querySelector('#m2').innerHTML = '<h1>Hello</h1>'
          // })
          // location.href = "/test"
          // document.querySelector('#m2').innerHTML = '<h1>Hello</h1>'
          
      }).catch((err) => {
          console.log(err)
      })
  })
