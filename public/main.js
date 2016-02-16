(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handle_click = handle_click;
exports.place_ship = place_ship;
exports.assign_ship_placement = assign_ship_placement;
exports.build_board = build_board;
function handle_click(element, hit_boxes) {
    var status_color = undefined;
    var hit_color = "#75AF1D";
    var miss_color = "#CC3300";
    var cell = d3.select(element);

    if (hit_boxes.indexOf(cell.attr("index")) != -1) {
        status_color = hit_color;
    } else {
        status_color = miss_color;
    }
    cell.style("fill", status_color);
}

function place_ship(ship, occupied) {
    var ship_placed = false;
    var ship_length = ship[0];
    var bad_canidates = [];
    var vertical = false;
    var r = Math.round(Math.random() * 10);

    var is_viable_point = function is_viable_point(x, y) {
        var point = [x, y].toString();
        return occupied.indexOf(point) == -1 && bad_canidates.indexOf(point) == -1;
    };

    if (r <= 5) {
        vertical = true;
    }

    while (ship_placed == false) {
        var start_x = Math.round(Math.random() * 9);
        var start_y = Math.round(Math.random() * 9);

        // if the guess cell is occupied, try again
        if (!is_viable_point(start_x, start_y)) {
            continue;
        }

        var placement_direction = undefined;
        var _r = Math.round(Math.random() * 9);

        // Search for canidates for placing a ship
        if (vertical) {
            // Account for vertical placement
            if (start_x + ship_length > 9) {
                continue;
            } else {
                var is_placeable = true;
                for (var i = 0; i < ship_length; i++) {
                    if (!is_viable_point(start_x + i, start_y)) {
                        is_placeable = false;
                    }
                }
                if (is_placeable == true) {
                    for (var i = 0; i < ship_length; i++) {
                        var cell = [start_x + i, start_y].toString();
                        occupied.push(cell);
                    }
                    ship_placed = true;
                }
            }

            if (start_x - ship_length < 0) {
                continue;
            } else {
                var is_placeable = true;
                for (var i = 0; i < ship_length; i++) {
                    if (!is_viable_point(start_x - i, start_y)) {
                        is_placeable = false;
                    }
                }
                if (is_placeable == true) {
                    for (var i = 0; i < ship_length; i++) {
                        var cell = [start_x - i, start_y].toString();
                        occupied.push(cell);
                    }
                    ship_placed = true;
                }
            }
        } else {
            if (start_y + ship_length > 9) {
                continue;
            } else {
                var is_placeable = true;
                for (var i = 0; i < ship_length; i++) {
                    if (!is_viable_point(start_x, start_y + i)) {
                        is_placeable = false;
                    }
                }
                if (is_placeable == true) {
                    for (var i = 0; i < ship_length; i++) {
                        var cell = [start_x, start_y + i].toString();
                        occupied.push(cell);
                    }
                    ship_placed = true;
                }
            }

            if (start_y - ship_length < 0) {
                break;
            } else {
                var is_placeable = true;
                for (var i = 0; i < ship_length; i++) {
                    if (is_viable_point(start_x, start_y - i)) {
                        is_placeable = false;
                    }
                }
                if (is_placeable == true) {
                    for (var i = 0; i < ship_length; i++) {
                        var cell = [start_x, start_y - i].toString();
                        occupied.push(cell);
                    }
                    ship_placed = true;
                }
            }
        }
    }
    return;
}

function assign_ship_placement(gridSize) {

    //assume initial state is horizontal
    var ship_dimensions = [[5, 1], [4, 1], [3, 1], [3, 1], [3, 1]];
    var occupied = [];

    ship_dimensions.forEach(function (ship) {
        place_ship(ship, occupied);
    });

    return occupied;
}

function build_board(targetId, gridSize) {
    var gridDefinition = [];
    var hit_boxes = assign_ship_placement(gridSize);
    var order = 0;
    for (var yOrigin = 0, i = 0; i < gridSize; i++) {
        for (var xOrigin = 0, j = 0; j < gridSize; j++) {
            gridDefinition.push({
                x: xOrigin * 50,
                y: yOrigin * 50,
                width: 50,
                height: 50,
                index: [i, j].toString(),
                order: order
            });
            xOrigin++;
            order++;
        }
        yOrigin++;
        order++;
    }

    var canvas = d3.select(targetId).append("svg").attr("width", 500).attr("height", 500);

    var board = canvas.selectAll(".board").data([gridDefinition]).enter().append("svg:g").attr("class", "board");

    var cells = board.selectAll(".cell").data(gridDefinition).enter().append("svg:rect").attr("x", function (d) {
        return d.x;
    }).attr("y", function (d) {
        return d.y;
    }).attr("width", function (d) {
        return d.width;
    }).attr("height", function (d) {
        return d.height;
    }).attr("index", function (d) {
        return d.index;
    }).on('click', function () {
        handle_click(this, hit_boxes);
    }).style("fill", '#FFF').style("stroke", '#555');
}

build_board("#board", 10);

},{}]},{},[1]);
