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
                appId            : '1067223790854254',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v14.0'
              });
            };
          </script>
          <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
    </head>
    <body class="antialiased">
        <div id="app"></div>
        <script src="{{ mix('/js/app.js') }}"></script>
        <div class="page-buffer"></div>
    </body>
</html>