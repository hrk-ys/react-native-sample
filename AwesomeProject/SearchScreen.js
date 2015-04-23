'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  ListView,
  Text,
  TextInput,
  View,
  StyleSheet,
} = React;


var MovieCell = require('./MovieCell');
var MovieScreen = require('./MovieScreen');

var fetch = require('fetch');

var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
var API_KEYS = [
  '7waqfqbprs7pajbz28mqf6vz',
  // 'y4vwv8m33hed9ety83jmv52f', Fallback api_key
];


var resultsCache = {
    dataForQuery: {},
    nextPageNumberForQuery: {},
    totalForQuery: {},
};

var LOADING = {};

var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      queryNumber: 0,
    };
  },
  componentDidMount: function() {
    this.searchMovies('');
  },
  _urlForQueryAndPage: function(query: string, pageNumber: ?number): string {
    var apikey = API_KEYS[this.state.queryNumber % API_KEYS.length];
    if (query) {
      return (
        API_URL + 'movies.json?apikey=' + apikey + '&q' +
        encodeURIComponent(query) + '&page_limit=20&page=' + pageNumber
      );
    } else {
      return (
        API_URL + 'lists/movies/in_theaters.json?apikey=' + apikey +
        '&page_limit=20&page=' + pageNumber
      );
    }
  },
  searchMovies: function(query: string) {
    this.timeoutID = null;
    this.setState({filter: query});

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          dataSource: this.getDataSource(cachedResultsForQuery),
          isLoading: false,
        });
      } else {
        this.setState({isLoading: true});
      }
      return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;
    this.setState({
      isLoading: true,
      queryName: this.state.queryNumber + 1,
      isLoadingTail: false,
    });
    
    fetch(this._urlForQueryAndPage(query, 1))
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;

        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.totalForQuery[query] = responseData.total;
        resultsCache.dataForQuery[query] = responseData.movies;
        resultsCache.nextPageNumberForQuery[query] = 2;

        if (this.state.filter !== query) {
          return;
        }

        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(responseData.movies),
        });
      })
      .done();
  },

  hasMore: function(): boolean {
    var query = this.state.filter;
    if (!resultsCache.dataForQuery[query]) {
      return true;
    }
    return (
      resultsCache.totalForQuery[query] !==
      resultsCache.dataForQuery[query].length
    );
    
  },
  onSearchChange: function() {
    console.log('onSearchChange');
  },
  onFocus: function() {
  },

  getDataSource: function(movies: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(movies);
  },
  selectMovie: function(movie: Object) {
    this.props.navigator.push({
      title: movie.title,
      component: MovieScreen,
      passProps: {movie},
    });
  },
  renderFooter: function() {
    if (!this.hasMore() || !this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }
    return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
  },
  renderRow: function(movie: Object) {
    return (
        <MovieCell 
          onSelect={() => this.selectMovie(movie)}
          movie={movie}
        />
        );
  },
  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <NoMovies
        filter={this.state.filter}
        isLoading={this.state.isLoading}
      /> :
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        onEndReached={this.onEndReached}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}

      />;

    return (
        <View style={styles.container}>
          <SearchBar 
            onSearchChange={this.onSearchChange}
            isLoading={this.state.isLoading}
            onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)}
          />
          <View style={styles.separator} />
          {content}
        </View>
    );
  },
});


var NoMovies = React.createClass({
  render: function() {
    var text = '';
    if (this.props.filter) {
      text = 'No results for "${this.props.filter}"';
    } else  if (!this.props.isLoading) {
      text = 'No movies found';
    }
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noMoviesText}>{text}</Text>
      </View>
    );
  },
});

var SearchBar = React.createClass({
  render: function() {
    return (
        <View style={styles.searchBar}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChange={this.props.onSearchChange}
            placeholder="Search a movie..."
            onFocus={this.props.onFocus}
            style={styles.searchBarInput}
          />
          <ActivityIndicatorIOS
            animating={this.props.isLoading}
            style={styles.spinner}
          />

        </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noMoviesText: {
    marginTop: 80,
    color: '#888888',
  },
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  spinner: {
    width: 30,
  },

});

module.exports = SearchScreen;
