<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use App\Models\Emailtemplate;

class UserCreateNotification extends Notification
{
    use Queueable;

    public $details;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $veriable = [
            '{app_name}' => 'Agilex',
            '{receiver_name}' => $this->details->first_name.' '.$this->details->last_name,
            '{user_name}' => $this->details->username,
            '{password}' => $this->details->raw_pass,
        ];
        
        $emailData = Emailtemplate::where('emailcode', 'Employee-Create')->first();
        $body = $emailData->body;
        $subject = $emailData->subject;

        foreach($veriable as $k => $v){
            $body = str_replace($k, $v, $body);
            $subject = str_replace($k, $v, $subject);
        }


        $this->details->subject = $subject;
        $this->details->emailBody = $body;
        return (new MailMessage)->subject($subject)->view('mail.userCreated', ['details' => $this->details]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
