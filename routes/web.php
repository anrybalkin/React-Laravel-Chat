<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\UserController;
use App\Models\users;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::resource('users', 'App\Http\Controllers\UserController');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('welcome');
});

Route::get('/chat', function () {
    return view('welcome');
});

Route::post("/user","App\Http\Controllers\UserController@addUser");
Route::get("/users/getUsers?at={at}&&to={to}",'App\Http\Controllers\UserController@getUsers');
Route::get("/users/user_id={id}",'App\Http\Controllers\UserController@show');
Route::get("/users/searchUser/query={query_search}",'App\Http\Controllers\UserController@searchUser');
Route::post("/users/updateStatus",'App\Http\Controllers\UserController@updateStatus');
Route::post("/users/getUsers",'App\Http\Controllers\UserController@getUsers');

Route::post("/chat",'App\Http\Controllers\ChatController@createChat');
Route::get("/chat/chat={id}",'App\Http\Controllers\UserController@show');

Route::post("/message",'App\Http\Controllers\MessagesController@store');
Route::post("/message/searchMsg",'App\Http\Controllers\MessagesController@searchMsg');
Route::post("/message/getMessages",'App\Http\Controllers\MessagesController@getMessages');
Route::post("/message/getLastMessage",'App\Http\Controllers\MessagesController@getLastMessage');
/*
Route::get('posts', [MessagesController::class, 'index'])->name('posts');
Route::post('posts', [MessagesController::class, 'store'])->name('posts.store');*/
//Route::get('/users/index', "App\Http\Controllers\UserController@index");
