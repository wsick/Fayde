import PrimitivesTests = require("tests/PrimitivesTests");
import FormatTests = require("tests/FormatTests");
import TypeConverterTests = require("tests/TypeConverterTests");
import MarkupExpressionTests = require("tests/MarkupExpressionTests");
import XamlNodeTests = require("tests/XamlNodeTests");
import ProviderTests = require("tests/ProviderTests");
import DependencyPropertyTests = require("tests/DependencyPropertyTests");
import XamlLoadTests = require("tests/XamlLoadTests");
import DataTemplateTests = require("tests/DataTemplateTests");
import TransformTests = require("tests/TransformTests");
import TimelineTests = require("tests/TimelineTests");
import ItemContainersManagerTests = require("tests/ItemContainersManagerTests");
import BindingTests = require("tests/BindingTests");
import UriMapperTests = require("tests/UriMapperTests");
import DependencyLoadTests = require("tests/DependencyLoadTests");
import DeepObservableCollectionTests = require("tests/DeepObservableCollectionTests");

export function run() {
    PrimitivesTests.run();
    FormatTests.run();
    TypeConverterTests.run();
    MarkupExpressionTests.run();
    XamlNodeTests.run();
    ProviderTests.run();
    DependencyPropertyTests.run();
    XamlLoadTests.run();
    DataTemplateTests.run();
    TransformTests.run();
    TimelineTests.run();
    ItemContainersManagerTests.run();
    BindingTests.run();
    UriMapperTests.run();
    DependencyLoadTests.run();
    DeepObservableCollectionTests.run();

    QUnit.load();
    QUnit.start();
}