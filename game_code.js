var file = "game_state.json";

function Save(){
    if (fs.existsSync(file)) {
        var readStats = fs.readFileSync(file);
        var stat_list = JSON.parse(readStats);

        var c = document.getElementById("correct").innerHTML
        var w = document.getElementById("wrong").innerHTML
        var js = {correct: c, incorrect: w}
        var result = JSON.stringify(js)
       fs.writeFileSync(file, result, function (err) {
            if (err){
                console.log('Could Not Add!')}
           });
        }
        alert('Example2')
}
function Retrieve(){
    alert('Hi')
}
