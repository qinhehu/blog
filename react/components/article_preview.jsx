var React = require("react");
var ReactDOM = require("react-dom");

var Article_list = React.createClass({
  getInitialState: function() {
    return {loading: true, error: null, data: null};
  },
  componentDidMount() {
    console.log("componentDidMount");
    this.props.source.then(value => this.setState({loading: false, data: value}), error => this.setState({loading: false, error: error}));
  },
  componentWillReceiveProps:function(newProps) {
    newProps.source.then(value => this.setState({loading: false, data: value}), error => this.setState({loading: false, error: error}));
    console.log('Component WILL RECEIVE PROPS!')
  },
  render: function() {
    if (this.state.loading) {
      return <div className="mdl-spinner mdl-js-spinner is-active"></div>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {
      var repos = this.state.data.items;
      var repoList = repos.map(function(repo, index) {
        var createdate = new Date(repo.createdate * 1);
        var time = createdate.getFullYear() + '-' + createdate.getMonth() + '-' + createdate.getDate();
        return (
          <div className="mdl-card mdl-shadow--2dp" style={{width:'100%',marginBottom:'50px'}} key={repo.id}>
            <div className="article-preview mdl-card__media"
                 style={{backgroundImage:'url(' + repo.imgpath + ')',height:'300px',alignItems:'flex-end',display:'flex',cursor:'pointer'}}>
                <h3 className="mdl-card__title-text">
                  <a href={'/article/'+repo.guid} style={{color:'#fff'}}>{repo.headline}</a>
                </h3>
            </div>
            <div className="mdl-card__supporting-text" style={{textAlign:'left'}}>
              <p style={{marginBottom:'0px','fontSize':'16px'}}>{repo.summary}</p>
            </div>
            <div className="mdl-card__actions mdl-card--border mdl-textfield--align-right">
              <i className="fa fa-calendar" style={{paddingLeft:'15px',color:'#999','fontSize':'14px'}}> {time}</i>
              <i className="fa fa-tags" style={{paddingLeft:'15px',color:'#999','fontSize':'14px'}}> {repo.tags}</i>
            </div>
          </div>
        );
      });
      return (
        <main>
          {repoList}
        </main>
      );
    }
  }
});

var Article_page = React.createClass({
  getInitialState: function(){
    return {loading: true, error: null, data: null};
  },
  handlePreClick:function(event){
    var count = this.state.data.count;
    var index = this.state.data.index;
    this.setState({data:{index: index - 1,count:count}});
  },
  handleNextClick: function(event){
    var count = this.state.data.count;
    var index = this.state.data.index;
    this.setState({data:{index: index + 1,count:count}});
  },
  componentDidMount(){
    this.props.promise.then(value => this.setState({loading: false, data: value}), error => this.setState({loading: false, error: error}));
  },
  render: function(){

    if (this.state.loading) {
      return <div className="mdl-spinner mdl-js-spinner is-active"></div>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {
      var count = this.state.data.count;
      var index = this.state.data.index;

      var pageBar;

      if(count == 0){
        return;
      }else if(count/3 > 1){
        if(index == 0){
          console.log("0 page");
          pageBar =  (
            <div className="mdl-textfield--align-right" style={{marginBottom:'30px'}}>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"
                        style={{backgroundColor:'white',color:'black',marginLeft:'16px'}}
                        onClick={this.handleNextClick}>
                  <i className="material-icons">arrow_forward</i>
                </button>
            </div>
          );
        }else if(index + 1 == Math.ceil(count/3)){
          console.log("1 page");
          pageBar = (
            <div className="mdl-textfield--align-right" style={{marginBottom:'30px'}}>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"
                        style={{backgroundColor:'white',color:'black'}}
                        onClick={this.handlePreClick}>
                  <i className="material-icons">arrow_back</i>
                </button>
            </div>
          );
        }else{
          console.log("2 page");
          pageBar = (
            <div className="mdl-textfield--align-right" style={{marginBottom:'30px'}}>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"
                        style={{backgroundColor:'white',color:'black'}}
                        onClick={this.handlePreClick}>
                  <i className="material-icons">arrow_back</i>
                </button>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"
                        style={{backgroundColor:'white',color:'black',marginLeft:'16px'}}
                        onClick={this.handleNextClick}>
                  <i className="material-icons">arrow_forward</i>
                </button>
            </div>
          );
        }
      }
      return (
        <main>
          <Article_list source={$.getJSON('/getArticle/'+index)} />
          {pageBar}
        </main>
      );
    }
  }
});

module.exports = Article_page;
