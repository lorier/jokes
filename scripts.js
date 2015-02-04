$(document).ready(function(){

			(function() {
				//utility: shuffle joke order for every page reload
				var clickCount = 0;
				var clickLimit = 8;
				var jokes;
				//correcting weird blip in Safari iPad
				$(".bubbles").css("height", "187px");

				function shuffleArray(array) {
			      for (var i = array.length - 1; i > 0; i--) {
				      var j = Math.floor(Math.random() * (i + 1));
				      var temp = array[i];
				      array[i] = array[j];
				      array[j] = temp;
			      }
			      return array;
			    }
			    //utility: get random number within a range
			    function getRandomInt (min, max) {
				    return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				//get jokes
				$.getJSON( "jokes.json", {
				    question: "question",
				    button: "button",
				    answer: "answer"
				  })
				  .done(function( data ) {
  				    jokes = shuffleArray(data);
				    runJokes();
				  });

				//set up page
				function runJokes() {
					if (clickCount>clickLimit){
						if( bubbleTl ){
							bubbleTl.remove();
							$("#bubble_one").remove();
							$("#bubble_two").remove();
							$("#bubble_three").remove();
						}
						$(".container").empty().append("<div id='end_message'><h1>Wow, you really like jokes!</h1><p class='final'>Or you kept clicking hoping they’d get funnier. Either way, we have a feeling we’d get along pretty well. <span id='obf'>Give us a shout</span> if you want to talk about some (more serious) business, we’d love to hear from you.</p></div>");

						document.getElementById('obf').innerHTML="<n uers=\"znvygb:uryyb@gvaljunyrperngvir.pbz?fhowrpg=Uryyb\" >Tvir hf n fubhg</n>"
						.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});

						var tlEnd = new TimelineLite();
						tlEnd.to("#end_message", 1, {opacity: "1"}, "-=.75");
						tlEnd.to("#walrus_image", .5, {opacity: "1", height: "336px"});

					}else{
						var joke = jokes[clickCount]; 
			    		
			    		var tl = new TimelineLite();
			    		var tlClick = new TimelineLite();

						$(".question h2 span").text(joke["question"]);
						tl.to(".answer.button", 0, {display: "inline-block"});
						tl.to(".question h2 span", .5, {opacity: "1"});
			    		tl.to(".answer.button", .5, {opacity: "1"});

						//populate markup with data
					    $(".answer.button").text(joke["button"]);
					    $(".answer_block h3").text(joke["answer"]);

					    $(".answer.button").on("click", function(){
					    	$(this).off();
					    	tlClick.to(this, .25, {opacity: "0"});
					    	tlClick.to(this, 0, {display: "none"});
						    tlClick.to(".answer_block h3", .25, {opacity: "1"});
							tlClick.to(".one_more", .25, {opacity: "1"}, "+=.75");
							tlClick.call(function(){$(".one_more").on("click", getAnotherJoke );});
						    })
						 };
					};
					function getAnotherJoke(event){
						console.log("get another joke called");
			    		++clickCount;
			    		var tl = new TimelineLite();
			    		$(".one_more").off();
			    		tl.to(".one_more", .25, {opacity:"0"});
			    		tl.to(".question h2 span", .0, {opacity:"0"});
			    		tl.to(".answer_block h3", .0, {opacity:"0"});
			    		tl.call(runJokes);
			    	};

			    	// bubble animation
					var bubbleTl = new TimelineLite({  onStart: bubblePositionSetup});
					bubbleTl.to("#bubble_one", 0, {opacity: 1});
					bubbleTl.to("#bubble_one", 4, {bottom: "90%", opacity: 0, ease:Linear.easeNone});
					bubbleTl.to("#bubble_two", 0, {opacity: 1});
					bubbleTl.to("#bubble_two", 4, {bottom: "90%", opacity: 0, ease:Linear.easeNone});	
					bubbleTl.to("#bubble_three", 0, {opacity: 1});
					bubbleTl.to("#bubble_three", 4, {bottom: "90%", opacity: 0, ease:Linear.easeNone});	
					bubbleTl.call(function()
						{  if (clickCount<jokes.length){
								bubbleTl.restart();
							}else{
								console.log("we're at the end");
							} 
						});
						
					function bubblePositionSetup(){
						//randomize the left position of bubbles
						var random = function(a, b){ return getRandomInt(a, b) + "%"; };
						$("#bubble_one").css({"left": random(5, 15)});
						$("#bubble_two").css({"left": random(70, 80), "opacity": 0});
						$("#bubble_three").css({"left": random(80, 90), "opacity": 0});
					}
				})();


			
		});