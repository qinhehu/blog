var React = require('react');
var ReactDOM = require('react-dom');

var Tag = React.createClass({
  getInitialState: function() {
    return {tags: []};
  },
  handleChange: function(event) {
    var currentData = event.target.value;
    if(currentData.length>0){
      var currentChar =  currentData.substr(currentData.length-1);
      if(currentChar==',' || currentChar==' '){
        this.setState({tags:[...this.state.tags, currentData.substr(0,currentData.length-1)]});
        event.target.value = "";
      }
    }
  },
  render: function() {
    var tags = this.state.tags;
    var arrList = tags.map(function(str,index){
      return(
        <li className="tag" key={index} id={index}>
          {str}
          <button id="tagClose" >×</button>
        </li>
      )
    });

    return (
      <div className="form-control" style={{'paddingTop':'0px','paddingBottom':'0px','height':'auto'}}>
        <ul className="list-inline">
            {arrList}
          <li>
            <input style={{border:'0px',marginTop:'10px',marginRight:'4.8px'}}  onChange={this.handleChange}/>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Tag;
