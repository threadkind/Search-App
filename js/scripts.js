// https://source.unsplash.com/featured/?nature

let searchTerm = document.querySelector('input');
let form = document.querySelector('form');
let main = document.querySelector('main');



document.querySelector('form').addEventListener('submit', function(e){
	e.preventDefault();
	console.log(searchTerm.value);

	form.classList.add('hide');

	setTimeout(function(){
		document.querySelector('form br').style.display = 'none';
		form.classList.add('moveSearch');
		form.classList.remove('hide');


	}, 900);


});

