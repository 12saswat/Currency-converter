const baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns=document.querySelectorAll(".dropDown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");


                                    //Logic for selectors
for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;

                                       //Logic for selctor for display the USD To INR
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="Selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected="Selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
                                     //Logic for chnage in the img of selector
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}
btn.addEventListener("click" , async(evt)=>{
 evt.preventDefault();
 let amount=document.querySelector(".amount input")
 let amtVal=amount.value;
 
 if(amtVal===" " || amtVal < 1){
    amtVal=1;
    amount.value="1";
 }

 const Url=`${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
 let response=await fetch(Url);
 let data= await response.json();
 let rate=data[toCurr.value.toLowerCase()];
 console.log(rate)
 let finalAmt=amtVal*rate;
 msg.innerText=`${amtVal}${fromCurr.value} = ${finalAmt} ${toCurr.value}`

})
