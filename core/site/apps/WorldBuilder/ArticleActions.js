import dispatcher from "./dispatcher"

export function reloadArticle() {
  dispatcher.dispatch({type: 'FETCH_ARTICLE'})
  let url = '/getdata'
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'GET',
    data: {
      id: 2
    },
    success: function(data) {
      console.log('res', data)
      dispatcher.dispatch({type: 'RECEIVE_ARTICLE', data: data})
    }.bind(this),
    error: function(xhr, status, err) {
      console.log(url, status, err.toString())
    }.bind(this)
  })
}
