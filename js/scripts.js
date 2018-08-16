// https://source.unsplash.com/featured/?nature

let input = document.querySelector('input');
let form = document.querySelector('form');
let main = document.querySelector('main');
let articles = document.querySelector('.articles');
let photos = document.querySelector('.photos');
let searchResults = document.querySelector('.searchResults');

	// listen for submit on search box
	document.querySelector('form').addEventListener('submit', function(e){
		e.preventDefault();
		// store search term in a variable...
		let searchTerm = input.value;
		// then clear the input
		input.value = "";
		input.placeholder = "Enter a search word";

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
		}).then(response => response.json()) //parse to JSON
		.then(function(data){

			// if we get results back then...
			if(data.results[0]){
				// store the length of the result
				let resultLength = data.results.length;
				// choose a random photo for the background
				let randomP = Math.floor(Math.random()*resultLength)
				let photo = data.results[randomP].urls.regular;
				// change body background to the photo that is found
				document.querySelector('body').style.backgroundImage = `url(${photo})`;

				// store results of the fetch
				let photoArray = data.results;
				//make sure the photos div is cleared out and reset
				photos.innerHTML = "";
				// if there are more than 6 results, set result length to 6
				if(resultLength > 6){
					resultLength = 6;
				}

				// loop over photo array and add each photo and photo info to the DOM
				for(let i = 0; i < resultLength; i++){
				    photos.innerHTML += `
		              	<div class="image" style="background-image: url(${photoArray[i].urls.small});">

		                <p class="photoInfo"><a href="${photoArray[i].urls.full}" target="_blank">Photo by <a href="${photoArray[i].user.portfolio_url}" target=_blank>${photoArray[i].user.name}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>.
		                </p>
		              	</div>
		              </a>`;
		        // show the photos container
		        photos.classList.remove('hide');
			}
		}
		else {
			photos.innerHTML = `Sorry, we couldn't find any photos related to your search - ${searchTerm}`;
		}
		})
		// handle errors
		.catch(function(e){
			photos.innerHTML = `An error has occured.
								${e}`;
		});

		// get NY Times data
		fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=f72da244c8a440b3b4cb2958e3176f2c`)
		.then(response => response.json()) //parse the JSON again
		.then(data => {

			if(data.response.docs[0]){
				// then handle the response
				let articleArray = data.response.docs;
				// reset the articles container
				articles.innerHTML = "";

				// check article length and set to 6 if greater than 6
				let artLength = articleArray.length;
				if(artLength > 6){
					artLength = 6;
				}

				// loop over the article array and add the articles to the article container
				for(let i = 0; i < artLength; i++){
			    articles.innerHTML += `
	              <article>
	                <h2><a href="${articleArray[i].web_url}" target="_blank">${articleArray[i].headline.main}</a></h2>
	                <p>${articleArray[i].snippet}</p>
	              </article>`;

	            // show the article container
	            articles.classList.remove('hide');
	        	}
        	}
        	else {
			articles.innerHTML = `Sorry, we couldn't find any articles related to your search - ${searchTerm}`;
        	}
		})
		// handle errors
		.catch(function(e){
			articles.innerHTML = `An error has occured.
								${e}`;

		});
	});






