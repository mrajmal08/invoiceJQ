
var $ = jQuery;
$(document).ready(function () {
    $('#addRowItem').on('click', function () {
        var itemCloned = $('.toCloneItem tr').clone();
        $('.item').eq(-2).after(itemCloned);
        removeItem();
    })
});

function removeItem() {
    $('.deleteBtn').on('click', function () {
        $(this).closest('tr').remove();
    })
}
