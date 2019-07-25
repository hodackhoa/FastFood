var $=function(id){
	return document.getElementById(id);
};
var buckName,buckPrice,buckAmount,re;
orderFood=function(a,re){
	buckName=a.parentElement.children[0].textContent;
	buckPrice=a.parentElement.children[1].children[0].textContent;
	buckAmount=a.parentElement.children[2].value;
	buckAmount=parseInt(buckAmount);
	if(re>0){
		buckAmount=re+buckAmount;
	}
	displayPrice(a,re);
	testOrder(a,buckAmount);
	sumPrice(0,0);
};
displayPrice=function(a,re){
	var tblPrice=$("table_price");
	var btnCancel=document.createElement("button");
	if(re==0){
		btnCancel.innerHTML="Clear";
		var rowPrice=tblPrice.insertRow(-1);
		var cellName=rowPrice.insertCell(0);
		var cellPrice=rowPrice.insertCell(1);
		var cellAmount=rowPrice.insertCell(2);
		var cellbtn=rowPrice.insertCell(3);
		cellName.innerHTML=buckName;
		cellPrice.innerHTML=buckAmount;
		cellAmount.innerHTML=buckPrice;
		cellbtn.appendChild(btnCancel);	
	}	
	else{
		var countRow=tblPrice.getElementsByTagName("tr");
		for(var i=0;i<countRow.length;i++){
			var searchRow=countRow[i].cells[0].textContent;
			if(searchRow==buckName){countRow[i].cells[1].innerHTML=buckAmount;}
		}
	}
	btnCancel.setAttribute('onclick','clearPrice(this)');
	a.parentElement.children[2].value=1;
};	
testOrder=function(a,buckAmount){
	a.setAttribute('onclick','orderFood(this,buckAmount)');
};
clearPrice=function(u){
	var rowDel=u.parentElement.parentElement;
	var indexRow=rowDel.rowIndex-1;
	var nameFoClr=rowDel.cells[0].textContent;
	//check name food
	var listFood=$("listfood").getElementsByTagName("h5");
	for(var i=0;i<listFood.length;i++){
		if(listFood[i].textContent==nameFoClr){
			var reOrder = listFood[i].parentElement.children[3];
			reOrder.setAttribute('onclick','orderFood(this,0)');
		}
	}
	//
	var rowDel=u.parentElement.parentElement;
	var indexRow=rowDel.rowIndex-1;
	$("table_price").deleteRow(indexRow);
	sumPrice(0,0);
};
sumPrice=function(sumAmount,sumBill){
	var colPrice=$("table_price").getElementsByTagName("tr");
	for(var i=0;i<colPrice.length;i++){
		var subAmount=colPrice[i].cells[1].textContent;
		var subPrice=colPrice[i].cells[2].textContent.split("$")[0];
		subPrice = parseFloat(subPrice);
		subAmount = parseFloat(subAmount);
		sumAmount=subAmount*subPrice;
		sumBill += sumAmount;
	}
	$("sumfood").getElementsByTagName("th")[1].innerHTML=sumBill+"$";
};
window.onload=function(){	
};