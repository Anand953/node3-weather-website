

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'From JavaScript'

//Challenge59:
//
//1. Select the second message p from javascript
//2. Just before fetch, render loading message and empty p 
//3. If error, render error
//4. If no error, render location and forecast
//5. Test your work! Search for errors and for valid locations

weatherForm.addEventListener('submit',(e) => {
        e.preventDefault()  
 
 const location = search.value

 messageOne.textContent = 'Loading...'
 messageTwo.textContent = ''
 
 fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)  =>{
           if(data.error){
        //    console.log(data.error)
  //instead of printing in console we print on browser
  messageOne.textContent = data.error      
           }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                //  console.log(data.location)
                // console.log(data.forecast)
                              
                              
           }
        })
})

})
               
   
    
    

       
    
       