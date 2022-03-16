
"use strict";
 function arrow(){
    var btn =document.createElement('button');
    let body =document.body;
    let txt= document.createTextNode('^');
    btn.appendChild(txt);
    btn.classList.add('puton');
    body.appendChild(btn);
    window.onscroll=function(){
      if(scrollY>=400){
          btn.style.display='block';
      }
      else{
       btn.style.display='none';
      }
    }
    btn.onclick = function(){
       scroll({
           top:0,
           behavior:"smooth"
        
       })
   }
 }    

let title = document.getElementById('title');
let price = document.getElementById('price');
let recharge = document.getElementById('recharge');
let payment = document.getElementById('payment');
let discount = document.getElementById('discount');
let btnPrice = document.getElementById('btn-price');
let count = document.getElementById('count');
let catogray = document.getElementById('catogray');
let create = document.getElementById('create');
let search = document.getElementById('search');
let searchTitle= document.getElementById('search-title');
let searchCatogray = document.getElementById('search-catogray');
let delet = document.getElementById('deleteAll');
let mode ='create';
let tem;


function clacPrice(){

     let loP =+price.value;
      let loR=+recharge.value;
      let loD=+discount.value;
     let loM=+payment.value;
  
     localStorage.loR=JSON.stringify(loP);
     localStorage.loD=JSON.stringify(loR);
     localStorage.loM=JSON.stringify(loD);
     localStorage.loP=JSON.stringify(loM);

    let result=(parseInt(loP) + parseInt(loR)
     - parseInt(loD) + parseInt(loM)) ;
     btnPrice.textContent='Total:' +result
     if(loP <= 0 || +result<=0){
        btnPrice.style.background='#ff001c'
    }
    else{
        btnPrice.style.background='#040'
    }
}

clacPrice()

// Create data product

var allProduct=[];
if(localStorage.main !=null ){
    allProduct=(JSON.parse(localStorage.main));
}
else{
    allProduct=[];
}
deleteAll()

create.addEventListener('click',function(){
    let newProduct ={
        titleName:title.value.toLowerCase(),
        priceType:price.value,
        taxes:recharge.value,
        ads:payment.value,
        discount:discount.value,
        catogray:catogray.value.toLowerCase(),
        total:btnPrice.innerHTML,
        count:count.value
    
    }
    
      if(mode==='create'){
        if(newProduct.titleName !='' && newProduct.priceType !=""){
            if(newProduct.count > 1){
                for(let j=0 ;j< newProduct.count ; j++){
                    allProduct.push(newProduct);
                }
            }
            else{
                allProduct.push(newProduct);
            }
        }
    
      }
      else{
          allProduct[tem]=newProduct;
          create.value="create";
          count.style.display="block";
          mode='create'
      }
 
    localStorage.main=JSON.stringify(allProduct);
    deleteAll()
    clearData()
    showItem()
    
})
   function clearData(){
    price.value='';
    title.value='';
    recharge.value='';
    discount.value='';
    payment.value='';
    btnPrice.innerHTML='Total:0';
    btnPrice.style.background='#ff001c'
    count.value='';
    catogray.value=''
  
   }
  
function showItem(){
    
    let intable = " ";
    for(let i=0 ; i <= allProduct.length; i++){
        intable +=`
        <tr>
            <td>${i+1}</td>
            <td>${allProduct[i].titleName}</td>
            <td>${allProduct[i].priceType}</td>
            <td>${allProduct[i].taxes}</td>
            <td>${allProduct[i].ads}</td>
            <td>${allProduct[i].discount}</td>
            <td>${allProduct[i].catogray}</td>
            <td>${allProduct[i].total}</td>
            <td ><button id="update" onclick="updateItem(${i})">Update</button></td>
            <td><button id="remove" onclick='removeItem(${i})' >Remove</button></td>
        </tr>
        `
        document.getElementById('newline').innerHTML= intable;
    }
}
function deleteAll(){
    delet.value=`Delete All(${allProduct.length}) `;
    allProduct.length<=0?   delet.style.display='none' :delet.style.display='block';
    delet.addEventListener('click',function(){
        localStorage.clear();
        allProduct.splice(0);
        location.reload()
    })
    
}

//  Remove Product  from  list
function updateItem(i){
    title.value=allProduct[i].titleName;
    price.value=allProduct[i].priceType;
    payment.value=allProduct[i].ads;
    recharge.value=allProduct[i].taxes;
    btnPrice.innerHTML=allProduct[i].total;
    btnPrice.style.background='#040';
    catogray.value=allProduct[i].catogray;
    count.style.display="none";
    create.value="Update";
    tem=i;
    mode='update';
    scroll({
        top:0,
        behavior:'smooth'
        
    })
}
             //Search for Items
let searchMode='title';
function searchItem(id){
    search.focus();
    if(id==='search-title'){
        searchMode='title';
        search.placeholder='Search By Title';
    }
    else{
        searchMode='catogry';
        search.placeholder='Search By Catogray';
    }
}

function searchData(value){
        if(searchMode=='title'){
            let intable ='';
            for(let s=0 ;s<=allProduct.length ;s++){

                if(allProduct[s].titleName.includes(value.toLowerCase())){
                    intable +=`
                    <tr>
                        <td>${s+1}</td>
                        <td>${allProduct[s].titleName}</td>
                        <td>${allProduct[s].priceType}</td>
                        <td>${allProduct[s].taxes}</td>
                        <td>${allProduct[s].ads}</td>
                        <td>${allProduct[s].discount}</td>
                        <td>${allProduct[s].catogray}</td>
                        <td>${allProduct[s].total}</td>
                        <td ><button id="update" onclick="updateItem(${s})">Update</button></td>
                        <td><button id="remove" onclick='removeItem(${s})' >Remove</button></td>
                    </tr>
                    `
                    document.getElementById('newline').innerHTML= intable;
                }
            }
        }else{
            searchMode=='catogry'
            let intable ='';
            for(let s=0 ;s<=allProduct.length ;s++){

                if(allProduct[s].catogray.includes(value.toLowerCase())){
                    intable +=`
                    <tr>
                        <td>${s+1}</td>
                        <td>${allProduct[s].titleName}</td>
                        <td>${allProduct[s].priceType}</td>
                        <td>${allProduct[s].taxes}</td>
                        <td>${allProduct[s].ads}</td>
                        <td>${allProduct[s].discount}</td>
                        <td>${allProduct[s].catogray}</td>
                        <td>${allProduct[s].total}</td>
                        <td ><button id="update" onclick="updateItem(${s})">Update</button></td>
                        <td><button id="remove" onclick='removeItem(${s})' >Remove</button></td>
                    </tr>
                    `
                    document.getElementById('newline').innerHTML= intable;
                }
            }
        }
       
}
function removeItem(i){

    allProduct.splice(i , 1 );
    localStorage.main=JSON.stringify(allProduct);
    if(allProduct.length<=0){location.reload();}
    deleteAll()
    showItem()
}
arrow()
showItem()
