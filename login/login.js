var name=document.getElementById('name')
async function save(event)
{
    event.preventDefault()
    var email = event.target.email.value
    var pass = event.target.password.value
    var object={
        email,
        pass
    }
    //console.log(object)
    try {
        const response = await axios.post('http://localhost:3000/login', object);
        console.log(response.data);
    
        if (response.data === null) {
          alert("User not found");
        } else if (response.data === "Password does not match") {
          alert("Password does not match");
        } else {
          alert("Logged In Successfully");
        }
      }
    catch(err){
       
    }
}