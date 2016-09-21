
  
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "vulevuvulevupate", "syndicate", "LIRIK", "PhantomL0rd", "riotgames",  "cdewx"];
  
function getStreamer() {
  //loop over streamers array
  
    streamers.forEach(function(streamer){
    $.getJSON("https://api.twitch.tv/kraken/channels/" + streamer + "?callback=?",
          function(chan){
            console.log(chan);
            var card = "";
            var netStatus;
            var name;
            var game;
            var profileLink;
            var profileImgSrc;
            var streamLink;
            var streamPreviewSrc;
            var streamLinkSrc;
            var nowPlaying;
            var statusColor;
            
            $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + "?callback=?", 
                      function(data){
                       console.log(streamer);
                       if (data.stream === null){
                          netStatus = "Offline";
                          statusColor = "#BDBDBD";
                          name = chan.name;
                          game = chan.game;
                          profileLink = chan.url;
                          profileImgSrc = chan.logo;
                          nowPlaying = name + " is offline.";
                          streamPreviewSrc = "http://footage.framepool.com/shotimg/646259883-image-noise-malfunction-television-set-black-color.jpg";
                          streamLinkSrc = "http://www.bootskitchenappliances.com/Themes/Common/Images/productPage/Unavailable.png";
                          
                        }
              
                        else if (data.stream === undefined){
                          netStatus = "Channel not found";
                          statusColor = "#373A40";
                          name = streamer;
                          game = "N/A"; 
                          profileLink = "http://www.twitch.tv";
                          profileImgSrc = "http://neksnkba.com/widget/image/placeholder.png";
                          nowPlaying = "This channel does not exist!";
                          streamPreviewSrc = "http://footage.framepool.com/shotimg/646259883-image-noise-malfunction-television-set-black-color.jpg";
                          streamLinkSrc = "http://www.bootskitchenappliances.com/Themes/Common/Images/productPage/Unavailable.png";
                        }
                        else {
                          netStatus = "Online";
                          statusColor = "#00FF2F";
                          name = data.stream.channel.display_name;
                          game = data.stream.game;
                          profileLink = chan.url;
                          profileImgSrc = chan.logo;
                          nowPlaying = "Now playing: ";
                          streamPreviewSrc = data.stream.preview.medium;
                          streamLinkSrc = "http://fateofasalesman.com/wp-content/uploads/2013/11/WatchNow.png";
                        }
                        if (game == null || game == undefined){
                            game = "&nbsp ";
                          }
                
                        
                        var card =  '<div class="card">                                                             ' +
                        '   <div class="cardHeading">                                                   ' +
                        '     <div class="statusIndicator" style="background-color:'+ statusColor +'"></div>                                       ' +
                        /*'     <div class="statusText">' + netStatus + '</div>                              ' + */
                        '       <div class="profileImgWrapper"><a href="'+ profileLink +'" target="_blank"><img class="profilePic" src="' + profileImgSrc + '"></a></div>    ' +
                        '       <div class="chanInfo"><h3>' + name + '</h3><br>                           ' +
                        '       <h4>' + game + '</h4></div>                         ' +
                        '   </div><hr class="cardhr">                                                  ' +  
                        '   <div class="body">                                      ' + "<p class='nowPlaying'>" + nowPlaying + "</p>" +
                        '     <a href="'+ profileLink +'"  target="_blank"><img class="streamPreview" src="'+ streamPreviewSrc +'"></a>   ' +
                        '     <a href="'+ profileLink +'"  target="_blank"><img class="streamLink" src="'+ streamLinkSrc + '"></a> </div>                                                  ' +
                        '</div>                                                     ' ;
                      if (netStatus == "Online"){
                         $("#onlineStreamers").append(card);
                       }
                       else {
                         $("#offlineStreamers").append(card);
                         
                       }
                       
                  });//inner callback ends
        });  // channel callback ends;
      });// forEach ends 
    }; //getStremer ends



getStreamer();