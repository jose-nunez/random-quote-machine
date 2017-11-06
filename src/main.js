var bkg_index = 1;

function next_quote(){
	axios.get('https://quotesondesign.com/wp-json/posts',{params:{
		'filter[orderby]':'rand',
		'filter[posts_per_page]':1,
		'_':Math.floor(Math.random()*10000),//REMOVES CACHE
	}})
	.then(function (response) {
		// console.log(response.data[0]);
		var quote = response.data[0].content.replace(/<p>/,'').replace(/\s<\/p>.*/,'');
		var author = response.data[0].title;

		document.getElementById('twitter').setAttribute('href','https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
		document.getElementById('tumblr').setAttribute('href','https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
		
		document.getElementById('quote').innerHTML = quote;
		document.getElementById('author').innerHTML = author;
		document.body.setAttribute('class','bkg'+ (bkg_index++%3+1))
	})
	.catch(function (error) {
		console.log(error);
	});
}

next_quote();