class Stopwatch
{
    /**
     * Create a Stopwatch object.
     */
	constructor()
	{
		this.active = false;
		this.elapsedTime = 0;
		this.startTime = 0;
	}

	/**
	 * Synchronizes the start time of a stopwatch to a second one.
	 * The two stopwatches may have separate loop or fps parameters, just their start times and raw elapsed time will be in sync.
	 * @param {Stopwatch} s2 A stopwatch to synchronize to.
	 */
	Synchronize(s2)
	{
		this.startTime = s2.startTime;
		this.elapsedTime = s2.elapsedTime;
	}

	/**
	 * Starts the stopwatch timing.
	 */
	Start()
	{
		this.startTime = (new Date()).getTime();
		this.elapsedTime = 0;
		this.active = true;
	}

	/**
	 * Stops the stopwatch timing.
	 */
	Stop()
	{
		this.elapsedTime = this.ElapsedTime();
		this.active = false;
	}

	/**
	 * Resets the start time of this stopwatch to match the given elapsed time.
	 * @param {number} elapsedTime The desired elapsed time.
	 */
	SetElapsedTime(elapsedTime)
	{
		this.elapsedTime = elapsedTime;
		this.startTime = (new Date()).getTime() - this.elapsedTime * 1000.0;
	}

	/**
	 * Marks the current elapsed time.
	 * All further calls to ElapsedTime will return the same result, until ResumeLap is called.
	 * Not really the same as stopping the Stopwatch - it can be resumed with ResumeLap.
	 */
	MarkLap()
	{
		this.elapsedTime = this.ElapsedTime();
		this.active = false;
	}

	/**
	 * Continues the Stopwatch running after a call to MarkLap.
	 */
	ResumeLap()
	{
		this.active = true;
	}

	/**
	 * Returns the elapsed time in seconds.
	 * If a frame rate has been set, snap to the closest frame.
	 * @returns {number} The elapsed time in seconds.
	 */
	ElapsedTime()
	{
		if (this.active)
		{
			this.elapsedTime = (new Date().getTime() - this.startTime) / 1000.0;
		}
		return this.elapsedTime;
	}
}
