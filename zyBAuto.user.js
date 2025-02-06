// ==UserScript==
// @name         zyBooks Autocomplete
// @version      0.2
// @description  One click to speed up the boring parts
// @author       Evanito
// @match        https://learn.zybooks.com/zybook/*
// @namespace https://github.com/Evanito/zyBAuto
// @run-at document-idle
// ==/UserScript==
// TO USE: Click Autocomplete! on a zyBooks page <-----

// ==== SETTINGS ====
var autoRun = false;
// == END SETTINGS ==

// Do not edit below this line!
// ==========================================
(function() {
    console.log(timeString() + " [zBA] Begin zyBooks Autocomplete by Evanito.");
    if (autoRun) {
        run();
    } else {
        (function repeat() {
          try {
            document.getElementsByClassName('right-buttons')[0].innerHTML = '<button id="zbaButton" type="button">Autocomplete!</button>' + document.getElementsByClassName('right-buttons')[0].innerHTML;
            document.getElementById("zbaButton").addEventListener ("click", zBAStartButton, false);
          } catch (error) {
          setTimeout(() => {
            repeat()
            }, 1000)
        }})()
    }
})();


function zBAStartButton (zEvent) {
    console.log(timeString() + " [zBA] Running...");
    run();
	click_fill_in_blank();
}

function run() {
    click_plays();
    click_starts();
	click_mcq();
    setTimeout(function(){ run(); }, 1000);
}

function click_plays() { // Clicks all Play buttons
    var plays = document.getElementsByClassName("play-button");
    for (var i = 0; i < plays.length; i++) {
        if (!(plays[i].classList).contains("rotate-180")){
            plays[i].click();
            console.log(timeString() + " Clicked a play button.");
        }
    }
}

function click_starts() { // Clicks all Start buttons
    var starts = document.getElementsByClassName("start-button");
    for (var i = 0; i < starts.length; i++) {
        starts[i].click();
        console.log(timeString() + " Clicked a start button.");
    }
}

function click_mcq() {
	var questions = document.getElementsByClassName("question-choices");
	
	for (var i = 0; i < questions.length; i++) {
		var question = questions[i];
		
		if (question.parentElement.parentElement.children[2].children[0].ariaLabel == "Question not completed") {
			var children = question.children;
			
			children[Math.floor(Math.random() * children.length)].children[0].click();
		}
	}
}

function click_fill_in_blank() {
	var titles = document.getElementsByClassName("title");

    for (var i = 0; i < titles.length; i++) {
        var title = titles[i];

        if (title.innerText == "Show answer") {
            title.click();
			title.click();
			console.log(title);
			
			try {
				var textBox = title.parentElement.parentElement.parentElement.children[0].children[0].children[0];
			} catch (error) { continue;}
			try {
				var answer = title.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children[0].innerText;
			} catch (error) { continue;}
			textBox.value = answer;
			
			
            // Trigger input event (for line break)
            const inputEvent = new InputEvent('input', {
                bubbles: true,
                cancelable: false,
                composed: true,
                inputType: 'insertLineBreak',
                isComposing: false,
                data: null
            });
            textBox.dispatchEvent(inputEvent);
            
            // Trigger change event
            const changeEvent = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            textBox.dispatchEvent(changeEvent);
            
            // Trigger keyup event
            const keyupEvent = new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                key: 'Enter',
                code: 'Enter'
            });
            textBox.dispatchEvent(keyupEvent);
		}
    }
}

function timeString() {
    let d = new Date();
    let h = (d.getHours()<10?'0':'') + d.getHours();
    let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    let dstr = h + ':' + m + ":" + s;
    return dstr;
}
