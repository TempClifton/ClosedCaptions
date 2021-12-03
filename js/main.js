let srtText = `1
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
`;

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

function PlaySubtitles()
{
	subtitlesPlaying = true;
	srt = new Srt(srtText);
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
