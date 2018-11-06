console.log("js scripts loaded");

let nodesUrl = "https://headlight-tournament-4.herokuapp.com/nodes";
let botsUrl = "https://headlight-tournament-4.herokuapp.com/bots";

//GRID
const grid = 20; //for a 20x20 grid
const cssgridsize = 600; //for a 600px grid
const nodesize = cssgridsize / grid; //size for each bot and node

//CREATING NODES FOR THE MINERAL NODES
let nodesCall = new XMLHttpRequest();
nodesCall.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let nodes = data.Nodes;
        // console.log(nodes);
        // for (prop in nodes) {
        //     console.log(nodes[prop]);
        // }

        function results() {
            for (i = 0; nodes.length; i++) {
                let newDiv = document.createElement("div");
                newDiv.setAttribute(
                    "style",
                    `
      left: ${nodes[i].Location.X * grid}px;
      bottom: ${nodes[i].Location.Y * grid}px;
    `
                );
                newDiv.setAttribute("class", "node");
                newDiv.setAttribute("id", "node" + i);
                newDiv.setAttribute(
                    "onClick",
                    `
    document.getElementById('nodeinfo').innerHTML="<h4>NODE INFO</h4>Node Value: ${
        nodes[i].Value
    }</b><br>Claimed By: ${nodes[i].ClaimedBy} <br>";
    `
                );
                document.getElementById("main-grid").appendChild(newDiv);
                console.log("this turn is node" + (i + 1));
            }
        }
        results();
    }
};
nodesCall.open("GET", nodesUrl, true);
nodesCall.send();
//CREATING NODES FOR THE BOTS
let botsCall = new XMLHttpRequest();
botsCall.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let bots = data.Bots;

        function results() {
            for (i = 0; bots.length; i++) {
                let newDiv = document.createElement("div");
                newDiv.setAttribute(
                    "style",
                    `
      left: ${bots[i].Location.X * nodesize}px;
      bottom: ${bots[i].Location.Y * nodesize}px;
    `
                );
                newDiv.setAttribute("class", "bot");
                newDiv.setAttribute("id", "bot" + i);
                newDiv.setAttribute(
                    "onClick",
                    `
    document.getElementById('botinfo').innerHTML="<h4>BOT INFO</h4>Bot Value: ${
        bots[i].Value
    }</b><br>Claimed By: ${bots[i].ClaimedBy} <br>";
    `
                );
                document.getElementById("main-grid").appendChild(newDiv);
                console.log("this turn is robot" + (i + 1));
            }
        }
        results();
    }
};
botsCall.open("GET", botsUrl, true);
botsCall.send();

//UPDATING THE BOTS REGULARLY VIA AJAX

setInterval(function() {
    var updateBotsCall = new XMLHttpRequest();
    updateBotsCall.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
        }

        for (i = 0; i < data.Bots.length; i++) {
            let botnode = document.getElementById(data.Bots[i].Id);
            botnode.setAttribute(
                "style",
                `
        left: ${data.Bots[i].Location.X * nodesize}px;
        bottom: ${data.Bots[i].Location.Y * nodesize}px;
        `
            );
        }
    };
    updateBotsCall.open("GET", botsUrl, true);
    updateBotsCall.send();
}, 1000);
