$(function () {
  $('#fileupload').fileupload({
    url: "http://api.xxtao.com/index.php?r=demand/c23", 
    //url: "http://jquery-file-upload.appspot.com/",
    dataType: 'json',
    autoUpload: false,
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    maxFileSize: 999000,
    disableImageResize: false,
    previewMaxWidth: 300,
    previewMaxHeight: 300,
    previewThumbnail: false,
    previewCrop: true,
    //forceIframeTransport: true,
    xhrFields: {
      withCredentials: true
    }
  }).on('fileuploadadd', function (e, data) {
    data.context = $('<div/>').appendTo('#files');
    $.each(data.files, function (index, file) {
      var node = $('<p/>').append($('<span/>'));
      node.appendTo(data.context);

        data.submit().success(function (json, textStatus, jqXHR) {
            olog('[<resp]: ', json);
        }).error(function (jqXHR, textStatus, errorThrown) {
            tlog('upload error: ' + textStatus + ', ' + errorThrown);
        });
    });
  }).on('fileuploadprocessalways', function (e, data) {
    var index = data.index,
      file = data.files[index],
        node = $(data.context.children()[index]);
        if (file.preview) {
          node.prepend('<br>').prepend(file.preview);
        }
  });


//  $('#file-form').fileupload({
//      url: "http://api.xxtao.com/index.php?r=demand/c23", 
//      dataType: 'json',
//      context: $('#file-form')[0]
//  }).always(function () {
//  }).done(function (result) {
//      //$(this).fileupload('option', 'done').call(this, $.Event('done'), {result: result});
//      console.log(result);
//  }); 
                                          
}); 

