<div class="language-block">
    <h2 class="language-block__title">XML <i class="fas fa-spinner fa-pulse loading"></i></h2>
    <form action="{{ route('api.download') }}" method="POST">
        @csrf
        <input type="hidden" name="filename" class="converted__filename" value="file">
        <input type="hidden" name="extension" class="converted__extension" value="xml">
        <textarea class="form-control parsing-result" name="converted" readonly></textarea>
        <button class="btn btn-primary btn-md mt-2 save-btn" type="submit">Save</button>
    </form>
</div>
