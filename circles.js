function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

var center_coords = {
    x: 550,
    y: 400,
}

var pauseValues = {};

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// add div to body
$(document).ready(function () {
    // updating href for the download
    $('#prijavisebtn').attr("href",window.location + "api/prijavise.php")

    // adding div for the content
    $("#content_area").append($("<div>").addClass("center").attr("id", "animation"));

    // define area to append the circles
    var svg = d3.select("#animation").append("svg")
        .attr("width", 1100)
        .attr("height", 800);

    // adding circles
    function add_bg_circle(r) {
        svg.append("circle")
            .style("stroke", "#fae8db")
            .style("stroke-width", "0.3")
            .style("fill", "none")
            .attr("r", r)
            .attr("cx", center_coords.x)
            .attr("cy", center_coords.y);
    }

    // 4 background rings
    add_bg_circle(325);
    add_bg_circle(300);
    add_bg_circle(240);
    add_bg_circle(100);


    // addFinalAnimation(svg);
    if (moment().unix() > 1597453200) {
        addFinalAnimation(svg);
    } else {
        API.apiCall(window.location.href + "api/bendovi.php", []).then(
            x => {
                addCirclesToAnimation(svg, x);
            });
    }

});

function addFinalAnimation(svg) {
    var circle = svg.append("circle")
        .attr("id", 'final_circle')
        .attr("cx", center_coords.x) //Starting x
        .attr("cy", center_coords.y) //Starting y
        .attr("r", 280)


    function final_transition() {
        circle
            .transition()        // apply a transition
            .duration(2000)      // apply it over 2000 milliseconds
            .attr('r', 325)     // move the circle to 920 on the x axis
            .transition()        // apply a transition
            .duration(2000)      // apply it over 2000 milliseconds
            .attr('r', 280)      // return the circle to 40 on the x axis
            .on("end", final_transition);  // when the transition finishes start again
    }

    final_transition();
}

function getTestData(noOfCircle){
    var test_data = [];
    for (var i = 1; i <= noOfCircle; i++) {
        test_data.push({
            "id": i,
            "naziv": "Neki bend " + i,
            "grad": "Banja Luka"
        })
    }
    return test_data;
}


function addCirclesToAnimation(svg, data) {

    // data = getTestData(200);

    let circles_no = data.length;
    let max_allowed_r_path = 300;

    // radiuses
    for (var i = 0; i < circles_no; i++) {

        // for over 20 -> default min and max values
        var min_r = 10;
        var max_r = 22;

        if (circles_no <= 10) {
            min_r = 30;
            max_r = 50
        } else if (circles_no > 10 && circles_no <= 50) {
            min_r = 20;
            max_r = 40;
        } else if (circles_no > 50 && circles_no <= 150) {
            min_r = 10;
            max_r = 30;
        }

        var r = Math.floor(Math.random() * (max_r - min_r) + min_r);

        var min_r_path = r;
        var max_r_path = max_allowed_r_path - r;

        var r_path = Math.floor(Math.random() * (max_r_path - min_r_path) + min_r_path);

        var min_duration = 30000;
        var max_duration = 80000;
        var duration = Math.random() * (max_duration - min_duration) + min_duration;

        addCircle(svg, r_path, r, duration, data[i]);

        // random r
    }
}

function addHover(svg, circle, circle_data) {
    // clear any other hovers
    removeHoverBox();

    var band = circle_data.naziv;
    var city = circle_data.grad;
    var hover_box_animation_duration = 250;
    var path_between_circle_and_hover = 350;
    if (window.mobileCheck()){
        // by mobile devices max
        path_between_circle_and_hover = 300;
    }


    var numberOfLines = Math.ceil(band.length / 19);

    var circle_pos_x = parseFloat($(circle.node()).attr('transform').match(/translate\((\d*\.?\d*,\d*\.?\d*)\)/)[1].split(',')[0]);
    var circle_pos_y = parseFloat($(circle.node()).attr('transform').match(/translate\((\d*\.?\d*,\d*\.?\d*)\)/)[1].split(',')[1]);

    var diffX = circle_pos_x - center_coords.x;
    var diffY = circle_pos_y - center_coords.y;

    var angle = Math.atan2(diffX, diffY);
    var spawn_y = center_coords.y + path_between_circle_and_hover * Math.cos(angle);
    var spawn_x = center_coords.x + path_between_circle_and_hover * Math.sin(angle);

    var rect_spawn_x = spawn_x;
    var rect_spawn_y = spawn_y;

    var rect_width = 200;
    var rect_height = 40 + ((numberOfLines - 1) * 19);

    if (angle <= 4 && angle >= 1.5) {
        // top-right
        rect_spawn_y = spawn_y - rect_height;
    } else if (angle <= 1.5 && angle >= 0) {
        // bottom-right
    } else if (angle <= 0 && angle >= -1.5) {
        // bottom-left
        rect_spawn_x = spawn_x - rect_width;
    } else if (angle <= -1.5 && angle >= -4) {
        // top-left
        rect_spawn_x = spawn_x - rect_width;
        rect_spawn_y = spawn_y - rect_height;
    }

    // adding g box for rect and text
    var bar = svg.append("g")
        .style("fill", "transparent")
        .attr("class", "hover_" + circle.node().id.split('circle_')[1])
        .attr("transform", function (d, i) {
            return "translate(" + rect_spawn_x + "," + rect_spawn_y + ")";
        });

    // appending line to svg (g is only box)
    var data = [
        {x: circle_pos_x, y: circle_pos_y},
        {x: spawn_x, y: spawn_y}
    ]

    var line = d3.line()
        .x(d => d.x)
        .y(d => d.y)

    let path = svg.append("path")
        .attr("d", line(data))
        .attr("stroke", "black")
        .attr("stroke-width", "1.5")
        .attr("class", "line")
        .attr("fill", "none");

    d3.select('path').raise();
    circle.raise();

    path.node().classList.add("hover_" + circle.node().id.split('circle_')[1]);
    var totalLength = path.node().getTotalLength()


    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(hover_box_animation_duration)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)

    // appending rectangle to box
    bar.append("rect")
        .attr("width", rect_width)
        .attr("height", rect_height);

    // animating rectangle and adding text in callback fn
    bar.append("rect")
        .style("fill", "#fce8da")
        .style("stroke", "black")
        .style("stroke-width", "2")
        .attr("width", rect_width * 0.3)
        .attr("height", rect_height)
        .transition()
        .duration(hover_box_animation_duration)
        .attr("width", rect_width)
        .on("end", function () {
            bar.append("text")
                .style("fill", "black")
                .style("font-size", "16px")
                .style("font-family", "Roboto")
                .style("text-transform", "uppercase")
                .attr("x", 4)
                .attr("y", 13)
                .attr("dy", ".35em")
                .text(band)
                .call(wrap, rect_width);


            bar.append("text")
                .style("fill", "black")
                .style("font-size", "11px")
                .style("font-family", "Roboto")
                .style("text-transform", "uppercase")
                .style("font-weight", "800")
                .attr("x", 4)
                .attr("y", rect_height - 8)
                .attr("dy", ".35em")
                .text(city);


            bar.append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .attr("x1", 0)     // x position of the first end of the line
                .attr("y1", rect_height - 17)      // y position of the first end of the line
                .attr("x2", rect_width)     // x position of the second end of the line
                .attr("y2", rect_height - 17);    // y position of the second end of the line
        });
}

function addCircle(svg, pathR, circleR, duration, circle_data) {

    var domID = circle_data.id;
    var circleID = 'circle_' + domID;
    var pathID = 'path_' + domID;

    var random_spawning_time = Math.random() * (1 - 0.00001) + 0.00001;

    pauseValues[domID + '_lastT'] = random_spawning_time;
    pauseValues[domID + '_currentT'] = random_spawning_time;

    // var duration = 10000;

    var path = svg.append("circle")
        // .style("stroke", "red")
        .style("stroke-dasharray", [5, 5])
        .style("stroke-width", "1")
        .style("fill", "none")
        .attr("id", pathID)
        .attr("r", pathR)
        .attr("cx", center_coords.x)
        .attr("cy", center_coords.y);

    var circle = svg.append("circle")
        .attr("id", circleID)
        .attr("cx", 0) //Starting x
        .attr("cy", 0) //Starting y
        .attr("r", circleR)

    function circle_transition() {
        var durationLeft = duration - (duration * pauseValues[domID + "_currentT"]);
        circle.transition()
            .duration(durationLeft)
            .ease(d3.easeLinear)
            .attrTween("transform", translateAlong(path.node()))
            .on("end", function () {
                pauseValues[domID + '_lastT'] = 0;
                pauseValues[domID + '_currentT'] = 0;
                circle_transition()
            });
    }

    function translateAlong(path) {
        var l = path.getTotalLength();
        return function (d, i, a) {
            return function (t) {
                // part where the movement happens
                $(".hover_" + path.id.split('path_')[1]).remove(); // always make sure that there is no hover box
                var use = use = ((1 - pauseValues[domID + "_lastT"]) * t) + pauseValues[domID + "_lastT"];
                pauseValues[domID + "_currentT"] = use;
                var p = path.getPointAtLength(use * l);
                return "translate(" + p.x + "," + p.y + ")";
            };
        };
    }


    d3.select('#' + circleID).on('mouseover', function (d, i) {
        circle.transition().duration(0);
        d3.select('#' + circleID).raise();
        setTimeout(function () {
            pauseValues[domID + "_lastT"] = pauseValues[domID + "_currentT"];
            addHover(svg, circle, circle_data);
        }, 100);
    });

    d3.select('#' + circleID).on('mouseout', function (d, i) {
        // $('#'+circleID).css('z-index', 100);
        removeHoverBox();

        setTimeout(function () {
            ($("#hover_" + circleID.split('circle_')[1]).length > 0)
            {
                circle_transition(); // add 1 second wait before continue moving
            }

        }, 1000);
    });

    circle_transition();

}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 4).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 4).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

function removeHoverBox() {
    $('path').each(function () {
        $(this).remove();
    });
    $('g').each(function () {
        if ($(this).attr('class').match(/hover_*/)) {
            $(this).remove();
        }
    });
}


API = (function () {

    const buildUrl = (url, params) => url + params.map(x => x.id + '=' + x.value).join('&');

    return {

        apiCall: function (apiUrl, params) {

            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                let requestUrl = buildUrl(apiUrl, params);

                request.open("GET", requestUrl);
                request.onload = function () {
                    try {
                        if (this.status === 200) {
                            const json = JSON.parse(this.response);
                            resolve(json);
                        } else {
                            const status_code = this.status.toString();
                            reject(status_code);
                        }
                    } catch (e) {
                        console.log(request, e, 'Promise rejected');
                        resolve();
                    }
                };
                request.onerror = function () {
                    reject(this.status + " " + this.statusText);
                };
                request.send();
            });
        },
    };
}());
