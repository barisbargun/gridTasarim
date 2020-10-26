/// <reference path="../typings/index.d.ts" />

$(document).ready(function(){
    let table = $("table");
   

    
    let detailsList = [];

    $.ajax({url: "https://jsonplaceholder.typicode.com/posts",success : function(details){
        detailsList = details;
        for(i=0;i<details.length;i++){
            let userId = details[i].userId;
            let id = details[i].id;
            let title = details[i].title;
            let body = details[i].body;
                
            table.append(`
                <tr id = "s${i}">
                    <td class = "idBox">${userId}</td>
                    <td class = "idBox">${id}</td>
                    <td style = "justify-content: flex-start;" class = "title">${title}</td>
                    <td style = "justify-content: flex-start;" class = "body">${body}</td>
                    <td class = "details js--details">Detaylar</td>
                </tr>
            `)
        }
        $("#detailBoxContainer").height($(document).height());
    }})
    
    setInterval(function(){
        $(".js--details").click(showDetails);
        
    },1000);
    
    $("#search").keydown(searchFunction);
    $("#search").keyup(searchFunction);
    
    function showDetails(e){
        $(".detailsBox").html("");
        let parent = Number((e.target.parentElement.id).replace("s",""));
        let details = Object.entries(detailsList[parent]);
        $("#detailBoxContainer").show();

        for(i=0;i<details.length;i++){
            $(".detailsBox").append(`
                <div>
                    <h3>${details[i][0]}</h3>
                    <p>${details[i][1]}</p>
                </div>
        `);
        }
    }

    $(".close i").click(function(){
        $("#detailBoxContainer").hide()
        
    })

    function searchFunction(){
        let inputValue = $("#search").val();
        let list = $("tr:not(:first-child)");
        for(i=0;i<list.length;i++){
            if(inputValue == ""){list[i].style.display = "flex";
            list[i].children[0].textContent = list[i].children[0].textContent.replace("<mark>","");
            list[i].children[1].textContent = list[i].children[1].textContent.replace("<mark>","");
            list[i].children[2].textContent = list[i].children[2].textContent.replace("<mark>","");
            list[i].children[3].textContent = list[i].children[3].textContent.replace("<mark>","");
        }

            else if(list[i].children[0].textContent.indexOf(inputValue) != -1 || list[i].children[1].textContent.indexOf(inputValue) != -1 || list[i].children[2].textContent.replace(/\n/g," ").indexOf(inputValue) != -1 || list[i].children[3].textContent.replace(/\n/g," ").indexOf(inputValue) != -1){
                list[i].style.display = "flex";
                list[i].children[0].innerHTML = list[i].children[0].textContent.replace(inputValue,"<mark>"+inputValue+"</mark>");
                
                list[i].children[1].innerHTML = list[i].children[1].textContent.replace(inputValue,"<mark>"+inputValue+"</mark>");

                list[i].children[2].innerHTML = list[i].children[2].textContent.replace(inputValue,"<mark>"+inputValue+"</mark>");

                list[i].children[3].innerHTML = list[i].children[3].textContent.replace(inputValue,"<mark>"+inputValue+"</mark>");

            }
            else{
                list[i].children[0].textContent = list[i].children[0].textContent.replace("<mark>","");
                list[i].children[1].textContent = list[i].children[1].textContent.replace("<mark>","");
                list[i].children[2].textContent = list[i].children[2].textContent.replace("<mark>","");
                list[i].children[3].textContent = list[i].children[3].textContent.replace("<mark>","");
                list[i].style.display = "none";
            }
        }
    }
})