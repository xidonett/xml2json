@extends('layouts.main')
@section('content')
    <section class="d-flex justify-content-between flex-wrap text-center p-5">
        @include('components.choose-file')
        @include('components.middle-buttons')
        @include('components.parsed-file')
    </section>
    @include('components.modals.error')
    @include('components.modals.button-one')
    @include('components.modals.button-two')
@endsection
