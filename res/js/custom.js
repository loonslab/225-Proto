$(document).on('click', '.navi', function(){
    var nextId = $(this).parents('.tab-pane').next().attr("id");
    $('[data-target=#'+nextId+']').tab('show');
});

$(document).on('click', '.navi-pre', function(){
    var nextId = $(this).parents('.tab-pane').prev().attr("id");
    $('[data-target=#'+nextId+']').tab('show');
});
