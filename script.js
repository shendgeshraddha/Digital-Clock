const clock = () => {
    let date = new Date()
  }
  
  /*=============== TIME AND DATE TEXT ===============*/
  const dateDayWeek = document.getElementById('date-day-week'),
        dateMonth = document.getElementById('date-month'),
        dateDay = document.getElementById('date-day'),
        dateYear = document.getElementById('date-year'),
        textHour = document.getElementById('text-hour'),
        textMinutes = document.getElementById('text-minutes'),
        textAmPm = document.getElementById('text-ampm')
  
  const clockText = () =>{
     // We get the Date object
     let date = new Date()
  
     // We get the time and date
     let dayWeek = date.getDay(),
         month = date.getMonth(),
         day = date.getDate(),
         year = date.getFullYear(),
         hh = date.getHours(),
         mm = date.getMinutes(),
         ampm
  
     // We get the days of the week and the months. (First day of the week Sunday)
     let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
     let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
     // We add the corresponding dates
     dateDayWeek.innerHTML = `${daysWeek[dayWeek]}`
     dateMonth.innerHTML = `${months[month]}`
     dateDay.innerHTML = `${day}, `
     dateYear.innerHTML = year
  
     if(hh >= 12){
      hh = hh - 12
      ampm = 'PM'
   } else{
      ampm = 'AM'
   }
  
   textAmPm.innerHTML = ampm
  
   // When it is 0 hours (early morning), we tell it to change to 12 hours
   if(hh == 0){hh = 12}
  
   // If hours is less than 10, add a 0 (01,02,03...09)
   if(hh < 10){hh = `0${hh}`}
  
   textHour.innerHTML = `${hh}:`
  
   // If minutes is less than 10, add a 0 (01,02,03...09)
   if(mm < 10){mm = `0${mm}`}
  
   textMinutes.innerHTML = mm
  }
  setInterval(clockText, 1000) // (Updates every 1s) 1000 = 1s
  
  // Clock
  
  const updateTime = () => {
      const time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();
      let ampm = hours >= 12 ? "PM" : "AM";
      let otherampm = hours >= 12 ? "AM" : "PM";
    
      hours = hours % 12 || 12;
      hours = addTrailingZero(hours);
      minutes = addTrailingZero(minutes);
      seconds = addTrailingZero(seconds);
    
      $("#hour").html(hours);
      $("#min").html(minutes);
      $("#sec").html(seconds);
      $("#ampm").html(ampm);
      $("#other-ampm").html(otherampm);
    };
    
    updateTime();
    setInterval(updateTime, 1000);
    
    $("#stopwatch-btn").click(function () {
      $(".main-container > div").slideUp();
      $(".stopwatch").slideDown();
      $(".type").html("Stopwatch");
    });
    
    $("#timer-btn").click(function () {
      $(".main-container > div").slideUp();
      $(".timer").slideDown();
      $(".type").html("Timer");
    });
    
    $(".back-btn").click(function () {
      $(".main-container > div").slideUp();
      $(".clock").slideDown();
      $(".type").html("Clock");
    });
    
    let stopwatchHours = 0,
      stopwatchMinutes = 0,
      stopwatchSeconds = 0,
      stopwatchMiliSeconds = 0,
      stopwatchRunning = false,
      laps = 0,
      stopwatchInterval;
    
    function stopwatch() {
      stopwatchMiliSeconds++;
      if (stopwatchMiliSeconds === 100) {
        stopwatchMiliSeconds = 0;
        stopwatchSeconds++;
      }
      if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
      }
      if (stopwatchMinutes === 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
      }
    
      $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
      $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
      $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
      $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
    }
    
    function startStopwatch() {
      if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
      }
    }
    
    function stopStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
    }
    
    function resetStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
      stopwatchHours = 0;
      stopwatchMinutes = 0;
      stopwatchSeconds = 0;
      stopwatchMiliSeconds = 0;
      laps = 0;
      $("#stopwatch-hour").html("00");
      $("#stopwatch-min").html("00");
      $("#stopwatch-sec").html("00");
      $("#stopwatch-ms").html("00");
    }
    
    $(".start-stopwatch").click(function () {
      startStopwatch();
      $(".start-stopwatch").hide();
      $(".lap-stopwatch").show();
    });
    
    $(".lap-stopwatch").click(function () {
      laps++;
      $(".lap").removeClass("active");
      $(".laps").prepend(
        ` <div class="lap active">
          <p>Lap ${laps}</p>
          <p>
            ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
          stopwatchMinutes
        )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
          stopwatchMiliSeconds
        )}
          </p>
        </div>
       `
      );
    });
    
    $(".reset-stopwatch").click(function () {
      resetStopwatch();
      $(".start-stopwatch").show();
      $(".lap-stopwatch").hide();
      $(".laps").html("");
    });
    
    function addTrailingZero(number) {
      return number < 10 ? "0" + number : number;
    }
    
    let time = 0,
      timerHours = 0,
      timerMinutes = 0,
      timerSeconds = 0,
      timerMiliseconds = 0,
      timerRunning = false,
      timerInterval;
    
    function getTime() {
      time = prompt("Enter time in minutes");
      time = time * 60;
      setTime();
    }
    function setTime() {
      timerHours = Math.floor(time / 3600);
      timerMinutes = Math.floor((time % 3600) / 60);
      timerSeconds = Math.floor(time % 60);
      timerMiliseconds = 0;
    
      $("#timer-hour").html(addTrailingZero(timerHours));
      $("#timer-min").html(addTrailingZero(timerMinutes));
      $("#timer-sec").html(addTrailingZero(timerSeconds));
      $("#timer-ms").html(addTrailingZero(timerMiliseconds));
    }
    
    function timer() {
      timerMiliseconds--;
      if (timerMiliseconds === -1) {
        timerMiliseconds = 99;
        timerSeconds--;
      }
      if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
      }
      if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
      }
    
      $("#timer-hour").html(addTrailingZero(timerHours));
      $("#timer-min").html(addTrailingZero(timerMinutes));
      $("#timer-sec").html(addTrailingZero(timerSeconds));
      $("#timer-ms").html(addTrailingZero(timerMiliseconds));
    
      timeUp();
    }
    
    function startTimer() {
      if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
        getTime();
      } else {
        timerInterval = setInterval(timer, 10);
        timerRunning = true;
        $(".start-timer").hide();
        $(".stop-timer").show();
      }
    }
    
    function stopTimer() {
      clearInterval(timerInterval);
      timerRunning = false;
      $(".start-timer").show();
      $(".stop-timer").hide();
    }
    
    function resetTimer() {
      stopTimer();
      time = 0;
      setTime();
    }
    
    function timeUp() {
      if (
        timerHours === 0 &&
        timerMinutes === 0 &&
        timerSeconds === 0 &&
        timerMiliseconds === 0
      ) {
        stopTimer();
        alert("Time's up!");
    
        setTime();
      }
    }
    
    $(".start-timer").click(startTimer);
    
    $(".stop-timer").click(stopTimer);
    
    $(".reset-timer").click(function () {
      resetTimer();
      if (!timerRunning) {
        $(".start-timer").show();
        $(".stop-timer").hide();
      }
    });
  
  const body = document.querySelector('body');
  const mode = document.querySelector('.mode');
  const icon = document.querySelector('.btn__icon');
  // const bgElem = document.querySelector('bg-elem');
  
  //to save the dark mode use the object "local storage".
  
  //function that stores the value true if the dark mode is activated or false if it's not.
  function store(value){
    localStorage.setItem('darkmode', value);
  }
  
  //function that indicates if the "darkmode" property exists. It loads the page as we had left it.
  function load(){
    const darkmode = localStorage.getItem('darkmode');
  
    //if the dark mode was never activated
    if(!darkmode){
      store(false);
      icon.classList.add('fa-sun');
    } else if( darkmode == 'true'){ //if the dark mode is activated
      body.classList.add('darkmode');
      icon.classList.add('fa-moon');
    } else if(darkmode == 'false'){ //if the dark mode exists but is disabled
      icon.classList.add('fa-sun');
    }
  }
  
  
  load();
  
  mode.addEventListener('click', () => {
  
    body.classList.toggle('darkmode');
    icon.classList.add('animated');
  
    //save true or false
    store(body.classList.contains('darkmode'));
  
    if(body.classList.contains('darkmode')){
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }else{
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  
    setTimeout( () => {
      icon.classList.remove('animated');
    }, 500)
  })