## Fayde

[![Build Status](https://travis-ci.org/wsick/Fayde.svg?branch=master)](https://travis-ci.org/wsick/Fayde)
[![Bower](https://img.shields.io/bower/v/fayde.svg)](http://bower.io/search/?q=fayde)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wsick/Fayde?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Inspired by Silverlight; XAML engine using Javascript and rendering to the HTML5 Canvas.

Please check out the [wiki](https://github.com/wsick/Fayde/wiki) for more information.

## Dependencies

* nodejs
* grunt
* bower
* yeoman (used for scaffolding new applications)

## How to use

Install the Fayde application generator for yeoman.  Then use yeoman to generate a new application.

    > npm install -g generator-fayde
    > mkdir <project directory name>
    > cd <project directory name>
    > yo fayde


## Contributing

#### Set up your development
    
    > git clone git://github.com/BSick7/Fayde
    > cd Fayde
    > npm install
    > grunt lib:reset

#### Run automated tests

    > grunt test

#### Run test site (smoke tests)

    > grunt testsite
