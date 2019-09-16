let searchType = 's';
let searchString;
let category = 'Titles';

$(document).ready(() => {

    imdbApiKey = '42885b99';

    $('#section1').hide();
    $('#section2').hide();
    // getAllDetails();
}); // end document.ready function


let setSearchType = (type) => {
    searchType = type;
    if (type == 't') {
        category = 'Title'
        $('#btnName').text('Title')
    } 
    if (type == 'i') {
        category = 'IMDb Id'
        $('#btnName').text('IMDb Id')
    }
    if (type == 'movie') {
        category = 'Movies'
        $('#btnName').text('Movies')
    }
    if (type == 'series') {
        category = 'Series'
        $('#btnName').text('Series')
    }

}

let search = () => {
    if(searchType === 'i')
    {
        getDetailsById();
    }
    else
    {
        getSearchDetails();    
    }
}

let getAllDetailsByTitle = (title,year) => {

    let url1 = 'https://www.omdbapi.com/?t='+title+'&y='+year+'&apikey=' + imdbApiKey;
    console.log(url1)
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: url1,

        
        success: (response) => {
            
            console.log(response.Response)

            if(response.Response === 'False')
            {
                alert(response.Error);
                return;
            }

            $('#section1').hide();
            $('#section2').show();
            

            let imgSrc = response.Poster;
            $('#poster').attr("src",imgSrc);
            $('#plot').html(response.Plot);
            $('#headTitle').html(response.Title);
            $('#headYear').html(`(${response.Year})`);
            
            $('#director').html(response.Director);
            $('#writer').html(response.Writer);
            $('#cast').html(response.Actors);
            
            let time = response.Runtime;
            console.log('Time '+ time)
            let srt = time.split(' ');

            var rhours,rminutes;
            function timeConvert(n) {
                var num = n;
                var hours = (num / 60);
                rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                rminutes = Math.round(minutes);
                return rhours + "h and " + rminutes + "min";
                }

            console.log(timeConvert(srt[0]))
            $('#base2').html(timeConvert(srt[0]));
            $('#base3').html(response.Genre);
            $('#base4').html(response.Released);

            console.log(response);
        },
        error: (response) => {
            alert("Some Error Occured")
        }
    });
}


let getSearchDetails = () => {

    let searchText = $('#searchText').val();
    let year = $('#year').val();
    console.log('YEAR : ' + year)
    console.log('Type : '+searchType)
    let url1;
    if(searchType === undefined || searchType === '' || searchType === null &&
    year === undefined || year === '' || year === null) 
    {
        url1 = 'https://www.omdbapi.com/?s='+searchText+'&apikey=' + imdbApiKey;
        
    }
    else if(year === undefined || year === '' || year === null) 
    {
        url1 = 'https://www.omdbapi.com/?s='+searchText+'&type='+searchType+'&apikey=' + imdbApiKey;
    }
    else if(searchType === undefined || searchType === '' || searchType === null || searchType ==='s' || searchType === 't')
    {
        url1 = 'https://www.omdbapi.com/?s='+searchText+'&y='+year+'&apikey=' + imdbApiKey;
    }
    else
    {
        url1 = 'https://www.omdbapi.com/?s='+searchText+'&type='+searchType+'&y='+year+'&apikey=' + imdbApiKey;
    }
    
    console.log(url1)

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: url1,

        success: (response) => {

            console.log(response)

            if(response.Response === 'False')
            {
                alert(response.Error);
                return;
            }


            $('#section2').hide();
            $('#section1').show();
            let searchResult = response.Search;
            
            $('#head').empty();

            let tempRow1 = `<h5>Results for "${searchText}"</h5>
                                <p>Search Category : ${category}</p>
                            <h5 style="color: rgb(172, 147, 7)">Titles</h5>`
            $('#head').append(tempRow1);

            $('#title').empty();
            var idCount = 0;
            for (result of searchResult) 
            {
                
                if (result.Poster !== "N/A") 
                {
                    idCount++;
                    let tempRow = $(`<div id="card1" class="col-12 ">
                                       <div class="row "> 
                                            <div>
                                                <img src=${result.Poster} style="width:33px"  alt="...">
                                            </div>
                                        
                                            <div id="name" style="margin-left: 5px">
                                                 <a href='#' id="myLink">${result.Title}</a> <span>(${result.Year})</span>
                                            </div>
                                        </div>
                                    </div>`).on('click',function(){
                                        let title = $(this).find("a").html();
                                        var res = $(this).find("span").html();
                                        var year = res.replace('(',"").replace(')',"");
                                        console.log("Link : "+title)
                                        console.log("Year : "+year)
                                        
                                        getAllDetailsByTitle(title,year);
                                    })
                    $('#title').append(tempRow);
                }
            }

        },
        error: (response) => {
            alert("Some Error Occured")
        }
    });
}


let getDetailsById = () => {

    let searchId = $('#searchText').val();
    
    let url1 = 'https://www.omdbapi.com/?i='+searchId+'&apikey=' + imdbApiKey;
    
    console.log(url1)


    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: url1,

        
        success: (response) => {
            
            console.log(response.Response)

            if(response.Response === 'False')
            {
                alert(response.Error);
                return;
            }

            $('#section1').hide();
            $('#section2').show();
            

            let imgSrc = response.Poster;
            $('#poster').attr("src",imgSrc);
            $('#plot').html(response.Plot);
            $('#headTitle').html(response.Title);
            $('#headYear').html(`(${response.Year})`);
            
            $('#director').html(response.Director);
            $('#writer').html(response.Writer);
            $('#cast').html(response.Actors);
            
            let time = response.Runtime;
            console.log('Time '+ time)
            let srt = time.split(' ');

            var rhours,rminutes;
            function timeConvert(n) {
                var num = n;
                var hours = (num / 60);
                rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                rminutes = Math.round(minutes);
                return rhours + "h and " + rminutes + "min";
                }

            console.log(timeConvert(srt[0]))
            $('#base2').html(timeConvert(srt[0]));
            $('#base3').html(response.Genre);
            $('#base4').html(response.Released);

            console.log(response);
        },
        error: (response) => {
            alert("Some Error Occured")
        }
    });
}
