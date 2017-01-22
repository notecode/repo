$(function () {
    console.log('xx');

    $('#myForm').ajaxForm({
		dataType: "json",
		xhrFields: {
		 	withCredentials: true
		},
		success: function(json, status, xhr) {
			olog("[<resp]: ", json);
		},
		error: function(xhr, status, thrown) {
			tlog("[!err!]: status: " + status + ", msg: " + thrown);
		}
    }); 
})
