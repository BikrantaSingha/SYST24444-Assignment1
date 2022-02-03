$(document).ready(() => {

	//constants
	const numberWalls = 4; // number of walls to be painted per room 
	const paintCanCoverage = 400; // each paint can cover 400sq ft rounded up
	const taxRate = 1.13; //13% HST 
	const standardPrice = 24.99;
	const premiumPrice = 39.99;
	const significantDigits = 2; // will be used to round up the final quote


	$("#main-form").submit(() => {
		save();
		displayQuote();

	});

	$("#main-form-save").click(() => {
		save();
	});

	//Helper functions

	//save to local storage feature
	let save = () => {
		if (localStorage) {
			localStorage.setItem("customerName", document.getElementById("customer-name").value);
			localStorage.setItem("customerEmail", document.getElementById("customer-email").value);
			localStorage.setItem("roomType", document.getElementById("room-type").value);
			localStorage.setItem("roomWidth", document.getElementById("room-width").value);
			localStorage.setItem("roomLength", document.getElementById("room-length").value);
			localStorage.setItem("roomColor", document.getElementById("room-color").value);
			localStorage.setItem("paintType", document.getElementById("paint-type").value);
		}
		else alert("Error! localStorage is not available.");
	};

	//square footage
	//length times width times 4
	let squareFootage = () => {
		return Number.parseFloat(localStorage.roomWidth) * Number.parseFloat(localStorage.roomLength) * numberWalls;
	};

	//number of cans required to paint, rounded up
	//each can covers 400sq ft
	let cansNumber = () => {
		//rounding up
		return Math.ceil(squareFootage() / paintCanCoverage);
	};

	//calculates the final quote inclucing 13% HST
	let calculateQuote = () => {
		if(localStorage.paintType == "standard") {
			return (cansNumber() * standardPrice * taxRate).toFixed(significantDigits);
		} else {
			return (cansNumber() * premiumPrice * taxRate).toFixed(significantDigits);
		}
	};


	//display quotation page info
	let displayQuote = () => {
		$("#content").html(
			'<div class="content">' + 
			'<h3>Quotation Page</h3>' + 
			'<p id="quote-customer-info"> For ' + localStorage.customerName + 
			' with email: ' + localStorage.customerEmail + '</p>' +
			'<p id="quote-room">' + localStorage.roomType + '</p>' +
			'<p id="square-footage">' + squareFootage() + 'sq. ft</p>' + 
			'<div id="color-box '+ localStorage.roomColor+'">' + localStorage.roomColor+'</div>' +
			'<p id="quote-cans">Total number of paint cans: '+ cansNumber() +'</p>' +
			'<p id="quote-final-price">Final quote price(including 13% HST): $' + calculateQuote() + '</p>' +
			'</div>'

			);

	};


})