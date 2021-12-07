// console.log(srtText);

// let srt = new Srt(srtText);

// // get the number of entries
// console.log(srt.lines.length); // 723

// // get the 5th line
// console.log(srt.lines[0].subtitle); // Come on, let's go!

// // get the index of the entry
// console.log(srt.lines[0].counter); // 5

// // get the start time of the 5th entry
// console.log(srt.lines[0].start.text); // 00:01:42,500

// // each entry also has a start and end date object
// console.log(srt.lines[0].start.time);

// // you can get hours, minutes, seconds, and milliseconds as well
// console.log(srt.lines[0].start.hours);

let subtitlesPlaying = false;
let sw = new Stopwatch();
let srt;
let currentLine = 0;
let scriptName = "shuttle";
let language = "english";

function PlaySubtitles(inScriptName)
{
	subtitlesPlaying = true;
	if (inScriptName)
		scriptName = inScriptName;
	else
	{
		scriptName = "shuttle";
		switch (muteCount)
		{
			case 1:
				scriptName = "parade";
				break;

			case 2:
				scriptName = "pleaseTap";
				break;
			case 3:
				scriptName = "gifts";
				break;
			case 4:
				scriptName = "nothing";
				break;
			case 5:
				scriptName = "humanLove";
				break;
			case 6:
				scriptName = "workshop";
				break;
			case 7:
				scriptName = "fireGift";
				break;
			case 8:
				scriptName = "angryZeus";
				break;
			case 9:
				scriptName = "liver";
				break;
			case 10:
				scriptName = "beFree";
				break;
			case 11:
				scriptName = "happyEnding";
				break;

			default:
				scriptName = "shuttle";
				break;
		}
	}
	srt = new Srt(srtText[scriptName][language]);
	currentLine = -1;
	sw.Start();

	let _animationCallback = function()
	{
		if (!subtitlesPlaying)
			return;
		let captionElem = document.getElementById("captions");
		if (currentLine >= srt.lines.length - 1)
		{
			if (sw.ElapsedTime() >= srt.lines[srt.lines.length - 1].end.seconds)
			{
				captionElem.innerHTML = "";
				subtitlesPlaying = false;
				return;
			}
		}
		else
		{
			if (sw.ElapsedTime() >= srt.lines[currentLine + 1].start.seconds)
			{
				currentLine++;
				captionElem.innerHTML = srt.lines[currentLine].subtitle;
			}
			else if (currentLine >= 0 && currentLine < srt.lines.length && sw.ElapsedTime() >= srt.lines[currentLine].end.seconds)
			{
				captionElem.innerHTML = "";
			}
		}
		window.requestAnimationFrame(_animationCallback);
	}
	window.requestAnimationFrame(_animationCallback);
}

function StopSubtitles()
{
	subtitlesPlaying = true;
}

function TapTest()
{
	StopSubtitles();
	let captionElem = document.getElementById("captions");
	captionElem.innerHTML = "Tap Event";
}

let muteCount = 0;

function ToggleMute()
{
	PlaySubtitles();
	muteCount++;
	if (muteCount >= 4)
		document.getElementById("doodle-bug").style.display = "block";
}

let captionsShowing = true;

function ToggleSubtitles()
{
	if (captionsShowing)
	{
		document.getElementById("captions").style.height = "0px";
		document.getElementById("captions").style.opacity = "0";
	}
	else
	{
		document.getElementById("captions").style.height = "25px";
		document.getElementById("captions").style.opacity = "1";
	}
	captionsShowing = !captionsShowing;
}

function ChangeLanguage()
{
	language = document.getElementById("language").value;
	srt = new Srt(srtText[scriptName][language]);
	if (subtitlesPlaying)
	{
		if (currentLine >= 0 && currentLine < srt.lines.length)
		{
			document.getElementById("captions").innerHTML = srt.lines[currentLine].subtitle;
		}
	}
}
