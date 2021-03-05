'use strict';

// Form validation code

function requiredEmpty(element){
	if (element.dataset.hasOwnProperty('required') && element.value==""){
		return true
	} 
	else {
		return false
	};
};

function validator(element){
	let str = element.value;
	if (element.dataset.hasOwnProperty('validator') && str !=""){
		let regexp;
		let validator = element.dataset.validator;
		
		if (validator === 'letters'){
			regexp = /^[a-zа-я]+$/i;
			return regexp.test(str)
		}
		
		if (validator === 'number'){
			regexp = /^[-0-9]+$/i;
			let valMinOk = (element.dataset.validatorMin === undefined) || 
							(parseInt(str,10) >= parseInt(element.dataset.validatorMin,10));
			let valMaxOk = (element.dataset.validatorMax === undefined) ||
							(parseInt(str,10) <= parseInt(element.dataset.validatorMax,10));
			return (regexp.test(str) 
					&& (valMinOk ) 
					&& (valMaxOk))
		}
		
		if (validator === 'regexp'){
			regexp = new RegExp(element.dataset.validatorPattern);
			return regexp.test(str)
		}

	} 
	else {
		return true
	} 
};


function validateForm(f){
	let form = document.getElementById(f.formId);
	
	form.addEventListener('submit', function(event) {
		 event.preventDefault();

		 let colInput = document.querySelectorAll('input');
		 for (var i = 0, len = colInput.length; i < len; i++) {
				var elem = colInput[i];
				if (requiredEmpty(elem) || !validator(elem)) {
					elem.classList.add(f.inputErrorClass);
				} else {
					elem.classList.remove(f.inputErrorClass);
				}
			};
		let elemEr = document.querySelector('.'+f.inputErrorClass);
		if (elemEr != null) {
			form.classList.remove(f.formValidClass);
			form.classList.add(f.formInvalidClass);
		} else {
			form.classList.remove(f.formInvalidClass);
			form.classList.add(f.formValidClass);
		}
	});
	
	form.addEventListener("focus", function( event ) {
 		 if (event.target.tagName === 'INPUT') {
	  			var element = event.target;
	  			element.classList.remove(f.inputErrorClass);
	  				
	  			
	  		};
	}, true);

	form.addEventListener("blur", function( event ) {
	  		if (event.target.tagName === 'INPUT') {
	  			var element = event.target;
	  			if (requiredEmpty(element) || !validator(element)) {
	  				element.classList.add(f.inputErrorClass)
	  			};
				
	  			
	  		};
		
			
	}, true);
};



