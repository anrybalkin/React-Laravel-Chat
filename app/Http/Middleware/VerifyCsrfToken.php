<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
<<<<<<< Updated upstream
=======
        "users",
        "users/*",
        "message",
        "message/*",
        "chat",
        "chat/*",
        "user",
        "user/*"
>>>>>>> Stashed changes
    ];
}
