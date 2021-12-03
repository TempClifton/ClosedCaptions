let srtText = {
	english:
`1
00:00:00,050 --> 00:00:02,910
<i>[Music]</i>

2
00:00:04,490 --> 00:00:07,529
Hey it's Kyle from HubSpot Academy, and

3
00:00:07,529 --> 00:00:09,210
I'm gonna show you what your workday can

4
00:00:09,210 --> 00:00:11,860
look like now that you have the HubSpot

5
00:00:11,860 --> 00:00:14,160
CRM. Let's Go: The day starts, and you're
`,
	spanish:
`1
00:00:00,050 --> 00:00:02,910
<i>[Música]</i>

2
00:00:04,490 --> 00:00:07,529
Hola, soy Kyle de HubSpot Academy y

3
00:00:07,529 --> 00:00:09,210
Te voy a mostrar lo que tu jornada laboral puede

4
00:00:09,210 --> 00:00:11,860
parece ahora que tienes HubSpot

5
00:00:11,860 --> 00:00:14,160
CRM. Let's Go: comienza el día y estás
`,
	french:
`1
00:00:00,050 --> 00:00:02,910
<i>[Musique]</i>

2
00:00:04,490 --> 00:00:07,529
Hé, c'est Kyle de HubSpot Academy, et

3
00:00:07,529 --> 00:00:09,210
Je vais te montrer ce que ta journée de travail peut

4
00:00:09,210 --> 00:00:11,860
ressemble maintenant que vous avez le HubSpot

5
00:00:11,860 --> 00:00:14,160
CRM. Allons-y : la journée commence et vous êtes
`,
};

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
let language = "english";

function PlaySubtitles()
{
	subtitlesPlaying = true;
	srt = new Srt(srtText[language]);
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
	srt = new Srt(srtText[language]);
	if (subtitlesPlaying)
	{
		if (currentLine >= 0 && currentLine < srt.lines.length)
		{
			document.getElementById("captions").innerHTML = srt.lines[currentLine].subtitle;
		}
	}
}
