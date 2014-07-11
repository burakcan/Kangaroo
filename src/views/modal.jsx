/** @jsx React.DOM */
(function(){

  ModalView = React.createClass({
    escHandler : function(e){
      if (this.props.cancelHandler && e.keyCode == 27) {
        this.props.cancelHandler(e);
      }
    },
    componentDidMount : function(){
      window.addEventListener('keydown', this.escHandler);
    },
    componentWillUnmount : function(){
      window.removeEventListener('keydown', this.handleResize);
    },
    render : function(){
      return (
        <div className='modal-overlay'>
          <div className={'action-modal ' + this.props.type}>
            <h4>{this.props.title}</h4>
            {this.props.children}
          </div>
        </div>
      )
    }
  });

  module.exports = ModalView;

}).call(this);