// https://source.unsplash.com/featured/?nature

let input = document.querySelector('input');
let form = document.querySelector('form');
let main = document.querySelector('main');
let articles = document.querySelector('.articles');
let photos = document.querySelector('.photos');

	// listen for submit on search box
	document.querySelector('form').addEventListener('submit', function(e){
		e.preventDefault();
		// store search term in a variable...
		let searchTerm = input.value;
		// then clear the input
		input.value = "";
		input.placeholder = "Enter a search word";
		console.log(searchTerm);
		// if the search box has not been moved yet - move it!
		if(form.classList.contains('moveSearch') === false){

			// add the hide class to the form to fade it out
			form.classList.add('hide');

			// set a timeout so after the form is faded...
			setTimeout(function(){
				// remove the br so everything is on the same line
				document.querySelector('form br').style.display = 'none';
				// move the search bar using css class
				form.classList.add('moveSearch');
				// fade back in
				form.classList.remove('hide');
			}, 900);
		}

		// get unsplash data
		fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}`, {
			headers: {
				Authorization: 'Client-ID ebd7b27890c95f5ee57040f993c2f85d53a9ba7a53c72743300d780250b16bf1'
			}
		}).then(response => response.json())
		.then(function(data){

			// if we get results back then...
			if(data.results[0]){
				let randomP = Math.floor(Math.random()*data.results.length)
				let photo = data.results[randomP].urls.regular;
				let pName = data.results[randomP].user.name;
				let pPortfolio = data.results[randomP].user.portfolio_url;
				// change body background to the photo that is found
				document.querySelector('body').style.backgroundImage = `url(${photo})`;

				let photoArray = data.results;
					photos.innerHTML = "";
				for(let i = 0; i < 6; i++){
				    photos.innerHTML += `
		              	<div class="image" style="background-image: url(${photoArray[i].urls.small});">

		                <p class="photoInfo"><a href="${photoArray[i].urls.full}" target="_blank">Photo by <a href="${photoArray[i].user.portfolio_url}" target=_blank>${photoArray[i].user.name}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>.
		                </p>

		              	</div>
		              </a>`;

		        photos.classList.remove('hide');
			}
		}
		else {
			console.log("Sorry we couldn't find a photo");
		}
		})
		.catch(function(e){
			console.log(e);
		});

		// get NY Times data
		fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=f72da244c8a440b3b4cb2958e3176f2c`)
		.then(response => response.json())
		.then(data => {
			let articleArray = data.response.docs;
			articles.innerHTML = "";
			for(let i = 0; i < 6; i++){
		    articles.innerHTML += `
              <article>
                <h2><a href="${articleArray[i].web_url}" target="_blank">${articleArray[i].headline.main}</a></h2>
                <p>${articleArray[i].snippet}</p>
              </article>`;

            articles.classList.remove('hide');
        }

		})
		.catch(error => console.log(error));
	});






