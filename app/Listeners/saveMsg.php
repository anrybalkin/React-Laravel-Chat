<?php

namespace App\Listeners;

use App\Events\newMsg;
use App\Events\recentMsg;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class saveMsg
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\newMsg  $event
     * @return void
     */
    public function handle(newMsg $event)
    {
        //
        var_dump($event);
        event(new recentMsg("data"));
    }
}
