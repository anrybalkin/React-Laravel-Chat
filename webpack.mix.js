let mix = require('laravel-mix');

mix.js('resources/js/app.jsx', 'public/js').react()
    .version();
    /*mix.js('resources/js/app.jsx', 'public/js')
   .react();*/
mix.sass('resources/sass/app.scss', 'public/css/app.css')



if (mix.inProduction()) {
    mix.version();
}
