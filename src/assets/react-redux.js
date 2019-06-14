import  React,{PureComponent}from 'react';
import PropTypes from 'prop-types';
const connect = (mapStateToProps,mapDispatchToProps)=>(WrappedComponent)=>{
    class Connect extends PureComponent{
        static contextTypes = {
            store: PropTypes.object
        };
        constructor(props){
            super(props);
            this._updateProps = this._updateProps.bind(this);
            this.state = {allProps:{}}
        }
        componentDidMount() {
            const {store} = this.context;
            this._updateProps();
            store.subscribe(()=>this._updateProps());
        }
        _updateProps(){
            const {store} = this.context;
            let stateProps = mapStateToProps?mapStateToProps(store.getState(),this.props):{};
            let dispatchProps = mapDispatchToProps?mapDispatchToProps(store.dispatch,this.props):{};
            console.log(stateProps,'--stateProps');
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
            console.log(allProps,'allProps');
            return <WrappedComponent {...allProps}/>
        }
    }
    return Connect;
};
export {
    connect
}