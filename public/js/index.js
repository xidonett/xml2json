let allowedExtensions = ['xml', 'json'];
let currentFileType = 'JSON';
let selfInput = false;

/* Hidden Elements */

$('.start-btn').hide();
$('.save-btn').hide();
$('.loading').hide();
$('.reset-btn').hide();

/* End Hidden Elements */

function changeLanguageBlock(language)
{
    currentFileType = language;

    $('.language-block__title').get(0).textContent = language;

    if (currentFileType === 'JSON') {
        $('.language-block__title').get(1).textContent = 'XML';
    } else {
        $('.language-block__title').get(1).textContent = 'JSON';
    }

    $('.choose-btn__file-type').text(language);
    $('.parsing-file').attr('accept', '.'+language.toLowerCase());
}

$('.choose-btn').on('click', function() {
    $('.parsing-file').click();
});

$('.parsing-file').on('change', function() {
   let file = $('.parsing-file').prop('files')[0];
   let fileNameSplitted = file.name.split('.');
   let fileExtension = fileNameSplitted[fileNameSplitted.length-1];
   let fileName = fileNameSplitted[0];

   let reader = new FileReader();

   reader.readAsText(file);

   reader.onload = function() {
       $('.parsing-data').text(reader.result);
   }

   reader.onerror = function() {
       console.log(reader.error);
   }

   if (allowedExtensions.includes(fileExtension)) {
        $('.start-btn').css('display', 'block');
        $('.start-btn').show(300);
        $('.exchange-btn').hide(300);
        $('.converted__filename').val(fileName);

        if (fileExtension === 'json') {
            $('.converted__extension').val('xml');
        } else {
            $('.converted__extension').val('json');
        }
   } else {

   }
});

$('.exchange-btn').on('click', function() {
    let languageBlocksTitle = $('.language-block__title');
    if (currentFileType === 'JSON') {
        changeLanguageBlock('XML');
    } else {
        changeLanguageBlock('JSON');
    }
});

$('.parsing-data').on('keyup', function() {
    let parsingDataText = $('.parsing-data').val();
    console.log(parsingDataText);
    if (parsingDataText !== '') {
        selfInput = true;
        $('.choose-btn').hide(200);
        $('.start-btn').show(200);
        $('.exchange-btn').hide(200);
        $('.reset-btn').hide(200);
    } else {
        selfInput = false;
        $('.choose-btn').show(200);
        $('.start-btn').hide(200);
        $('.exchange-btn').show(200);
    }
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('.start-btn').on('click', function() {
    $('.loading').show(200);
    $('.reset-btn').show(200);
    $('.start-btn').hide(200);

    let formData = new FormData();
    if (!selfInput) {
        formData.append('file', $('.parsing-file').prop('files')[0]);
    } else {
        formData.append('self_input', $('.parsing-data').val());
    }

    let urlPart = '';

    if (currentFileType === 'JSON') {
        urlPart = 'xml';
    } else {
        urlPart = 'json';
    }

    $.ajax({
        url: '/api/get-'+urlPart,
        type: 'POST',
        data: formData,
        cache       : false,
        contentType : false,
        processData : false,
        success: function (data) {
            formData = new FormData();
            $( ".parsing-result" ).val( data );
            $('.save-btn').show(200);
            $('.loading').hide(0);
        },
        error: function (error) {
            formData = new FormData();
            $('.save-btn').hide(200);
            $( ".parsing-result" ).val( 'ERROR '+error.status+' | '+error.statusText );
            $('.loading').hide(0);
            console.dir(error);
            $('#error-modal__title').text('ERROR '+error.status);
            $('.error-modal__content').html(error.statusText + '<br>' + JSON.parse(error.responseText).message);
            $('#error-modal').modal('show');
        }
    });
});
