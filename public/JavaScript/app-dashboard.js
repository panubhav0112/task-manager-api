var i = 0
gettasks(i)
var flag = 1
document.querySelector('#next-btn').addEventListener('click', (e) => {
    // console.log(i)
    if (flag) {
        i = i + 3
        gettasks(i)
    }


})
document.querySelector('#prev-btn').addEventListener('click', (e) => {
    if (i >= 2) {
        i = i - 3
        gettasks(i)
    }
})
console.log(document.getElementById("myDropdown"))
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    // console.log("djisjdl")
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
function gettasks(i){
    fetch('/tasks?sortBy=createdAt:desc&limit=3&skip=' + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }

    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        var task_done = "<span style='color:green'>Completed</span>"
        var task_undone = "<span style='color:#ff0000'>Pending ...</span>"
        var num = i + 1;
        const name = data[0].username
        delete data[0]
        console.log(data)
        var task_list="1";
        if(data.length === 1) {
            flag=0;
            task_list = `No more task`
            document.querySelector('#next-btn').style = 'display:none'
        }
        else {
            document.querySelector('#next-btn').style = 'display:flex'
            flag =1;
        }
        if(flag){
            task_list = data.map(task=>{
            var id = task._id;
            return `<div class="data_cont"><p><psan class="bullets">${num++}.</psan> <b> Task :  ${task.description}</b></p><br>  <button class="btn" id="${id}" onclick=Delete(id)><i class="fa fa-trash-o" style="font-size:30px"></i></button>
            <div class="marks"><p>Status :  <b>${(task.completed) === true ? task_done : task_undone}</b></p><button class="submit31" id="${'1' + id}" onclick=update(id)>Mark as Pending</button>
                                                                  <button class="submit32" id="${'2' + id}" onclick=update(id)>Mark as Completed</button>
                                                                 
                                                                  </div> <br>
          <div class="CreatedTime">Created At : ${task.createdAt.substring(0,10)}</div> 
          <br>
          Updated At : ${task.updatedAt.substring(0,10)}
          </div>`
        }).join('')
        }
        
        document.querySelector('#message-1').innerHTML = task_list
        // document.querySelector('#message-2').innerHTML = task_status
        document.querySelector('#username_wel').innerHTML = `Hi! Welcome ${name}`
        console.log(`${name}`)
    })
}
const inputlogin = document.querySelector('form')
inputlogin.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputadd = document.querySelector('#addtask').value
    var task_status_check = false
    console.log(document.querySelector('#accept').value)
    if(document.querySelector('#accept:checked') !== null){
        console.log('Anubahv')
        task_status_check = true
    }
    // console.log(inputadd)
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            description: inputadd,
            completed: task_status_check
        })
      }).then((response) => {
        console.log(response)
        location.href = "/dashboard"

      }).then((data) => {
            console.log(data)
            // fetch('/test').then(() => {
            //     document.querySelector('#m2').innerHTML = '<h1>Hello</h1>'
            // })
            // location.href = "/test"
            // document.querySelector('#m2').innerHTML = '<h1>Hello</h1>'
            
        }).catch((err) => {
            console.log(err)
    })
})
document.querySelector('.my_add').addEventListener('click', (e) => {
    // console.log(document.getElementById('taskadder'))
    document.getElementById('taskadder').style = 'display:flex'
})
document.querySelector('.cross_button').addEventListener('click', (e) => {
    // console.log("clicked")
    document.getElementById('taskadder').style.cssText = 'display:none;'
})
document.querySelector('#loggingout').addEventListener('click', (e)=>{
    LogOut()
})
// console.log('Anubhav')
function update(id) {
    const w = id[0]
    // console.log(w)
    id = id.slice(1);
    // console.log(id)
    completed = (w === '1') ? "false" : "true"
    console.log(completed)
    fetch('/tasks/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // 'token': document.cookie.replace("token=", "")
        },
        body: JSON.stringify({
            completed: completed
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        gettasks(i)
    })
}
function Delete(id) {
    // console.log(id)
    fetch('/tasks/' + id, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).then((data) => {
        gettasks(i)
    })
}
function LogOut() {
    fetch('/users/logout', {
        method: 'POST'
    }).then((response)=>{
        console.log('hfdfkf')
        location.href="/"
        // response.clearCookie('');
    }).catch((e)=>{
        console.log(e)
    })
}