var spinButtonEl;
var retryButtonEl;
var resultEl;
var creditsEl;

var randomChar = ['&', '?', '/', ':', ')', '{', ']', '*', '$', '!', '#', '@', '^'];
var rollResult;
var rollTick = 0;
var credits = 1;
var rolls = 0;

var updateCredits = function() {
	creditsEl.innerText = "Credits: " + credits;
}

var roll = function() {
	rolls++;
	
	if (rolls == 1) { // First rolls, just give it to the player
		rollResult = 1;
	}
	else if (credits > 16) {
		rollResult = Math.floor(Math.random() * 2);
	} else {
		rollResult = Math.floor(Math.random() * 3);
	}
	resultEl = document.getElementById("result");
	spinButtonEl = document.getElementById("spinButton");
	retryButtonEl = document.getElementById("retryButton");
	creditsEl = document.getElementById("credits");
	
	spinButtonEl.disabled = true;
	
	setTimeout(rollThink, 50);
}

var rollThink = function() {
	var randomString = "";
	
	for (var i = 0; i < 6; i++) {
		randomString += randomChar[Math.floor(Math.random() * randomChar.length)];
	}
	
	resultEl.innerText = randomString;
	
	if (rollTick <= 20) { // One seconds in ticks
		setTimeout(rollThink, 50);
	} else {
		if (rollResult > 0) {
			resultEl.innerText = "Double!";
			credits *= 2;
			spinButtonEl.disabled = false;
		} else {
			resultEl.innerText = "Nothing";
			retryButtonEl.style.visibility = "visible";
			credits = 0;
		}
		updateCredits();
		rollTick = 0;
	}

	rollTick++;
}

var retry = function() {
	rollTick = 0;
	resultEl.innerText = "Press the button below to spin";
	credits = 1;
	updateCredits();
	spinButtonEl.disabled = false;
	retryButtonEl.style.visibility = "hidden";
}