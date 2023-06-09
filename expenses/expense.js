let myform=document.getElementById("extra")
    const expense1 = document.getElementById('inputdefault-e')
    const purpose1 = document.getElementById('inputdefault-p')
    const category1 = document.getElementById('category')
    const update = document.getElementById('update')
    const razorpayBtn = document.getElementById('buy')
    
    const tokens = localStorage.getItem('token')
    const leader = document.getElementById('leader')
    const leaderlist = document.getElementById('leaders')
//let total=0
myform.addEventListener('submit',save)
async function save(event){
    event.preventDefault();

    
  var expense=event.target.expense.value
  var purpose=event.target.purpose.value
  var category=event.target.category.value
    
   let my ={
        expense,
        purpose,
        category
        
    }
    console.log(my)
try{
  
  const response =await axios.post(`http://localhost:3000/add`,my,{headers:{'Authorisation':tokens}})
      
    onscreen(response.data)
   // console.log(total)
    //total = total + parseInt(response.data.Expenses)
 // console.log(total)
    //const sum =  axios.get(`http://localhost:3000/totals/${total}`,{headers:{'Authorisation':tokens,'Total':total}})
  
    expense1.value=""
    purpose1.value=''
    
}

catch(err){
    console.log(err)
}
window.location.reload()
}
leader.addEventListener("click",async(e)=>{
  try{
    console.log("Working")
    const leaderboard =await axios.get('http://localhost:3000/leaderlist')
    console.log(leaderboard)
    for(var i =0; i<leaderboard.data.length;i++)
      {
        const user = leaderboard.data[i].Username
        const total = leaderboard.data[i].Total
        const child =`<li>${user}-${total} </li>`
        leaderlist.innerHTML+= child
      }
  }
  catch(err){
    console.log(err)
  }
})

razorpayBtn.addEventListener("click", async(e) =>{ 
  try{ 
      //if(e.target.classList.contains('membership')){ 
          const response = await axios.get('http://localhost:3000/premium', { headers: {"Authorisation" : tokens }}) 
          // console.log(response.data.order.id) 
          var options = { 
              "key": response.data.key_id, 
              "order_id": response.data.order.id, 
              "handler": async function (response){ 
                  const a =await axios.post("http://localhost:3000/updatetransactionstatus",{ 
                      order_id: options.order_id, 
                      payment_id: response.razorpay_payment_id 
                  }, { headers: {"Authorisation" : tokens }}) 
                  localStorage.setItem('prime',true)
                  alert('You are a premium User') 
                 // razorpayBtn.style.display = "none" 
                 // document.getElementById('message').innerText='Premium User'
                  window.location.reload()
                 // message.innerText='sedrtyguijok'

              } 
          } 
      //}
  } catch (err) { 
      console.log(err) 
  }; 
  const rzp1 = new Razorpay(options); 
  rzp1.open(); 
  e.preventDefault(); 

  rzp1.on('payment.failed', async function (response){ 
      console.log(response); 
      alert("Transaction Failed") 
      await axios.post("http://localhost:4000/purchase/transactionfailstatus", response.error.metadata ,{ headers: {"Authorisation" : tokens }}) 

  }); 
})






window.document.addEventListener("DOMContentLoaded",async ()=>{
    try{
      const tokens = localStorage.getItem('token')
      const prime = localStorage.getItem('prime')
      console.log(tokens)
 const response =  await axios.get("http://localhost:3000/add",{headers:{'Authorisation':tokens}});
 //const premium = await axios.get("http://localhost:3000/premiumuser")
 console.log(response)
 var total=0;
  for(var i =0;i<response.data.length ; i++){
        onscreen(response.data[i])
        total= total +  parseInt(response.data[i].Expenses)
  } 
  const sum =  axios.get(`http://localhost:3000/totals/${total}`,{headers:{'Authorisation':tokens,'Total':total}})
  console.log(sum)
  console.log(total)
        if (prime == 'true') {
          razorpayBtn.style.display = 'none'; // Hide the premium button
          //leader.style.display='contents'
          document.getElementById('message').innerText='Premium User'
          const leaderboard =await axios.get('http://localhost:3000/leaderlist')
          console.log(leaderboard)
          for(var i =0; i<leaderboard.data.length;i++)
            {
              const user = leaderboard.data[i].Username
              const total = leaderboard.data[i].Total
              const child =`<li>${user}-${total} </li>`
              leaderlist.innerHTML+= child
            }
        }
        
        else
        leader.style.display='none'
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
  
