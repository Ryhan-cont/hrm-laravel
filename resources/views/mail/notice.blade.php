@extends('mail.layout')

@section('content')
    <!-- Page Content -->
    <div class="site-content w-100">
        <div>{!! $details['emailBody'] !!}</div>
    </div>
    <!-- END Page Content -->
@endsection
