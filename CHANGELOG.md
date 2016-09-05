## 0.19.18 (Unreleased)

BUG FIXES

  * transform: Null checks for null raw transforms in TransformGroup. ([#262](https://github.com/wsick/Fayde/pull/262))
  * brush: Ensuring gradient brushes do not crash with unspecified Color Stop. ([#261](https://github.com/wsick/Fayde/pull/261))
  * scroll: Fixing touch-based scrolling ([#266](https://github.com/wsick/Fayde/pull/266))
  * scroll: Adding missing touch event handlers ([#263](https://github.com/wsick/Fayde/pull/263) [#264](https://github.com/wsick/Fayde/pull/264) [#265](https://github.com/wsick/Fayde/pull/265))

## 0.19.17 (Mar 10, 2016)

BUG FIXES

  * scroll: Fixing page down/page up scrolling crash. [GH-250]

## 0.19.16 (Feb 20, 2016)

BUG FIXES

  * scroll: Resetting scrolling if ItemsSource changes. [GH-247]

## 0.19.15 (Feb 6, 2016)

INTERNAL

  * build: Building with new scaffold

## 0.19.14 (Feb 2, 2016)

SAFETY

  * markup: Throw XamlParseException from xaml loader for xml parsererror. [GH-236]

## 0.19.13 (Jan 14, 2016)

FEATURES

  * controls: Add Watermark to ComboBox. [GH-229]
  * brush: Add conversion from SolidColorBrush to Color. [GH-232] 

SAFETY
  
  * brush: Force gradient color stops into [0.0, 1.0] range. [GH-232]

## 0.19.12 (Jan 4, 2016)

SAFETY

  * markup: Report FrameworkTemplate syntax errors. [GH-227]

## 0.19.11 (Dec 21, 2015)

FEATURES

  * navigation: ViewModelProvider can redirect to another route. [GH-215]

## 0.19.10 (Dec 14, 2015)

BUG FIXES

  * compatibility: Scrollbars appearing in Edge, Firefox. [GH-202]
