import autobind from 'autobind-decorator'


@autobind
class TheText extends React.Component{
  constructor() {
    super();
    this.state = {
      LECHIFFRE: 0
    };
  }
  componentDidMount() {
    console.log('hm', this.props)
    this.setState({thetext:13})
  }
  render() {
    let data = this.props.data
    return (
    	<div>
	    	<div>Salut {data.content}</div>
	    </div>
    );
  }
};

export default TheText

