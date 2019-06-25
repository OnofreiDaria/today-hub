$('.dropbtn').on("click",function (e) {
    e.preventDefault;
    $('.dropdown-content').toggleClass('show');
});

// Modal windows
$(function () {
     $(".dialog").dialog({
        autoOpen: false,
        height: "auto",
        maxWidth: 570,
        width: '100%',
        modal: true,
        open: function ()
        {
            $(".ui-dialog-titlebar").hide();
            $('.dialog-div-close').on('click', function () {
                $(".dialog").dialog('close');
            });
        },



    });
    $(".opener").on("click", function () {
        $(".dialog").dialog("open");
    });
});


$( function() {
   var modal = $( ".notification" ).dialog({
        autoOpen: false,
        height: "auto",
        modal: true,
        maxWidth: 550,
        minWidth: 320,
        width: '100%',
        open: function ()
        {
            $(".ui-dialog-titlebar").hide();
            $('.dialog-div-close').on('click', function () {
                modal.dialog('close');
            });
        },
    });

    $(".btnOpen").on("click", function () {
        $(".notification").dialog("open");
    });
} );

$( function() {
    $( ".tabs" ).tabs();
} );

$(function () {
    $(".selectmenu").selectmenu();
});




// UPLOAD PHOTO
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

// SUMMERNOTE
$(document).ready(function() {
    $('#summernote').summernote({
        placeholder: 'write something...',
        height: 300,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true,
        styleTags:['p','blockquote', 'h3', 'h4', 'h5', 'h6'],
        toolbar: [
            ['style',['style']],
            // ['style', ['blockquote']],
            ['font', ['bold', 'italic']],
            ['insert', ['link', 'picture']],
            ['para', ['ul', 'ol', 'paragraph']]
        ]
    });
});
// BUTTON LIKE
$('.btn-like').on('click', function () {
    var icon = $('.fa');
    var span = $('span.number-likes');
    if (icon.hasClass('fa-heart-o')) {
        icon.removeClass('fa-heart-o');
        icon.addClass('fa-heart');
        $(this).find(span).html(parseInt($(this).find(span).html()) - 1);
    } else {
        icon.addClass('fa-heart-o');
        icon.removeClass('fa-heart');
        $(this).find(span).html(parseInt($(this).find(span).html()) + 1);
    }
});

// TAGS
$('.tag_name').on('click', function () {
    $(this).toggleClass('active');
});
// CALENDAR
$( function() {
    $( ".datepicker" ).datepicker();
} );