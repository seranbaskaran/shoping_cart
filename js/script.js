
let data=[
	{
		id: 1,img:"images/shoe-01.jpg",productName: "Adidas",price: 800,category: "shoue"
	},
	{
		id: 2,img:"images/shoe-02.jpg",productName: "puma",price: 700,category: "shoue"
	},
	{
		id: 3,img:"images/shoe-03.jpg",productName: "ree-book",price: 500,category: "shoue"
	},
	{
		id: 4,img:"images/shoe-04.jpg",productName: "campus",price: 600,category: "shoue"
	},
	{
		id: 5,img:"images/shoe-05.jpg",productName: "woodland",price: 400,category: "shoue"
	},
	{
		id: 6,img:"images/shoe-06.jpg",productName: "Nike",price: 550,category: "shoue"
	},
	{
		id: 7,img:"images/shoe-07.jpg",productName: "Liberty",price: 950,category: "shoue"
	},
	{
		id: 8,img:"images/shoe-08.jpg",productName: "sparx",price: 450,category: "shoue"
	},
	{
		id: 9,img:"images/shoe-09.jpg",productName: "Bata",price: 450,category: "shoue"
	}
	
];
var totals=0;
var foodContainer = document.getElementById("product-container");

for(i=0;i<data.length;i++){
	foodContainer.innerHTML += `<div class="card m-2 position-relative" data-item="${data[i].category}">
								<div class="img-container">	
									<img class="cart-img" src="${data[i].img}" alt="shoe images">
								</div>	
									<div class="card-body">
										<h4 class="card-title">${data[i].productName}</h4>
										<p class="price">${data[i].price}</p>
									</div>
									<button class="cart-add-icon">add</button>
								</div>`
};

var btnCart =document.querySelector(".icofont-shopping-cart");
var Cart =document.querySelector(".card-items");
var btnClose =document.querySelector("#close-btn");
let cnt, prCnt;

btnCart.addEventListener("click", function(){
	Cart.classList.add("card-active")
});

btnClose.addEventListener("click", function(){
	Cart.classList.remove("card-active")
});

// add to cart
var addCart = document.querySelectorAll(".cart-add-icon");
addCart.forEach((btn)=>{
	btn.addEventListener('click', addCard);
})

var cartCount = document.querySelector(".cart-number");
let itemList =[],newProduct;
 
function addCard(){
	let food = this.parentNode;
	let title = food.querySelector(".card-title").innerText;
	let price = food.querySelector(".price").innerText;
	let imgSrc = food.querySelector(".cart-img").src;
	
	// check product already in cart
	
	newProduct = {title, price, imgSrc};

	
	if(itemList.find((el)=>el.title== newProduct.title)){
		alert("product allredy added in cart");
		return;
	}else{
		itemList.push(newProduct);
	}
	cartCount.textContent = itemList.length;
	
	createCartProudct(title, price, imgSrc);
	 
}
var cartBasket = document.querySelector(".card-items-container");

function createCartProudct(title, price, imgSrc){
	cartBasket.innerHTML += `
	<div class="card-box d-flex flex-wrap mb-1">
		<div class="card-img-box">
			<img class="card-img" src="${imgSrc}" alt="shoe img">
		</div>
		<div class="pro-dtl p-2">
			<h5 class="product-title mb-2 text-center">${title}</h5>
			<div class="quantity-box d-flex mt-3 justify-content-between">
				<button class="decr" data-target="decr">-</button>
				<span class="counter">1</span>
				<button class="incr" data-target="incr">+</button>
			</div>
		</div>
		<div class="price-box">
			<p class="card-price my-3 inline-block text-center">${price}</p>
			<p class="total-amt text-center">${price}</p>
		</div>
		<i class="icofont-ui-delete delete-icon"></i>
	</div>`;
	var counter = document.querySelectorAll(".counter");
	var decrementBtn = document.querySelectorAll(".decr");
	var incrementBtn = document.querySelectorAll(".incr");
	
	for(let i = 0; i < incrementBtn.length; i++){ 
		incrementBtn[i].addEventListener("click",quantity)
	}
	for(let i = 0; i < decrementBtn.length; i++){ 
		decrementBtn[i].addEventListener("click", quantity)
	}
	totals+=price
	console.log(price)
	
	var btnremove = document.querySelectorAll(".delete-icon");
		btnremove.forEach((btn)=>{
			btn.addEventListener("click", removeItem);
		});
	
}

//delete cartlist
function removeItem(){
	if(confirm("are you sure to remove")){
		let title = this.parentElement.parentElement.querySelector(".product-title").innerText;
		itemList=itemList.filter((el)=>{
			el.title != title
		});
		this.parentElement.remove();	
	}
}

function quantity(qn){

	let _parentNode, contr, prdTlPrice, prdInPrice,prTotal,totalAmt,totalPrice=0,cnt=0;
	if(qn.target.dataset.target == "incr"){
	for (let i =0; i<itemList.length;i++){
		
		_parentNode = qn.target.parentNode.parentNode.parentNode;
		contr = _parentNode.getElementsByClassName("counter")[0];
		cnt = parseInt(contr.innerText);
		cnt++;
		contr.innerText = cnt;
		prdTlPrice = _parentNode.getElementsByClassName("total-amt")[0];
		prdInPrice = _parentNode.getElementsByClassName("card-price")[0];
		prCnt = cnt*prdInPrice.innerText.split("₹")[1];
		prdTlPrice.innerText = "₹"+prCnt;
	}
	}
	else if(qn.target.dataset.target == "decr"){
		if(cnt > 1){
			_parentNode = qn.target.parentNode.parentNode.parentNode;
			contr = _parentNode.getElementsByClassName("counter")[0];
			cnt = parseInt(contr.innerText);
			cnt--;
			contr.innerText = cnt;
			prdTlPrice = _parentNode.getElementsByClassName("total-amt")[0];
			prdInPrice = _parentNode.getElementsByClassName("card-price")[0];
			prCnt = prdTlPrice.innerText.split("₹")[1]-prdInPrice.innerText.split("₹")[1];
			prdTlPrice.innerText = "₹"+prCnt;
		}else{
			alert("Quantity should be max of 1");
		}	
	}
}
let buy = document.querySelector(".buy-now");
let done = document.querySelector(".done");

buy.addEventListener("click",function(){
	setTimeout(popUp, 100)
	done.classList.add("active-done");
	done.style.display = "block";
});
