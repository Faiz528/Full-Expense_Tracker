let myform=document.getElementById("extra")
    const expense1 = document.getElementById('inputdefault-e')
    const purpose1 = document.getElementById('inputdefault-p')
    const category1 = document.getElementById('category')
    const update = document.getElementById('update')
    //const urlParams = new URLSearchParams(window.location.search);
  
    const id = localStorage.getItem('id');
    

myform.addEventListener('submit',save)
async function save(event){
    event.preventDefault();

    console.log(id)
  var expense=event.target.expense.value
  var purpose=event.target.purpose.value
  var category=event.target.category.value
    
   let my ={
        expense,
        purpose,
        category,
        id
    }
    console.log(my)
try{
  
  const response =await axios.post(`http://localhost:3000/add`,my)

    onscreen(response.data)
    console.log(response)
    expense1.value=""
    purpose1.value=''
  
}
catch(err){
    console.log(err)
}
}


window.document.addEventListener("DOMContentLoaded",async ()=>{
    try{
      const tokens = localStorage.getItem('token')
      console.log(tokens)
 const response =  await axios.get("http://localhost:3000/add",{headers:{'Authorisation':tokens}});
 console.log(response)
  for(var i =0;i<response.data.length ; i++)
        onscreen(response.data[i])

    }
    catch(error){
        console.log(error)
    }
 
})

async function onscreen(user)
{

  try{ 
    const childHTML = ` 
    <li id=${ user.id}> 
      Amount: ${user.Expenses}<br> 
      Purpose: ${ user.Purpose}<br>
      Category :${ user.Category}
      <button onclick="remove('${ user.id}')">DELETE</button></form> 
      <button onclick="edit('${ user.id}')">EDIT</button>
    </li> 
  ` 
  userList.innerHTML += childHTML 
  } catch (err) { 
    console.log(err) 
  }
}

async function remove(userId)
{
    try{
     await axios.delete(`http://localhost:3000/delete/${userId}`)
     userList.remove(userId)
     window.location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function edit(userId)
{
  try{
    console.log(userId)
    userList.remove(userId)
      const response =await axios.get(`http://localhost:3000/edit/${userId}`)
      console.log(response)
      
  
   expense1.value= response.data.Expenses
   purpose1.value= response.data.Purpose
   category1.value= response.data.Category
   
   let updated
    update.addEventListener("click",async()=>{
       updated={
        expense:expense1.value,
        purpose:purpose1.value,
        category:category1.value

    }
    console.log(updated)
    const result = await axios.post(`http://localhost:3000/edits/${userId}`,updated)
    console.log(result)
    window.location.reload()
    })
  
   // const result = await axios.post(`http://localhost:3000/edits/${userId}`,updated)
       
  
       /*let updated={
        expense:result.expenses,
        purpose:result.purpose.value,
        category:result.category.value

    }*/
       
   }
   
    
   catch(err){
    console.log(err)
 }
 
}
  
