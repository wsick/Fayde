/**
 * KineticJS JavaScript Library v3.6.0
 * http://www.kineticjs.com/
 * Copyright 2012, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Jan 18 2012
 *
 * Copyright (C) 2012 by Eric Rowell
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

/*
 * I know, globals suck.  But since Shape objects
 * and Layer objects can exist before adding them to
 * the stage, a global shape id counter is necessary
 */
Kinetic.GLOBALS = {
    shapeIdCounter: 0
};

///////////////////////////////////////////////////////////////////////
////  Link
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

Kinetic.Link = function(shape){
    this.shape = shape;
    shape.link = this;
    this.id = shape.id;
    this.index = undefined;
    
    // thes params are string ids
    this.nextId = undefined;
    this.prevId = undefined;
};

///////////////////////////////////////////////////////////////////////
////  Layer
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

Kinetic.Layer = function(){
    this.shapeIndexCounter = 0;
    this.isListening = true;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    
    //links is an array of links which point to event links
    this.links = [];
    this.linkHash = {};
    
    this.headId = undefined;
    this.tailId = undefined;
};
/*
 * listen or don't listen to events
 */
Kinetic.Layer.prototype.listen = function(isListening){
    this.isListening = isListening;
    
}
/*
 * clear layer
 */
Kinetic.Layer.prototype.clear = function(){
    var context = this.getContext();
    var canvas = this.getCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};
/*
 * get layer canvas
 */
Kinetic.Layer.prototype.getCanvas = function(){
    return this.canvas;
}
/*
 * get layer context
 */
Kinetic.Layer.prototype.getContext = function(){
    return this.context;
}
/*
 * get shapes as an array
 */
Kinetic.Layer.prototype.getShapes = function(){
    var shapes = [];
    for (var n = 0; n < this.links.length; n++) {
        shapes.push(this.links[n].shape);
    }
    return shapes;
};
/*
 * draw all shapes in layer
 */
Kinetic.Layer.prototype.draw = function(){
    this.clear();
    var links = this.links;
    for (var n = 0; n < links.length; n++) {
        var shape = links[n].shape;
        shape.draw(shape.layer);
    }
};
/*
 * add shape
 */
Kinetic.Layer.prototype.add = function(shape){
    shape.id = Kinetic.GLOBALS.shapeIdCounter++;
    shape.layer = this;
    
    var link = new Kinetic.Link(shape);
    // add link to array
    this.links.push(link);
    // add link to hash
    this.linkHash[link.id] = link;
    link.index = this.links.length - 1;
    
    if (shape.isListening) {
        // if tail doesnt exist, add tail and head
        if (this.tailId === undefined) {
            this.tailId = link.id;
            this.headId = link.id;
        }
        // if tail does exist, this means there's at least one link
        else {
            var tail = this.linkHash[this.tailId];
            tail.nextId = link.id;
            link.prevId = tail.id;
            this.tailId = link.id;
        }
    }
};
/*
 * remove a shape from layer
 */
Kinetic.Layer.prototype.remove = function(shape){
    var link = shape.link;
    this.unlink(link);
    this.links.splice(link.index, 1);
    this.linkHash[link.id] = undefined;
    this.setLinkIndices();
};

/*
 * unlink link
 */
Kinetic.Layer.prototype.unlink = function(link){
    // set head if needed
    if (link.id === this.headId) {
        this.headId = link.nextId;
    }
    // set tail if needed
    if (link.id === this.tailId) {
        this.tailId = link.prevId;
    }
    // link prev to next
    if (link.prevId !== undefined) {
        this.linkHash[link.prevId].nextId = link.nextId;
    }
    if (link.nextId !== undefined) {
        this.linkHash[link.nextId].prevId = link.prevId;
    }
    // clear pointers
    link.prevId = undefined;
    link.nextId = undefined;
};
/*
 * set link indices
 */
Kinetic.Layer.prototype.setLinkIndices = function(){
    for (var n = 0; n < this.links.length; n++) {
        this.links[n].index = n;
    }
};
///////////////////////////////////////////////////////////////////////
////  Stage
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

Kinetic.Stage = function(containerId, width, height){
    this.container = document.getElementById(containerId);
    this.width = width;
    this.height = height;
    this.scale = {
        x: 1,
        y: 1
    };
    this.layerIdCounter = 0;
    this.dblClickWindow = 400;
    this.targetShape = {};
    this.clickStart = false;
    
    // desktop flags
    this.mousePos = null;
    this.mouseDown = false;
    this.mouseUp = false;
    
    // mobile flags
    this.touchPos = null;
    this.touchStart = false;
    this.touchEnd = false;
    
    // user defined layers
    this.layers = [];
    
    /*
     * Layer roles
     *
     * buffer - canvas compositing
     * backstage - path detection
     */
    var that = this;
    this.bufferLayer = new Kinetic.Layer();
    this.backstageLayer = new Kinetic.Layer();
    
    // customize back stage context
    var backstageLayer = this.backstageLayer;
    backstageLayer.context.stroke = function(){
    };
    backstageLayer.context.fill = function(){
    };
    backstageLayer.context.fillRect = function(x, y, width, height){
        backstageLayer.context.rect(x, y, width, height);
    };
    backstageLayer.context.strokeRect = function(x, y, width, height){
        that.context.rect(x, y, width, height);
    };
    backstageLayer.context.drawImage = function(){
    };
    backstageLayer.context.fillText = function(){
    };
    backstageLayer.context.strokeText = function(){
    };
    
    this.bufferLayer.getCanvas().style.display = 'none';
    this.backstageLayer.getCanvas().style.display = 'none';
    
    // add buffer layer
    this.bufferLayer.stage = this;
    this.bufferLayer.canvas.width = this.width;
    this.bufferLayer.canvas.height = this.height;
    this.container.appendChild(this.bufferLayer.canvas);
    
    // add backstage layer
    this.backstageLayer.stage = this;
    this.backstageLayer.canvas.width = this.width;
    this.backstageLayer.canvas.height = this.height;
    this.container.appendChild(this.backstageLayer.canvas);
    
    this.listen();
    
    this.addEventListener("mouseout", function(evt){
        that.shapeDragging = undefined;
    }, false);
    
    /*
     * prepare drag and drop
     */
    var types = [{
        end: "mouseup",
        move: "mousemove"
    }, {
        end: "touchend",
        move: "touchmove"
    }];
    
    for (var n = 0; n < types.length; n++) {
        var pubType = types[n];
        (function(){
            var type = pubType;
            that.on(type.move, function(evt){
                if (that.shapeDragging) {
                    var pos = type.move == "mousemove" ? that.getMousePosition() : that.getTouchPosition();
                    if (that.shapeDragging.drag.x) {
                        that.shapeDragging.x = pos.x - that.shapeDragging.offset.x;
                    }
                    if (that.shapeDragging.drag.y) {
                        that.shapeDragging.y = pos.y - that.shapeDragging.offset.y;
                    }
                    that.shapeDragging.layer.draw();
                    
                    // execute user defined ondragend if defined
                    var dragmove = that.shapeDragging.eventListeners.ondragmove;
                    if (dragmove) {
                        var events = dragmove;
                        for (var i = 0; i < events.length; i++) {
                            events[i].handler.apply(that.shapeDragging, [evt]);
                        }
                    }
                }
            }, false);
            that.on(type.end, function(evt){
                // execute user defined ondragend if defined
                if (that.shapeDragging) {
                    var dragend = that.shapeDragging.eventListeners.ondragend;
                    if (dragend) {
                        var events = dragend;
                        for (var i = 0; i < events.length; i++) {
                            events[i].handler.apply(that.shapeDragging, [evt]);
                        }
                    }
                }
                that.shapeDragging = undefined;
            });
        })();
    }
    
    this.on("touchend", function(evt){
        // execute user defined ondragend if defined
        if (that.shapeDragging) {
            var dragend = that.shapeDragging.eventListeners.ondragend;
            if (dragend) {
                var events = dragend;
                for (var i = 0; i < events.length; i++) {
                    events[i].handler.apply(that.shapeDragging, [evt]);
                }
            }
        }
        that.shapeDragging = undefined;
    });
};
/*
 * set stage size
 */
Kinetic.Stage.prototype.setSize = function(width, height){
    var layers = this.layers;
    for (n = 0; n < layers.length; n++) {
        var layer = layers[n];
        layer.getCanvas().width = width;
        layer.getCanvas().height = height;
        layer.draw();
    }
};
/*
 * scale stage
 */
Kinetic.Stage.prototype.setScale = function(scaleX, scaleY){
    if (scaleY) {
        this.scale.x = scaleX;
        this.scale.y = scaleY;
    }
    else {
        this.scale.x = scaleX;
        this.scale.y = scaleX;
    }
};
/*
 * Composite toDataURL
 */
Kinetic.Stage.prototype.toDataURL = function(callback){
    var bufferLayer = this.bufferLayer;
    var bufferContext = bufferLayer.getContext();
    var layers = this.layers;
    
    function addLayer(n){
        var dataURL = layers[n].getCanvas().toDataURL();
        var imageObj = new Image();
        imageObj.onload = function(){
            bufferContext.drawImage(this, 0, 0);
            n++;
            if (n < layers.length) {
                addLayer(n);
            }
            else {
                callback(bufferLayer.getCanvas().toDataURL());
            }
        };
        imageObj.src = dataURL;
    }
    
    
    bufferLayer.clear();
    addLayer(0);
};

/*
 * draw shapes
 */
Kinetic.Stage.prototype.draw = function(){
    var layers = this.layers;
    for (var n = 0; n < layers.length; n++) {
        layers[n].draw();
    }
};
/*
 * remove a layer from the stage
 */
Kinetic.Stage.prototype.remove = function(shape){
    // TODO
};
/*
 * short-hand add event listener to stage (which is essentially
 * the container DOM)
 */
Kinetic.Stage.prototype.on = function(type, handler){
    this.container.addEventListener(type, handler);
};
/*
 * long-hand add event listener to stage (which is essentially
 * the container DOM)
 */
Kinetic.Stage.prototype.addEventListener = function(type, handler){
    this.on(type, handler);
};
/* 
 * add layer to stage
 */
Kinetic.Stage.prototype.add = function(layer){
    layer.canvas.width = this.width;
    layer.canvas.height = this.height;
    layer.stage = this;
    this.layers.push(layer);
    layer.draw();
    this.container.appendChild(layer.canvas);
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
    
    var backstageLayer = this.backstageLayer;
    var backstageLayerContext = backstageLayer.getContext();
    var that = this;
    
    backstageLayer.clear();
    
    /*
     * loop through layers.  If at any point an event
     * is triggered, n is set to -1 which will break out of the
     * three nested loops
     */
    for (var n = this.layers.length - 1; n >= 0; n--) {
        var layer = this.layers[n];
        if (n >= 0 && layer.isListening) {
            var linkId = layer.tailId;
            
            // propapgate backwards through event links
            while (n >= 0 && linkId !== undefined) {
                //for (var n = this.getEventShapes().length - 1; n >= 0; n--) {
                //var pubShape = this.getEventShapes()[n];
                var link = layer.linkHash[linkId];
                var pubShape = link.shape;
                (function(){
                    var shape = pubShape;
                    shape.draw(backstageLayer);
                    var pos = that.getUserPosition();
                    var el = shape.eventListeners;
                    
                    if (shape.visible && pos !== null && backstageLayerContext.isPointInPath(pos.x, pos.y)) {
                        // handle onmousedown
                        if (that.mouseDown) {
                            that.mouseDown = false;
                            that.clickStart = true;
                            
                            if (el.onmousedown) {
                                var events = el.onmousedown;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(shape, [evt]);
                                }
                            }
                            n = -1;
                        }
                        // handle onmouseup & onclick
                        else if (that.mouseUp) {
                            that.mouseUp = false;
                            if (el.onmouseup) {
                                var events = el.onmouseup;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(shape, [evt]);
                                }
                            }
                            
                            // detect if click or double click occurred
                            if (that.clickStart) {
                                if (el.onclick) {
                                    var events = el.onclick;
                                    for (var i = 0; i < events.length; i++) {
                                        events[i].handler.apply(shape, [evt]);
                                    }
                                }
                                
                                if (el.ondblclick && shape.inDoubleClickWindow) {
                                    var events = el.ondblclick;
                                    for (var i = 0; i < events.length; i++) {
                                        events[i].handler.apply(shape, [evt]);
                                    }
                                }
                                
                                shape.inDoubleClickWindow = true;
                                
                                setTimeout(function(){
                                    shape.inDoubleClickWindow = false;
                                }, that.dblClickWindow);
                            }
                            n = -1;
                        }
                        
                        // handle touchstart
                        else if (that.touchStart) {
                            that.touchStart = false;
                            if (el.touchstart) {
                                var events = el.touchstart;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(shape, [evt]);
                                }
                            }
                            
                            if (el.ondbltap && shape.inDoubleClickWindow) {
                                var events = el.ondbltap;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(shape, [evt]);
                                }
                            }
                            
                            shape.inDoubleClickWindow = true;
                            
                            setTimeout(function(){
                                shape.inDoubleClickWindow = false;
                            }, that.dblClickWindow);
                            n = -1;
                        }
                        
                        // handle touchend
                        else if (that.touchEnd) {
                            that.touchEnd = false;
                            if (el.touchend) {
                                var events = el.touchend;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(shape, [evt]);
                                }
                            }
                            n = -1;
                        }
                        
                        // handle touchmove
                        else if (el.touchmove) {
                            var events = el.touchmove;
                            for (var i = 0; i < events.length; i++) {
                                events[i].handler.apply(shape, [evt]);
                            }
                            n = -1;
                        }
                        
                        /*
                         * this condition is used to identify a new target shape.
                         * A new target shape occurs if a target shape is not defined or
                         * if the current shape is different from the current target shape and
                         * the current shape is beneath the target
                         */
                        else if (that.targetShape.id === undefined || (that.targetShape.id != shape.id && that.targetShape.getZIndex() < shape.getZIndex())) {
                            /*
                             * check if old target has an onmouseout event listener
                             */
                            var oldEl = that.targetShape.eventListeners;
                            if (oldEl && oldEl.onmouseout) {
                                var events = oldEl.onmouseout;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(that.targetShape, [evt]);
                                }
                            }
                            
                            // set new target shape
                            that.targetShape = shape;
                            
                            // handle onmouseover
                            if (el.onmouseover) {
                                var events = el.onmouseover;
                                for (var i = 0; i < events.length; i++) {
                                    events[i].handler.apply(shape, [evt]);
                                }
                            }
                            n = -1;
                        }
                        
                        // handle onmousemove
                        else if (el.onmousemove) {
                            var events = el.onmousemove;
                            for (var i = 0; i < events.length; i++) {
                                events[i].handler.apply(shape, [evt]);
                            }
                            n = -1;
                        }
                    }
                    // handle mouseout condition
                    else if (that.targetShape.id == shape.id) {
                        that.targetShape = {};
                        if (el.onmouseout) {
                            var events = el.onmouseout;
                            for (var i = 0; i < events.length; i++) {
                                events[i].handler.apply(shape, [evt]);
                            }
                        }
                        n = -1;
                    }
                }());
                
                linkId = link.prevId;
            } // end links loop
        }
    } // end layer loop
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
        
        that.clickStart = false;
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
Kinetic.Stage.prototype.getMousePosition = function(evt){
    return this.mousePos;
};
/*
 * get touch position for mobile apps
 */
Kinetic.Stage.prototype.getTouchPosition = function(evt){
    return this.touchPos;
};
/*
 * get user position (mouse position or touch position)
 *
 */
Kinetic.Stage.prototype.getUserPosition = function(evt){
    return this.getTouchPosition() || this.getMousePosition();
};
/*
 * set mouse positon for desktop apps
 */
Kinetic.Stage.prototype.setMousePosition = function(evt){
    var mouseX = evt.clientX - this.getContainerPosition().left + window.pageXOffset;
    var mouseY = evt.clientY - this.getContainerPosition().top + window.pageYOffset;
    this.mousePos = {
        x: mouseX,
        y: mouseY
    };
};
/*
 * set touch position for mobile apps
 */
Kinetic.Stage.prototype.setTouchPosition = function(evt){
    if (evt.touches !== undefined && evt.touches.length == 1) {// Only deal with
        // one finger
        var touch = evt.touches[0];
        // Get the information for finger #1
        var touchX = touch.clientX - this.getContainerPosition().left + window.pageXOffset;
        var touchY = touch.clientY - this.getContainerPosition().top + window.pageYOffset;
        
        this.touchPos = {
            x: touchX,
            y: touchY
        };
    }
};
/*
 * get container position
 */
Kinetic.Stage.prototype.getContainerPosition = function(){
    var obj = this.container;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != "BODY") {
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
/*
 * get all shapes
 */
Kinetic.Stage.prototype.getShapes = function(){

};
///////////////////////////////////////////////////////////////////////
////  Shape
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

Kinetic.Shape = function(drawFunc){
    this.isListening = true;
    this.drawFunc = drawFunc;
    this.layerKey = "actors";
    
    this.x = 0;
    this.y = 0;
    this.scale = {
        x: 1,
        y: 1
    };
    this.rotation = 0;
    // radians
    // store state for next clear
    this.lastX = 0;
    this.lastY = 0;
    this.lastRotation = 0;
    // radians
    this.lastScale = {
        x: 1,
        y: 1
    };
    
    this.eventListeners = {};
    this.visible = true;
    this.drag = {
        x: false,
        y: false
    };
};
/*
 * listen or don't listen to events
 */
Kinetic.Shape.prototype.listen = function(isListening){
    // if shape is in layer
    if (this.link) {
        // if changing isListening
        if (isListening != this.isListening) {
            // is now listening
            if (isListening) {
                //TODO
            }
            // if now not listening
            else {
                //TODO
            }
        }
    }
    
    this.isListening = isListening;
};
/*
 * get shape temp layer context
 */
Kinetic.Shape.prototype.getContext = function(){
    return this.tempLayer.getContext();
};
/*
 * get shape temp layer canvas
 */
Kinetic.Shape.prototype.getCanvas = function(){
    return this.tempLayer.getCanvas();
};
/*
 * get layer
 */
Kinetic.Shape.prototype.getLayer = function(){
    return this.layer;
};
/*
 * get stage
 */
Kinetic.Shape.prototype.getStage = function(){
    return this.layer.stage;
};
/*
 * draw shape
 */
Kinetic.Shape.prototype.draw = function(layer){
    if (this.visible) {
        //var layer = this.layer;
        var stage = layer.stage;
        var context = layer.getContext();
        
        // layer transform
        context.save();
        if (stage.scale.x != 1 || stage.scale.y != 1) {
            context.scale(stage.scale.x, stage.scale.y);
        }
        
        // shape transform
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
        
        this.tempLayer = layer;
        this.drawFunc.call(this);
        
        context.restore();
        context.restore();
    }
};
/*
 * initialize drag and drop
 */
Kinetic.Shape.prototype.initDrag = function(){
    var that = this;
    var types = ["mousedown", "touchstart"];
    
    for (var n = 0; n < types.length; n++) {
        var pubType = types[n];
        (function(){
            var type = pubType;
            that.on(type + ".initdrag", function(evt){
                var stage = that.layer.stage;
                var pos = stage.getUserPosition();
                
                if (pos) {
                    stage.shapeDragging = that;
                    stage.shapeDragging.offset = {};
                    stage.shapeDragging.offset.x = pos.x - that.x;
                    stage.shapeDragging.offset.y = pos.y - that.y;
                    
                    // execute dragstart events if defined
                    var dragstart = that.eventListeners.ondragstart;
                    if (dragstart) {
                        var events = dragstart;
                        for (var i = 0; i < events.length; i++) {
                            events[i].handler.apply(that, [evt]);
                        }
                    }
                }
            });
        })();
    }
};
/*
 * remove drag and drop event listener
 */
Kinetic.Shape.prototype.dragCleanup = function(){
    if (!this.drag.x && !this.drag.y) {
        this.off("mousedown.initdrag");
        this.off("touchstart.initdrag");
    }
};
/*
 * enable/disable drag and drop for box x and y direction
 */
Kinetic.Shape.prototype.draggable = function(setDraggable){
    if (setDraggable) {
        var needInit = !this.drag.x && !this.drag.y;
        this.drag = {
            x: true,
            y: true
        };
        if (needInit) {
            this.initDrag();
        }
    }
    else {
        this.drag = {
            x: false,
            y: false
        };
        this.dragCleanup();
    }
};
/*
 * enable/disable drag and drop for x only
 */
Kinetic.Shape.prototype.draggableX = function(setDraggable){
    if (setDraggable) {
        var needInit = !this.drag.x && !this.drag.y;
        this.drag.x = true;
        if (needInit) {
            this.initDrag();
        }
    }
    else {
        this.drag.x = false;
        this.dragCleanup();
    }
};
/*
 * enable/disable drag and drop for y only
 */
Kinetic.Shape.prototype.draggableY = function(setDraggable){
    if (setDraggable) {
        var needInit = !this.drag.x && !this.drag.y;
        this.drag.y = true;
        if (needInit) {
            this.initDrag();
        }
    }
    else {
        this.drag.y = false;
        this.dragCleanup();
    }
};
/*
 * get zIndex
 */
Kinetic.Shape.prototype.getZIndex = function(){
    return this.link.index;
};
/*
 * set shape scale
 */
Kinetic.Shape.prototype.setScale = function(scaleX, scaleY){
    if (scaleY) {
        this.scale.x = scaleX;
        this.scale.y = scaleY;
    }
    else {
        this.scale.x = scaleX;
        this.scale.y = scaleX;
    }
};
/*
 * move shape to position
 */
Kinetic.Shape.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
};
/*
 * get shape position
 */
Kinetic.Shape.prototype.getPosition = function(){
    return {
        x: this.x,
        y: this.y
    };
};
/*
 * move shape by amount
 */
Kinetic.Shape.prototype.move = function(x, y){
    this.x += x;
    this.y += y;
};
/*
 * set shape rotation
 */
Kinetic.Shape.prototype.setRotation = function(theta){
    this.rotation = theta;
};
/*
 * rotate shape by amount
 */
Kinetic.Shape.prototype.rotate = function(theta){
    this.rotation += theta;
};
/*
 * short-hand add event listener to shape
 */
Kinetic.Shape.prototype.on = function(typesStr, handler){
    var types = typesStr.split(" ");
    /*
     * loop through types and attach event listeners to
     * each one.  eg. "click mouseover.namespace mouseout"
     * will create three event bindings
     */
    for (var n = 0; n < types.length; n++) {
        var type = types[n];
        var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
        var parts = event.split(".");
        var baseEvent = parts[0];
        var name = parts.length > 1 ? parts[1] : "";
        
        if (!this.eventListeners[baseEvent]) {
            this.eventListeners[baseEvent] = [];
        }
        
        this.eventListeners[baseEvent].push({
            name: name,
            handler: handler
        });
    }
};
/*
 * long-hand add event listener to shape
 */
Kinetic.Shape.prototype.addEventListener = function(type, handler){
    this.on(type, handler);
};
/*
 * short-hand remove event listener(s)
 */
Kinetic.Shape.prototype.off = function(type){
    var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
    var parts = event.split(".");
    var baseEvent = parts[0];
    
    if (this.eventListeners[baseEvent] && parts.length > 1) {
        var name = parts[1];
        
        for (var i = 0; i < this.eventListeners[baseEvent].length; i++) {
            if (this.eventListeners[baseEvent][i].name == name) {
                this.eventListeners[baseEvent].splice(i, 1);
                if (this.eventListeners[baseEvent].length === 0) {
                    this.eventListeners[baseEvent] = undefined;
                }
                break;
            }
        }
    }
    else {
        this.eventListeners[baseEvent] = undefined;
    }
};
/*
 * long-hand remove event listener(s)
 */
Kinetic.Shape.prototype.removeEventListener = function(type){
    this.off(type);
};
/*
 * show shape
 */
Kinetic.Shape.prototype.show = function(){
    this.visible = true;
};
/*
 * hide shape
 */
Kinetic.Shape.prototype.hide = function(){
    this.visible = false;
};
/*
 * move shape to top
 */
Kinetic.Shape.prototype.moveToTop = function(){
    var link = this.link;
    var index = link.index;
    var layer = this.layer;
    this.layer.links.splice(index, 1);
    this.layer.links.push(link);
    
    layer.setLinkIndices();
    
    if (this.isListening) {
        // alter link structure if more than one link in the layer
        if (link.nextId !== undefined || link.prevId !== undefined) {
            layer.unlink(link);
            var tail = layer.linkHash[layer.tailId];
            tail.nextId = link.id;
            link.prevId = tail.id;
            layer.tailId = link.id;
        }
    }
};
/*
 * get shape layer
 */
Kinetic.Shape.prototype.getLayer = function(){
    return this.layer;
};
///////////////////////////////////////////////////////////////////////
////  Extenders
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

Kinetic.ExtendShape = function(obj, draw){
    var shape = new Kinetic.Shape(draw);
    
    // copy methods and properties
    for (var key in shape) {
        obj[key] = shape[key];
    }
};

Kinetic.ExtendLayer = function(obj, draw){
    var layer = new Kinetic.Layer(draw);
    
    // copy methods and properties
    for (var key in layer) {
        obj[key] = layer[key];
    }
};

