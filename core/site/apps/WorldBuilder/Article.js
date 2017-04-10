import autobind from 'autobind-decorator'

import ToolBar from './ToolBar'
import TheText from './thetext'

import ArticleStore from './ArticleStore'

@autobind
class Article extends React.Component{
  constructor() {
    super();
    this.state = {
      data: ArticleStore.getData()
    }
  }
  componentWillMount() {
    ArticleStore.on("change", this.resetArticle);
  }
  componentWillUnmount() {
    ArticleStore.removeListener("change", this.resetArticle);
  }
  componentDidMount() {
  }
  resetArticle() {
    this.setState({
      data: ArticleStore.getData()
    })
  }
  render() {
    return (
      <div>
        <ToolBar resetArticle={this.resetArticle} />
        <TheText data={this.state.data} />
	    </div>
    );
  }
};

export default Article

