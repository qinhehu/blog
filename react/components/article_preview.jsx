var React = require("react");
var ReactDOM = require("react-dom");

var article_preview = React.createClass({

  getInitialState: function() {
    return {loading: true, error: null, data: null};
  },
  componentDidMount() {
    this.props.promise.then(value => this.setState({loading: false, data: value}), error => this.setState({loading: false, error: error}));
  },
  render: function() {

    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {

      var repos = this.state.data.items;
      var repoList = repos.map(function(repo, index) {
        $.get('/getDownloadURl',{key:repo.filename},function(result){
          var id = repo.id;
          $.get(result,function(result){
            $("div.media-right#"+id).html(result.substr(0,100));
          });
        });
        var createdate = new Date(repo.createdate * 1);
        var months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ];
        var year = createdate.getFullYear();
        var month = months[createdate.getMonth()];
        var date = createdate.getDate();
        var hours = createdate.getHours();
        var min = "0" + createdate.getMinutes();
        var sec = "0" + createdate.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hours + ':' + min.substr(-2) + ':' + sec.substr(-2);

        return (
          <div className="article-preview" key={repo.id}>
            <div className="content row">
              <p className="col-md-3">{repo.headline}</p>
              <p className="col-md-3">{time}</p>
            </div>
            <div className="content media">
              <div className="media-left">
                <img className="img-thumbnail" src={repo.imgpath}></img>
              </div>
              <div className="media-right markdown-body" id={repo.id}>
                <p>{time}</p>
              </div>
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

module.exports = article_preview;
