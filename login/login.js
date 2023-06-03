var name=document.getElementById('name')
//var error = document.getElementById('error')
async function save(event)
{
    event.preventDefault()
    var email = event.target.email.value
    var pass = event.target.password.value
    var object={
        email,
        pass
    }
    if(!email || !pass){
      error.innerHTML="Fields cannot be empty"
      return;
      }
    //console.log(object)
    try {
        const response = await axios.post('http://localhost:3000/login', object);
        console.log(response);
    
      alert(response.data.message)
       window.location.href='../../expenses/expense.html'
      }
    catch(err){
      alert( err.response.data);
    }
}
