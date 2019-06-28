import  React,{PureComponent}from 'react';
import ThemeProvider from '../ThemeProvider';
const connect = (mapStateToProps,mapDispatchToProps)=>(WrappedComponent)=>{
    class Connect extends PureComponent{
        constructor(props){
            super(props);
            this._updateProps = this._updateProps.bind(this);
            this.state = {allProps:{}}
        }
        componentDidMount() {
            const store = this.context;
            this._updateProps();
            store.subscribe(()=>this._updateProps());
        }
        _updateProps(){
            const store = this.context;
            let stateProps = mapStateToProps?mapStateToProps(store.getState(),this.props):{};
            let dispatchProps = mapDispatchToProps?mapDispatchToProps(store.dispatch,this.props):{};
            this.setState({
                allProps:{
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props,
                }
            })
        }
        render() {
            const {allProps} = this.state;
            return <WrappedComponent {...allProps}/>
        }
    }
    Connect.contextType = ThemeProvider;
    return Connect;
};
export {
    connect
}
