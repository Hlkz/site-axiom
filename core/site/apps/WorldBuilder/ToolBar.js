import autobind from 'autobind-decorator'

import * as ArticleActions from "./ArticleActions"

@autobind
class ToolBar extends React.Component{
  constructor() {
    super();
    this.state = {
      LECHIFFRE: 0
    };
  }
  componentDidMount() {
    this.setState({thetext:13})
  }
  render() {
    return (
    	<div>
        <button onClick={ArticleActions.reloadArticle}>Reset</button>
	    </div>
    )
  }
}

ToolBar.propTypes = {
  resetArticle: React.PropTypes.func.isRequired
}

export default ToolBar

