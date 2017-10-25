$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('#example tfoot th.searchable').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );
 
    // DataTable
    var table = $('#example').DataTable( {
        "ajax": "data/objects.txt",
        "columns": [
            { "data": "test_case_id" },
            { "data": "test_method_name" },
            { "data": "build_id#1" },
            { "data": "build_id#2" },
            { "data": "build_id#3" }
        ],
        "scrollY": 293,
        "scrollX": true,
        "lengthMenu": [[-1], ["All"]],
        "createdRow": function ( row, data, index ) {
            if ( data["build_id#1"]=="PASS" ) {
            	var sel = $($('td', row)[2]);
                sel.addClass('pass');
                sel.attr("data-toggle", "modal");
                sel.attr("data-target", "#myPassModal");
                sel.attr("onClick", "getData(this)");
            }else if ( data["build_id#1"]=="FAIL" ) {
            	var selected = $($('td', row)[2]);
            	selected.addClass('fail');
            	selected.attr("data-toggle", "modal");
            	selected.attr("data-target", "#myModal");
            	selected.attr("onClick", "getData(this)");
            }
            
            if ( data["build_id#2"]=="PASS" ) {
            	var sel = $($('td', row)[3]);
                sel.addClass('pass');
                sel.attr("data-toggle", "modal");
                sel.attr("data-target", "#myPassModal");
                sel.attr("onClick", "getData(this)");
            }else if ( data["build_id#2"]=="FAIL" ) {
            	var selected = $($('td', row)[3]);
            	selected.addClass('fail');
            	selected.attr("data-toggle", "modal");
            	selected.attr("data-target", "#myModal");
            	selected.attr("onClick", "getData(this)");
            }
            
            if ( data["build_id#3"]=="PASS" ) {
            	var sel = $($('td', row)[4]);
                sel.addClass('pass');
                sel.attr("data-toggle", "modal");
                sel.attr("data-target", "#myPassModal");
                sel.attr("onClick", "getData(this)");
            }else if ( data["build_id#3"]=="FAIL" ) {
            	var selected = $($('td', row)[4]);
            	selected.addClass('fail');
            	selected.attr("data-toggle", "modal");
            	selected.attr("data-target", "#myModal");
            	selected.attr("onClick", "getData(this)");
            }
        }
    } );
    
    getData = function(e){
    	console.log(e);
    	selectedTestCaseId = e.parentElement.children[0].innerHTML;
    	$("#selectedCaseId").html(selectedTestCaseId);
    	$("#selectedPassId").html(selectedTestCaseId);
    	$("#testcase_example input").each(function(){
    		if(this.checked == true){
    			this.checked = false;
    		}
    	});
    };
    
    createTicket = function(){
    	var selectedArr = [];
    	$("#testcase_example input").each(function(){
    		if(this.checked == true){
    			selectedArr.push(this.parentElement.parentElement.children[0].innerHTML);
    		}
    	});
    	if(selectedArr.length == 0){
    		alert("Atleast one build Id should be selected...!");
    	}else{
	    	console.log(selectedArr, "::", selectedTestCaseId);
	    	alert("Ticket Created successfully for Test Case ID:"+ selectedTestCaseId+ " and Method Ids: "+selectedArr);
	    	$("table.dataTable.display tbody tr td:nth-child(1)").each(function(){
	    		if(this.innerHTML == selectedTestCaseId){
	    			for(var i=0; i < selectedArr.length;i++){
	    				var num = parseInt(selectedArr[0])+1;
	    				this.parentElement.children[num].style.backgroundColor= "darkgrey";
	    			}
	    		}
	    	});
    	}
    };
    
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that.search( this.value ).draw();
            }
        } );
    });
    
} );