var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');

var Markdown = React.createClass({
    getInitialState: function() {
        return {value: 'Hello!'};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    rawMarkup: function() {
        var rawMarkup = marked(this.state.value.toString());
        console.log(rawMarkup);
        return {__html: rawMarkup};
    },
    render: function() {
        var value = this.state.value;
        var markedValue = marked(value.toString())
        return (
            <div className="markdown-body">
                <textarea onChange={this.handleChange} className="markdown_editor col-md-6">
                    {value}
                </textarea>
                <div dangerouslySetInnerHTML={this.rawMarkup()}  className="markdown_preview col-md-6"/>
            </div>
        );
    }
});

module.exports = Markdown;
