<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>

        <!-- Fonts -->
        <link
            href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap"
            rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="css/app.css">

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            
        </style>
        
<script>
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '3198188800437862',
        cookie     : true,
        xfbml      : true,
        version    : '{api-version}'
      });
        
      FB.AppEvents.logPageView();   
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  </script>
    </head>
    <body class="antialiased">
        <div id="app"></div>
        <script src="{{ mix('/js/app.js') }}"></script>
        <div class="page-buffer"></div>
    </body>
</html>