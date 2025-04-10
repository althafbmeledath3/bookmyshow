

console.log("Hello")


async function validate(event) {

    event.preventDefault()

    try{

        let name = document.getElementById('username').value
        let password = document.getElementById('password').value
        let inp_data = {name,password}

        let options = {
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(inp_data)
        }

        const response = await fetch('/api/getUsers',options)
        
        const data = await response.json()
        
        
        if(response.status==200){
            alert("Logged In Success")
            let logged_in = true

            localStorage.setItem("loggedIn",true)
            localStorage.setItem('username',name)
            window.location.href = "/"
        }

        else{
            alert(data.message)
        }

       
    }
    catch(err){
        console.log(err)
        alert(data.error)
    }
    
}
