(function(){
    $('#bookList th').on('click',function(){
        let search = $('#searchBook').val();
        let sortBy = $(this).data('sort');
        let iconUp = `<span class="glyphicon glyphicon-chevron-up pull-right"></span>`;
        let iconDown = `<span class="glyphicon glyphicon-chevron-down pull-right"></span>`;
        let head = $('#bookList th');
        let order;
        var length = $(this).prevAll().length;
        if(sortBy !=undefined ){
            if($(this).find("span").hasClass('glyphicon-chevron-down')){
                head.find("span").remove();
                $(this).append(iconUp)
                order = -1;
            }else{
                head.find("span").remove();
                $(this).append(iconDown)
                order = 1
            }
            sortTable(order,length)
        }
    })
    $('#searchBook').keyup(function(){
        const count = 3;
        let find = $(this).val();
        search(count,find)
    })
    $('#bookPerPage').click(function(){
        let count = $(this).data('count')
            count = parseInt(count) + 3;
            $(this).data('count',count);
            find = $('#searchBook').val();
            search(count,find);
            
    })
    function sortTable(f,n){
        var rows = $('#bookList tbody  tr').get();
    
        rows.sort(function(a, b) {
    
            var A = getVal(a);
            var B = getVal(b);
    
            if(A < B) {
                return -1*f;
            }
            if(A > B) {
                return 1*f;
            }
            return 0;
        });
    
        function getVal(elm){
            var v = $(elm).children('td').eq(n).text().toUpperCase();
            if($.isNumeric(v)){
                v = parseInt(v,10);
            }
            return v;
        }
    
        $.each(rows, function(index, row) {
            $('#bookList').children('tbody').append(row);
        });
    }
    

    function search(bookPerPage = 3,search = ''){   
        let send = `books=${bookPerPage}&search=${search}`     
        $.ajax({
            url: '/book/allbooks',
            type: 'GET',
            contentType: 'application/json',
            data: send,
            success: function (response) {
                $('#bookList tbody').html('');
                $.each(response.books, function(i, item) {
                    const edit = (item.editable)? `<button class="btn button-primary" data-viewId="${item.id}" data-condition="edit" data-toggle="modal" data-target="#myModal">Edit</button> `:'';
                    $('#bookList tbody').append(`<tr><td>${i+1}</td>
                    <td>${item.name}</td>
                    <td>${item.publisher}</td>
                    <td>${item.author.firstname} ${item.author.lastname}</td>
                    <td>${item.price}</td>
                    <td>${item.genere}</td>
                    <td>${edit}<button class="btn btn-primary" data-viewId="${item.id}" data-condition="view" data-toggle="modal" data-target="#myModal">View</button>
                    </td></tr>`)
                });
                if(response.count >= response.total){
                    $('#bookPerPage').hide();
                    response.count = response.total
                }
                $('#leftComment').html(`Showing 1 to ${response.count} of ${response.total} entries`)
                if(response.count >= response.total){$('#bookPerPage').hide();}else{$('#bookPerPage').show();}
            }
        });
    }
search();
})()