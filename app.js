const billInput = document.getElementById("bill-input");
const billSharers = document.getElementById("number-of-customers");
const select = document.getElementById("select");
const calcBtn = document.getElementById("calc-tip");
const tipResult = document.getElementById("Tip-amount");
const billResult = document.getElementById("Total-amount");
const PricePerPerson = document.getElementById("price-per-person");
const resultDom = document.querySelector(".resultDom") 

//Adding the select options 
const selectOptions = [
				{
								value: 1,
								title : "2% - FAIR"
				}, 
				{
								value : 2, 
								title : "5% - GOOD"
				}, 
				{
								value : 3, 
								title : "10% - GOOD"
				}
]
selectOptions.forEach(function (option) {
				const Option = document.createElement("option");
				Option.textContent = option.title ;
				Option.value = option.value
				select.appendChild(Option)
})
const validateInput = function(billAmount, numUsers, selectedService){
    
   let isFeedback = false;
   const feedback = document.querySelector('.feedback');
    feedback.innerHTML = '';

     if  (Bill === "" || Bill <="0"){
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += `<p>Bill amount cannot be blank</p>`
        isFeedback = true;
    }
    
    if (NoOfBillSharer <= "0"){
      feedback.classList.add('showItem', 'alert-danger');
      feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
       isFeedback = true;
    } 
    
   if (selectedOption === "0"){
     feedback.classList.add('showItem', 'alert-danger');
     feedback.innerHTML += `<p>You must select a Service</p>`
      isFeedback = true;
   }
    
    setTimeout(function(){
      feedback.classList.remove('showItem', 'alert-danger');
    }, 10000);
    
    return isFeedback;
      
  }; // end validateInput

// getting iputValue from Dom
let Bill = billInput.value;
let NoOfBillSharer = Number(billSharers.value);
let selectedOption = select.value;

// calculation function 
function calcTip(Bill, NoOfBillSharer, selectedOption) {
				let tipPercent = "";
				Bill = billInput.value;
				NoOfBillSharer = Number(billSharers.value);
				selectedOption = select.value;
				if(selectedOption == 1) {
								tipPercent = 0.02
				}
				else if(selectedOption == 2){
								tipPercent = 0.05
				}
				else if(selectedOption == 3){
								tipPercent = 0.1
				}
				else{
								tipPercent = 0
				}
				
				const tipAmount = Number(tipPercent) * Number(Bill)
				const totalAmount = Number(Bill) + Number(tipAmount);
				const billper =  Number(totalAmount) / Number(NoOfBillSharer)
				return [tipAmount, totalAmount, billper]

}


calcBtn.addEventListener("click",function () {
				Bill = billInput.value;
				NoOfBillSharer = Number(billSharers.value);
				selectedOption = select.value;
				const isFeedback = validateInput(Bill, NoOfBillSharer, selectedOption)
    
				if(!isFeedback) {
								const results = calcTip(Bill, NoOfBillSharer, selectedOption)
				tipResult.textContent = `Tip Amount :$${results[0].toFixed(2)}`
				billResult.textContent = `Total Amount :$${results[1].toFixed(2)}`
				PricePerPerson.textContent = `Each Person Pays : $${results[2].toFixed(2)}`
				resultDom.classList.remove('resultDom')
				 
				}
				setTimeout(function(){
        billInput.value=""
				billSharers.value= ""
				select.value = "0"
        resultDom.classList.add('resultDom');
      }, 10000)

				})
