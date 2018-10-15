//OBJECT
//===================================================================================================
var TriviaGame = {

	inCorrAnsCnt: 0,
	corrAnsCnt: 0,
	missed: 0,
	currQues: 0,
	time: 0,
	myTimer: "",
	timeCnt: 31,

	imgArray: [
				"<img class = 'image' src='assets/images/catdog.jpg' alt='Catdog'>",
				"<img class = 'image' src='assets/images/doug.jpg' alt='Doug'>",
				"<img class = 'image' src='assets/images/fairly-oddparents.jpg' alt='Fairly Oddparents'>",
				"<img class = 'image' src='assets/images/hey-arnold.jpg' alt='Hey Arnold'>",
				"<img class = 'image' src='assets/images/jimmy-neutron.jpg' alt='Jimmy Neutron'>",
				"<img class = 'image' src='assets/images/ren-and-stimpy.jpg' alt='Ren and Stimpy'>",
				"<img class = 'image' src='assets/images/rocket-power.jpg' alt='Rocket Power'>",
				"<img class = 'image' src='assets/images/spongebob-squarepants.jpg' alt='Spongebob Squarepants'>",
				"<img class = 'image' src='assets/images/the-angry-beavers.jpg' alt='The Angry Beavers'>",
				"<img class = 'image' src='assets/images/the-wild-thornberrys.jpg' alt='The Wild Thornberrys'>"
				],

	triviaQuesArray: [
						{ ques: "Which series depicts the life of conjoined brothers, with one half being a cat and the other a dog?",
						  options: ["Johnny Tango", 
						 			"Bugs Bunny", 
						 			"Sylvester the Cat", 
						 			"Catdog"], 
						  ans: "Catdog"},
						{ ques: "The show focuses on the early adolescent life of its title character, who experiences common predicaments while attending school in his new hometown of Bluffington.",
						  options: [
						  	"Johnny Tango", 
						 	"Yosemite Sam", 
							 "Wile E. Coyote",
							 "Doug"], 
						  ans: "Doug"},
						{ ques: "Which cartoon starts Timmy Turner who is just your average boy navigating his way through childhood in his little town of Dimsdale?",
						  options: ["Daffy Duck", 
						 			"Fairly Oddparents", 
						 			"Elmer Fudd", 
						 			"Yosemite Sam"], 
						  ans: "Fairly Oddparents"},
						{ ques: "Who is a 4th-grader in a nameless city that resembles Brooklyn, New York, who lives in a multi-racial boarding house with his grandparents and a motley assortment of neighbors and friends?",
						  options: ["Hey Arnold", 
						 			"Buckwheat", 
						 			"Debbie Downer", 
						 			"Granny"], 
						  ans: "Hey Arnold"},
						{ ques: " This is about a genius inventor, but his inventions often cause trouble and it is usually up to him and his friends to stop them.",
						  options: ["Petunia Pig and Porky Pig", 
						 			"Wacky Races", 
						 			"Jimmy Neutron", 
						 			"Pepe Le Pew and Penelope Pussycat"], 
						  ans: "Jimmy Neutron"},
						{ ques: "The series follows the adventures of title characters of an emotionally unstable chihuahua, and good-natured, dimwitted cat.",
						  options: ["Petunia Pig and Porky Pig", 
						 			"Thelma and Louise", 
						 			"Ren and Stimpy", 
						 			"Pepe Le Pew and Penelope Pussycat"], 
						  ans: "Ren and Stimpy"},  
					    { ques: "This is the story of four friends who are addicted to action and extreme sports.",
						  options: ["Fantastic Four", 
						 			"The Four Aces", 
						 			"Winter Spring Summer Fall", 
						 			"Rocket Power"], 
						  ans: "Rocket Power"}, 
						{ ques: "This cartoons is straight out of Bikini Bottom.",
						  options: ["Moby Dick", 
						 			"Spongebob Squarepants", 
						 			"Aquaman", 
						 			"Submariner"], 
						  ans: "Spongebob Squarepants"},   
						{ ques: "This is about two young brothers who have left their home to become bachelors in the forest near the fictional Wayouttatown, Oregon.",
						  options: ["The Angry Beavers", 
						 			"Dumb and Dumber", 
						 			"Batman and Robin", 
						 			"The Strange Couple"], 
						  ans: "The Angry Beavers"}, 
						{ ques: "This show primarily centers on the family's younger daughter Eliza, and her secret gift of being able to communicate with animals, which was bestowed upon her after having rescued a shaman masquerading as a trapped warthog.",
						  options: ["The Wild Thornberrys", 
						 			"The Adams Family", 
						 			"Married with Children", 
						 			"Family Feud"], 
						  ans: "The Wild Thornberrys"},            
						],

	displayMsg(msg){

		//clear the question and options div
		$("#question-div").html("");
		$("#options-div").html("");

		//stop the timer
		clearInterval(this.myTimer);

		$("#msg-div").html(msg);
		$("#media-div").html(this.imgArray[this.currQues]);
	},

	doTimeOut: function(){
		//increment missed count
		this.missed++;
		var msg = "Sorry, Time is Up! The correct answer is " + this.triviaQuesArray[this.currQues].ans;
		this.displayMsg(msg);

		//display next question
		setTimeout(function(){TriviaGame.nextQuestion()}, 1000 * 3);
	},

	incGameTimerCnt: function(){
		if(TriviaGame.timeCnt > 0){
			TriviaGame.timeCnt--;
		}else{
			TriviaGame.doTimeOut();
		}
		//display the timer
		$("#timer-div").html("Time remaining is " + TriviaGame.timeCnt + " seconds.");
	},

	nextQuestion: function(){

		if (this.currQues + 1 < this.triviaQuesArray.length){
			this.currQues++;
			this.displayQues(this.currQues);
		}
		else { //END OF GAME
			msg = "All done! Here's how you did <br/><br/>Correct Answers: " + this.corrAnsCnt + "<br/>Incorrect Answers: " + this.inCorrAnsCnt + "<br/> Unanswered: " + this.missed + "<br/><button class = 'start'>Start Over</button>";
			this.displayMsg(msg);
		}

	},

	validateOption: function(selOption){

		var msg;

		if(selOption === this.triviaQuesArray[this.currQues].ans){
			this.corrAnsCnt++;
			msg = "Yep! The correct answer is " + this.triviaQuesArray[this.currQues].ans; 
			//correct answer
			this.displayMsg(msg);
		}
		else if(selOption !== this.triviaQuesArray[this.currQues].ans){
			this.inCorrAnsCnt++;
			msg =  "Nope! The correct answer is "+ this.triviaQuesArray[this.currQues].ans;

			//wrong answer
			this.displayMsg(msg);
		}

		//display the next question, if not end of game
		setTimeout(function(){TriviaGame.nextQuestion()}, 1000 * 3);
	
	},

	displayQues: function(num){

		$("#msg-div").html("");
		$("#media-div").html("");
		$("#timer-div").html("");

		//Display Question
		$("#question-div").html("<p>" + this.triviaQuesArray[num].ques + "</p>");

		//Display options for the question

		var opt = this.triviaQuesArray[num].options;

		for(k=0; k<opt.length; k++){
			var optButton = $("<button/>", {	
			'text': opt[k],
			'class': 'options',
			'data-ind': num,
			'value' : opt[k]
			});

			var brk = $("<br/>");

			//display options button on screem
			optButton.appendTo("#options-div");
			brk.appendTo("#options-div");

			}

		//start the timer
		this.timeCnt = 16;
		this.myTimer = setInterval(this.incGameTimerCnt, 1000);

		//display the timer
		/*$("#timer-div").html("Time remaining is " + this.timeCnt);*/
			
	},

	startGame: function(){

		this.inCorrAnsCnt = 0;
		this.corrAnsCnt = 0;
		this.missed = 0;
		this.currQues = 0;
		this.timeCnt = 15;


		//displayQues function passing 0
		this.displayQues(0);

	},

	displayQuesArray: function(){

		for(i=0, j=this.triviaQuesArray.length; i<j ; i++){

			console.log(this.triviaQuesArray[i]);
			var quest = this.triviaQuesArray[i].ques;
			var opt = this.triviaQuesArray[i].options;

			for(k=0; k<opt.length; k++){
				console.log(opt[k]);
			}

		}
	}

};

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================



// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================
TriviaGame.displayQuesArray();

$(document).on("click",".start", function(){

	console.log("Button clicked");

	if ($(this).hasClass("start")) {
		console.log("Start button clicked!");
		$("#start").hide();
		
		//display first question
		TriviaGame.startGame();

	}
});

$("#options-div").on("click","button", function(){

	console.log("Option Button clicked");
	console.log("Value of option is" + $(this).val());
	console.log("Index of ques array is" + $(this).data("ind"));
	var selOption = $(this).val();
	var quesIndx = $(this).data("ind");

	//validate selected option
	TriviaGame.validateOption(selOption);

});