

console.log("Hello from login")


async function logIn(event) {

    event.preventDefault()

    try{

        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let inp_data = {email,password}

        let options = {
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(inp_data)
        }

        const response = await fetch('/api/logIn',options)
        
        const data = await response.json()
        
        
        if(response.status==200){
           
            localStorage.setItem("username",email)
            console.log(data.message)
            alert(data.message)
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
