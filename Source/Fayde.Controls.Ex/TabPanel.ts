
module Fayde.Controls {
    export class TabPanel extends Panel {
        private _NumberOfRows: number = 1;
        private _RowHeight: number;

        private get TabAlignment(): Dock {
            var tabControlParent: TabControl = VisualTreeHelper.GetParentOfType<TabControl>(this, TabControl);
            if (tabControlParent != null)
                return tabControlParent.TabStripPlacement;
            return Dock.Top;
        }
        
        MeasureOverride(availableSize: size): size {
            var s = new size();
            var tabAlignment = this.TabAlignment;
            this._NumberOfRows = 1;
            this._RowHeight = 0.0;

            var childEnumerator = this.Children.GetEnumerator();
            var element: UIElement;

            if (tabAlignment == Dock.Top || tabAlignment == Dock.Bottom) {
                var num1 = 0;
                var num2 = 0.0;
                var num3 = 0.0;
                while (childEnumerator.MoveNext()) {
                    element = childEnumerator.Current;
                    element.Measure(availableSize);
                    if (element.Visibility !== Visibility.Collapsed) {
                        var sizeWithoutMargin = getDesiredSizeWithoutMargin(element);
                        if (this._RowHeight < sizeWithoutMargin.Height)
                            this._RowHeight = sizeWithoutMargin.Height;
                        if (num2 + sizeWithoutMargin.Width > availableSize.Width && num1 > 0) {
                            if (num3 < num2)
                                num3 = num2;
                            num2 = sizeWithoutMargin.Width;
                            num1 = 1;
                            ++this._NumberOfRows;
                        }
                        else {
                            num2 += sizeWithoutMargin.Width;
                            ++num1;
                        }
                    }
                }
                if (num3 < num2)
                    num3 = num2;
                s.Height = this._RowHeight * this._NumberOfRows;
                s.Width = !isFinite(s.Width) || isNaN(s.Width) || num3 < availableSize.Width ? num3 : availableSize.Width;
            } else if (tabAlignment === Dock.Left || tabAlignment === Dock.Right) {
                while (childEnumerator.MoveNext()) {
                    element = childEnumerator.Current;
                    if (element.Visibility != Visibility.Collapsed) {
                        element.Measure(availableSize);
                        var sizeWithoutMargin = getDesiredSizeWithoutMargin(element);
                        if (s.Width < sizeWithoutMargin.Width)
                            s.Width = sizeWithoutMargin.Width;
                        s.Height += sizeWithoutMargin.Height;
                    }
                }
            }
            return s;
        }
        ArrangeOverride(finalSize: size): size {
            switch (this.TabAlignment) {
                case Dock.Top:
                case Dock.Bottom:
                    this._ArrangeHorizontal(finalSize);
                    break;
                case Dock.Left:
                case Dock.Right:
                    this._ArrangeVertical(finalSize);
                    break;
            }
            return finalSize;
        }

        private _ArrangeHorizontal(arrangeSize: size) {
            var tabAlignment = this.TabAlignment;
            var flag1 = this._NumberOfRows > 1;
            var num = 0;
            var solution: number[] = [];
            var size1 = new size();
            var headersSize = this._GetHeadersSize();
            if (flag1) {
                solution = this._CalculateHeaderDistribution(arrangeSize.Width, headersSize);
                num = this._GetActiveRow(solution);
                if (tabAlignment === Dock.Top)
                    size1.Height = (this._NumberOfRows - 1.0 - num) * this._RowHeight;
                if (tabAlignment === Dock.Bottom && num !== 0)
                    size1.Height = (this._NumberOfRows - num) * this._RowHeight;
            }
            var index1 = 0;
            var index2 = 0;
            var childEnumerator = this.Children.GetEnumerator();
            var uie: UIElement;
            while (childEnumerator.MoveNext()) {
                uie = childEnumerator.Current;
                var thickness = (<FrameworkElement>uie).Margin || new Thickness();
                var left = thickness.Left;
                var right = thickness.Right;
                var top = thickness.Top;
                var bottom = thickness.Bottom;
                var flag2 = flag1 && (index2 < solution.length && solution[index2] === index1 || index1 === this.Children.Count - 1);
                var size2 = size.fromRaw(headersSize[index1], this._RowHeight);
                if (flag2)
                    size2.Width = arrangeSize.Width - size1.Width;
                var tabItem = <TabItem>uie;
                if (tabItem instanceof TabItem) {
                    if (tabItem.IsSelected)
                        tabItem.SetValue(Canvas.ZIndexProperty, 1);
                    else
                        tabItem.SetValue(Canvas.ZIndexProperty, 0);
                }
                var arrSize = new rect();
                rect.set(arrSize, size1.Width, size1.Height, size2.Width, size2.Height);
                uie.Arrange(arrSize);
                var size3 = size2;
                size3.Height = Math.max(0.0, size3.Height - top - bottom);
                size3.Width = Math.max(0.0, size3.Width - left - right);
                size1.Width += size2.Width;
                if (flag2) {
                    if (index2 === num && tabAlignment === Dock.Top || index2 === num - 1 && tabAlignment === Dock.Bottom)
                        size1.Height = 0.0;
                    else
                        size1.Height += this._RowHeight;
                    size1.Width = 0.0;
                    ++index2;
                }
                ++index1;
            }
        }
        private _ArrangeVertical(arrangeSize: size) {
            var y = 0.0;
            var childEnumerator = this.Children.GetEnumerator();
            var uie: UIElement;
            while (childEnumerator.MoveNext()) {
                uie = childEnumerator.Current;
                if (uie.Visibility !== Visibility.Collapsed) {
                    var tabItem = <TabItem>uie;
                    if (tabItem instanceof TabItem) {
                        if (tabItem.IsSelected)
                            tabItem.SetValue(Canvas.ZIndexProperty, 1);
                        else
                            tabItem.SetValue(Canvas.ZIndexProperty, 0);
                    }
                    var sizeWithoutMargin = getDesiredSizeWithoutMargin(uie);
                    var arrSize = new rect();
                    rect.set(arrSize, 0.0, y, arrangeSize.Width, sizeWithoutMargin.Height);
                    uie.Arrange(arrSize);
                    y += sizeWithoutMargin.Height;
                }
            }
        }

        private _GetActiveRow(solution: number[]): number {
            var index = 0;
            var num = 0;
            if (solution.length > 0) {
                var childEnumerator = this.Children.GetEnumerator();
                var uie: UIElement;
                while (childEnumerator.MoveNext()) {
                    uie = childEnumerator.Current;
                    if (<boolean>uie.GetValue(TabItem.IsSelectedProperty))
                        return index;
                    if (index < solution.length && solution[index] === num)
                        ++index;
                    ++num;
                }
            }
            if (this.TabAlignment === Dock.Top)
                index = this._NumberOfRows - 1;
            return index;
        }
        private _CalculateHeaderDistribution(rowWidthLimit: number, headerWidth: number[]): number[] {
            var num1 = 0.0;
            var length1 = headerWidth.length;
            var length2 = this._NumberOfRows - 1;
            var num2 = 0.0;
            var num3 = 0;
            var numArray1 = new Array(length2);
            var numArray2 = new Array(length2);

            var numArray3 = new Array(this._NumberOfRows);
            var numArray4 = numArray3.slice(0);
            var numArray5 = numArray3.slice(0);
            var numArray6 = numArray3.slice(0);

            var index1 = 0;
            for (var index2 = 0; index2 < length1; ++index2) {
                if (num2 + headerWidth[index2] > rowWidthLimit && num3 > 0) {
                    numArray4[index1] = num2;
                    numArray3[index1] = num3;
                    var num4 = Math.max(0.0, (rowWidthLimit - num2) / num3);
                    numArray5[index1] = num4;
                    numArray1[index1] = index2 - 1;
                    if (num1 < num4)
                        num1 = num4;
                    ++index1;
                    num2 = headerWidth[index2];
                    num3 = 1;
                }
                else {
                    num2 += headerWidth[index2];
                    if (headerWidth[index2] != 0.0)
                        ++num3;
                }
            }
            if (index1 === 0)
                return [];
            numArray4[index1] = num2;
            numArray3[index1] = num3;
            var num5 = (rowWidthLimit - num2) / num3;
            numArray5[index1] = num5;
            if (num1 < num5)
                num1 = num5;

            numArray2 = numArray1.slice(0);
            numArray6 = numArray5.slice(0);
            while (true) {
                var num4 = 0;
                do {
                    var num6 = 0;
                    var num7 = 0.0;
                    for (var index2 = 0; index2 < this._NumberOfRows; ++index2) {
                        if (num7 < numArray5[index2]) {
                            num7 = numArray5[index2];
                            num6 = index2;
                        }
                    }
                    if (num6 != 0) {
                        var index2 = num6;
                        var index3 = index2 - 1;
                        var index4 = numArray1[index3];
                        var num8 = headerWidth[index4];
                        numArray4[index2] += num8;
                        if (numArray4[index2] <= rowWidthLimit) {
                            --numArray1[index3];
                            ++numArray3[index2];
                            numArray4[index3] -= num8;
                            --numArray3[index3];
                            numArray5[index3] = (rowWidthLimit - numArray4[index3]) / numArray3[index3];
                            numArray5[index2] = (rowWidthLimit - numArray4[index2]) / numArray3[index2];
                            num4 = 0.0;
                            for (var index5 = 0; index5 < this._NumberOfRows; ++index5) {
                                if (num4 < numArray5[index5])
                                    num4 = numArray5[index5];
                            }
                        }
                        else
                            break;
                    }
                    else
                        break;
                }
                while (num4 >= num1);
                num1 = num4;
                numArray2 = numArray1.slice(0);
                numArray6 = numArray5.slice(0);
            }

            var index6 = 0;
            var index7 = 0;
            var enumerator = this.Children.GetEnumerator();
            var uie: UIElement;
            while (enumerator.MoveNext()) {
                uie = enumerator.Current;
                if (uie.Visibility === Visibility.Visible)
                    headerWidth[index7] += numArray6[index6];
                if (index6 < length2 && numArray2[index6] == index7)
                    ++index6;
                ++index7;
            }
            return numArray2;
        }
        private _GetHeadersSize(): number[] {
            var arr = [];
            var index = 0;
            var enumerator = this.Children.GetEnumerator();
            var uie: UIElement;
            while (enumerator.MoveNext()) {
                uie = enumerator.Current;
                if (uie.Visibility === Visibility.Collapsed) {
                    arr.push(0.0);
                } else {
                    arr.push(getDesiredSizeWithoutMargin(uie).Width);
                }
            }
            return arr;
        }
    }

    function getDesiredSizeWithoutMargin(uie: UIElement): size {
        var num = 0.0;
        var tabItem = <TabItem>uie;
        if (tabItem instanceof TabItem && tabItem.IsSelected) {
            var panel = <Panel>tabItem.GetTemplate(tabItem.IsSelected, tabItem.TabStripPlacement);
            if (!(panel instanceof Panel))
                panel = null;
            var fe = <FrameworkElement> ((panel == null || panel.Children.Count <= 0) ? null : panel.Children.GetValueAt(0));
            if (fe instanceof FrameworkElement)
                num += Math.abs(fe.Margin.Left + fe.Margin.Right);
        }
        var s = new size();
        s.Width = uie.DesiredSize.Width;
        s.Height = uie.DesiredSize.Height;
        var thickness = (<FrameworkElement>uie).Margin;
        if (thickness) {
            s.Height = Math.max(0.0, uie.DesiredSize.Height - thickness.Top - thickness.Bottom);
            s.Width = Math.max(0.0, uie.DesiredSize.Width - thickness.Left - thickness.Right + num);
        }
        return s;
    }
}