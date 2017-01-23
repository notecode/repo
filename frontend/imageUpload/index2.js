$(function () {
    console.log('xx');

//    $('#myForm').ajaxForm({
//		dataType: "html",
//		xhrFields: {
//		 	withCredentials: true
//		},
//		success: function(json, status, xhr) {
//			olog("[<resp]: ", json);
//		},
//		error: function(xhr, status, thrown) {
//			tlog("[!err!]: status: " + status + ", msg: " + thrown);
//		}
//    }); 

    $('#myForm').on('submit', function(e) {
        e.preventDefault(); // prevent native submit

        $(this).ajaxSubmit({
            dataType: "html",
            success: function(json, status, xhr) {
                olog("[<resp]: ", json);
            },
            error: function(xhr, status, thrown) {
                tlog("[!err!]: status: " + status + ", msg: " + thrown);
            }
        })
    });
})
