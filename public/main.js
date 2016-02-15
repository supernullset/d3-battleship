(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = build_board;
function build_board(targetId, gridSize) {
    var gridDefinition = [];
    for (var yOrigin = 0, i = 0; i < gridSize; i++) {
        for (var xOrigin = 0, j = 0; j < gridSize; j++) {
            gridDefinition.push({
                x: xOrigin * 50,
                y: yOrigin * 50,
                width: 50,
                height: 50,
                index: [i, j]
            });
            xOrigin++;
        }
        yOrigin++;
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
    }).on('click', function () {
        d3.select(this).style("fill", "#CC3300");
    }).style("fill", '#FFF').style("stroke", '#555');
}

build_board("#board", 6);

},{}]},{},[1]);