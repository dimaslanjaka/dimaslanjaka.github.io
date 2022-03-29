<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <title>미디 플레이어 v0.1</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel=apple-touch-icon type=image/png href="./midi-icon.png">
  <style>
    body{
      padding-top: 10px
    }

    ul{
      list-style: none;
        list-style-type: none;
    }

    #playWindow{
      position: fixed;
      z-index: 50;
      bottom: -2px;
      right: 0px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.9)
    }

    #playWindow .playBtnPanel{
      position:absolute;
      right: 10px;
      top: 50px;
    }

    #playInfo{
      overflow: hidden;
      height: 25px;
        animation:scroll 10s linear infinite;
    }

    .playBtnPanel button{
      margin: 0px;
    }

  </style>
  <script type='text/javascript' src='//www.midijs.net/lib/midi.js'></script>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"></script>
   <script data-presets="es2015,stage-2">
        Number.prototype.toMS = function(isMillisecond) {
            if (isMillisecond) {
                var num = parseInt(this) / 1000
            } else {
                var num = parseInt(this)
            }

            // console.log(num)
            var min = Math.floor(num / 60)
            var sec = Math.floor(num - (min * 60))
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            return min + ":" + sec
        }

        const global_toNext = {
            timeout: null,
            totalDuration: 0,
            currentTime: 0,
            targetEl: null
        }


        window.onload = function() {

            var global_isPlaying = false;
            const regex1 = /^Playing: .*$/g

            console.log(MIDIjs.get_audio_status());

            function nextCaller(time, targetEl){
                if(global_toNext.timeout){
                    clearTimeout(global_toNext.timeout)
                }
                global_toNext.targetEl = targetEl
                global_toNext.timeout = setTimeout(()=>{
                    targetEl.trigger("click")
                }, time + 5000)

            }

            $(".pseudoLink").click(e => {

                MIDIjs.play(e.target.dataset.url)
                MIDIjs.get_duration(e.target.dataset.url, function(seconds) {
                    $("#title").text(e.target.innerText)
                    $("#btnPause").data("playing", "true")
                    $("#total_time").text(seconds.toMS())
                    global_toNext.totalDuration = parseInt(seconds) * 1000
                    global_isPlaying = true;

                    $(".pseudoLink.text-info").removeClass("text-info")
                    $(".pseudoLink.text-warning").removeClass("text-warning")
                    $(e.target).addClass("text-info")
                    // alert(seconds)

                    const sw1 = setInterval(() => {
                        const msg = $("#playInfo").text().trim()
                        if(regex1.test(msg)){
                            const time = parseInt(seconds) * 1000
                            const targetEl = $(e.target).next()
                            console.log(msg, targetEl)
                            nextCaller(time, targetEl)

                            clearInterval(sw1)
                        }
                    }, 100)
                })

                $("#btnPause .material-icons").html("pause")


                return false;
            })

            $("#btnPause").on("click", e => {

                console.log(global_isPlaying)

                if (global_isPlaying == true) {
                    MIDIjs.pause()
                    global_isPlaying = false
                    $("#btnPause .material-icons").html("play_arrow")
                    clearTimeout(global_toNext.timeout)
                    $(".pseudoLink.text-info").removeClass("text-info").addClass("text-warning")
                } else {
                    MIDIjs.resume()
                    global_isPlaying = true
                    $("#btnPause .material-icons").html("pause")
                    nextCaller(global_toNext.totalDuration - global_toNext.currentTime, global_toNext.targetEl)
                    $(".pseudoLink.text-warning").addClass("text-info").removeClass("text-warning")
                }



            })

            $("#btnStop").click(e => {
                MIDIjs.stop()
                clearTimeout(global_toNext.timeout)
                $(".pseudoLink.text-info").removeClass("text-info")
                $(".pseudoLink.text-warning").removeClass("text-warning")
            })


            var message_span = document.getElementById('MIDIjs.message');
            message_span.innerHTML = MIDIjs.get_audio_status();

            MIDIjs.message_callback = display_status;

            function display_status(message) {
                message_span.innerHTML = message;
            };


            var time_span = document.getElementById('MIDIjs.audio_time');
            MIDIjs.player_callback = display_time;

            function display_time(player_event) {
                time_span.innerHTML = player_event.time.toMS();
                global_toNext.currentTime = player_event.time * 1000
            };

        }

    </script>
</head>

<body>



  <div id="wrapper" class="container">

    <div id="playWindow" class="card border-info mb-1">
      <div class="card-body">
        <h5 class="card-title" id="title">Initializing...</h5>
        <p class="card-text"> <span id="MIDIjs.audio_time">00:00</span> / <span id="total_time">00:00</span></p>
        <p class="card-text" id="playInfo"> <span id="MIDIjs.message" style="color: green">Initializing ...</span></p>
      </div>

      <div class="playBtnPanel">
        <button class="btn btn-secondary" id="btnPause"><i class="material-icons">play_arrow</i></button>
        <button class="btn btn-secondary" id="btnStop"><i class="material-icons">stop</i></button>
      </div>
    </div>



    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action active">
        미디 플레이어 (v0.1)
      </a>


      <?php
           function iterateDirectory($i)
          {
              foreach ($i as $path) {
                  if ($path->isDir())
                  {
                      iterateDirectory($path);
                  }
                  else
                  {
                    $r_path = str_replace("\\", "/", $path);
                    $v_path = str_replace("./files/", "", $r_path);

                      echo ''
                        .'<a href="#" class="pseudoLink list-group-item list-group-item-action" data-url="'.$r_path.'">'
                        .$v_path
                        .'</a>';
                  }
              }

          }

          $dir = './files';
          $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));

          iterateDirectory($iterator);
  ?>

      <div style="height: 150px"></div>
    </div>
  </div>
</body>

</html>