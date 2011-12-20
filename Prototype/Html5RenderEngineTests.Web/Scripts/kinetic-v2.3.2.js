/**
 * KineticJS JavaScript Library v2.3.2
 * http://www.kineticjs.com/
 * Copyright 2011, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Dec 01 2011
 *
 * Copyright (C) 2011 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Kinetic = {};

/****************************************
 * Stage
 */
Kinetic.Stage = function(containerId, width, height){
    this.container = document.getElementById(containerId);
    this.width = width;
    this.height = height;
    this.shapes = [];
    this.zIndexCounter = 9999;
    this.idCounter = 0;
    this.dblClickWindow = 400; // ms
    // desktop flags
    this.mousePos = null;
    this.mouseDown = false;
    this.mouseUp = false;
    
    // mobile flags
    this.touchPos = null;
    this.touchStart = false;
    this.touchEnd = false;
    
    // add stage canvas
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.id = 0;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = 'absolute';
    this.container.appendChild(this.canvas);
    
    this.listen();
};

/*
 * clear stage canvas
 */
Kinetic.Stage.prototype.clear = function(){
    var context = this.getContext();
    var canvas = this.getCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};

/*
 * clear stage canvas and all shape canvases
 */
Kinetic.Stage.prototype.clearAll = function(){
    // clear stage
    this.clear();
    
    // clear shapes
    for (var n = 0; n < this.shapes.length; n++) {
        this.shapes[n].clear();
    }
};

/*
 * draw all shapes
 */
Kinetic.Stage.prototype.drawAll = function(){
    // draw shapes
    for (var n = 0; n < this.shapes.length; n++) {
        this.shapes[n].draw();
    }
};

/*
 * remove a shape from the stage
 */
Kinetic.Stage.prototype.remove = function(shape){
    var shapes = this.shapes;
    
    // remove canvas
    this.container.removeChild(shape.getCanvas());
    
    // remove from shapes array
    for (var n = 0; n < shapes.length; n++) {
        var id = shapes[n].id;
        if (id == shape.id) {
            this.shapes.splice(n, 1);
        }
    }
};

/*
 * remove all shapes from the stage
 */
Kinetic.Stage.prototype.removeAll = function(){
    // remove all shapes
    while (this.shapes.length > 0) {
        var that = this;
        this.remove(that.shapes[0]);
    }
};

/*
 * get stage canvas
 */
Kinetic.Stage.prototype.getCanvas = function(){
    return this.canvas;
};

/*
 * get stage context
 */
Kinetic.Stage.prototype.getContext = function(){
    return this.context;
};

/*
 * add event listener to stage (which is essentially
 * the container DOM)
 */
Kinetic.Stage.prototype.addEventListener = function(type, func){
    this.container.addEventListener(type, func);
};

/*
 * add shape to stage
 */
Kinetic.Stage.prototype.add = function(shape){
    shape.stage = this;
    shape.canvas = document.createElement('canvas');
    shape.context = shape.canvas.getContext('2d');
    shape.id = ++this.idCounter;
    shape.canvas.width = this.width;
    shape.canvas.height = this.height;
    shape.canvas.style.zIndex = ++this.zIndexCounter;
    shape.canvas.style.position = 'absolute';
    this.container.appendChild(shape.canvas);
    this.shapes.push(shape);
    shape.draw();
};

/*
 * handle incoming event
 */
Kinetic.Stage.prototype.handleEvent = function(evt){
    if (!evt) {
        evt = window.event;
    }
    
    this.setMousePosition(evt);
    this.setTouchPosition(evt);
    var that = this;
    for (var n = this.shapes.length - 1; n >= 0; n--) {
        var pubShape = this.shapes[n];
        
        (function(){
            var shape = pubShape;
            var pos = that.touchPos || that.mousePos;
            var el = shape.eventListeners;
            
            if (pos !== null && shape.context.isPointInPath(pos.x, pos.y)) {
                // handle onmousedown   
                if (that.mouseDown) {
                    that.mouseDown = false;
                    shape.clickStart = true;
                    
                    if (el.onmousedown !== undefined) {
                        el.onmousedown(evt);
                    }
                    
                    n = -1; // break;
                }
                // handle onmouseup & onclick
                else if (that.mouseUp) {
                    that.mouseUp = false;
                    if (el.onmouseup !== undefined) {
                        el.onmouseup(evt);
                    }
                    
                    // detect if click or double click occurred
                    if (shape.clickStart) {
                    
                        if (el.onclick !== undefined) {
                            el.onclick(evt);
                        }
                        
                        if (el.ondblclick !== undefined && shape.inDoubleClickWindow) {
                            el.ondblclick(evt);
                        }
                        
                        shape.inDoubleClickWindow = true;
                        
                        setTimeout(function(){
                            shape.inDoubleClickWindow = false;
                        }, that.dblClickWindow);
                    }
                    
                    n = -1; // break;
                }
                
                // handle onmouseover
                else if (!shape.mouseOver) {
                    shape.mouseOver = true;
                    if (el.onmouseover !== undefined) {
                        el.onmouseover(evt);
                    }
                    
                    n = -1; // break;
                }
                
                // handle onmousemove
                else if (el.onmousemove !== undefined) {
                    el.onmousemove(evt);
                    
                    n = -1; // break;
                }
                
                // handle touchstart
                else if (that.touchStart) {
                    that.touchStart = false;
                    if (el.touchstart !== undefined) {
                        el.touchstart(evt);
                    }
                    
                    n = -1; // break;
                }
                
                // handle touchend
                else if (that.touchEnd) {
                    that.touchEnd = false;
                    if (el.touchend !== undefined) {
                        el.touchend(evt);
                    }
                    
                    n = -1; // break;
                }
                
                // handle touchmove
                else if (!that.touchMove) {
                    if (el.touchmove !== undefined) {
                        el.touchmove(evt);
                    }
                    
                    n = -1; // break;
                }
            }
            // handle mouseout condition
            else if (shape.mouseOver) {
                shape.mouseOver = false;
                if (el.onmouseout !== undefined) {
                    el.onmouseout(evt);
                }
                
                n = -1; // break;
            }
        }());
    }
};

/*
 * begin listening for events by adding event handlers
 * to the container
 */
Kinetic.Stage.prototype.listen = function(){
    var that = this;
    
    // desktop events
    this.container.addEventListener("mousedown", function(evt){
        that.mouseDown = true;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mousemove", function(evt){
        that.mouseUp = false;
        that.mouseDown = false;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mouseup", function(evt){
        that.mouseUp = true;
        that.mouseDown = false;
        that.handleEvent(evt);
        
        // clear all click starts
        for (var i = 0; i < that.shapes.length; i++) {
            that.shapes[i].clickStart = false;
        }
    }, false);
    
    this.container.addEventListener("mouseover", function(evt){
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mouseout", function(evt){
        that.mousePos = null;
    }, false);
    
    // mobile events
    this.container.addEventListener("touchstart", function(evt){
        evt.preventDefault();
        that.touchStart = true;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("touchmove", function(evt){
        evt.preventDefault();
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("touchend", function(evt){
        evt.preventDefault();
        that.touchEnd = true;
        that.handleEvent(evt);
    }, false);
};

/*
 * get mouse position for desktop apps
 */
Kinetic.Stage.prototype.getMousePos = function(evt){
    return this.mousePos;
};

/*
 * get touch position for mobile apps
 */
Kinetic.Stage.prototype.getTouchPos = function(evt){
    return this.touchPos;
};

/*
 * set mouse positon for desktop apps
 */
Kinetic.Stage.prototype.setMousePosition = function(evt){
    var mouseX = evt.clientX - this.getContainerPos().left + window.pageXOffset;
    var mouseY = evt.clientY - this.getContainerPos().top + window.pageYOffset;
    this.mousePos = {
        x: mouseX,
        y: mouseY
    };
};

/*
 * set touch position for mobile apps
 */
Kinetic.Stage.prototype.setTouchPosition = function(evt){
    if (evt.touches !== undefined && evt.touches.length == 1) { // Only deal with
        // one finger
        var touch = evt.touches[0];
        // Get the information for finger #1
        var touchX = touch.clientX - this.getContainerPos().left + window.pageXOffset;
        var touchY = touch.clientY - this.getContainerPos().top + window.pageYOffset;
        
        this.touchPos = {
            x: touchX,
            y: touchY
        };
    }
};

/*
 * get container position
 */
Kinetic.Stage.prototype.getContainerPos = function(){
    var obj = this.container;
    var top = 0;
    var left = 0;
    while (obj.tagName != "BODY") {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {
        top: top,
        left: left
    };
};

/*
 * get container DOM element
 */
Kinetic.Stage.prototype.getContainer = function(){
    return this.container;
};

/****************************************
 * Shape
 */
Kinetic.Shape = function(drawFunc){
    this.drawFunc = drawFunc;
    this.x = 0;
    this.y = 0;
    this.scale = {
        x: 1,
        y: 1
    };
    this.rotation = 0; // radians
    this.eventListeners = {};
    this.mouseOver = false;
    this.clickStart = false;
    this.inDblClickWindow = false;
};

/*
 * get stage
 */
Kinetic.Shape.prototype.getStage = function(){
    return this.stage();
};

/*
 * draw shape
 */
Kinetic.Shape.prototype.draw = function(args){
    var context = this.getContext();
    this.clear();
    context.save();
    
    if (this.x !== 0 || this.y !== 0) {
        context.translate(this.x, this.y);
    }
    if (this.rotation !== 0) {
        context.rotate(this.rotation);
    }
    if (this.scale.x != 1 || this.scale.y != 1) {
        context.scale(this.scale.x, this.scale.y);
    }
    
    this.drawFunc(args);
    context.restore();
};

/*
 * get shape canvas
 */
Kinetic.Shape.prototype.getCanvas = function(){
    return this.canvas;
};

/*
 * get shape context
 */
Kinetic.Shape.prototype.getContext = function(){
    return this.context;
};

/*
 * set shape canvas scale
 */
Kinetic.Shape.prototype.setScale = function(scale){
    this.scale.x = scale;
    this.scale.y = scale;
};

/*
 * clear shape canvas
 */
Kinetic.Shape.prototype.clear = function(){
    var context = this.getContext();
    var canvas = this.getCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};

/*
 * add event listener to shape
 */
Kinetic.Shape.prototype.addEventListener = function(type, func){
    var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
    this.eventListeners[event] = func;
};

/*
 * move shape canvas to the top via z-index
 */
Kinetic.Shape.prototype.moveToTop = function(){
    var stage = this.stage;
    // remove shape from shapes
    for (var n = 0; n < stage.shapes.length; n++) {
        var reg = stage.shapes[n];
        if (reg.id == this.id) {
            stage.shapes.splice(n, 1);
            stage.shapes.push(this);
            break;
        }
    }
    
    // reorder canvases
    for (var n = 0; n < stage.shapes.length; n++) {
        var reg = stage.shapes[n];
        reg.getCanvas().style.zIndex = ++stage.zIndexCounter;
    }
};

/****************************************
 * drawImage util
 * This util function draws a rectangular shape
 * over a canvas image to provide a detectable path
 */
Kinetic.drawImage = function(imageObj, x, y, width, height){
    if (!width) {
        width = imageObj.width;
    }
    if (!height) {
        height = imageObj.height;
    }
    return function(){
        var context = this.getContext();
        context.drawImage(imageObj, x, y, width, height);
        context.beginPath();
        context.rect(x, y, width, height);
        context.closePath();
    };
};






