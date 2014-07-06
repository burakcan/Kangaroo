/** @jsx React.DOM */
(function(){

  ModalView = React.createClass({
    render : function(){
      return (
        <div className='modal-overlay'>
          <div className={'action-modal' + this.props.type}>
            <h4>{this.props.title}</h4>
            {this.props.children}
          </div>
        </div>
      )
    }
  });

  module.exports = ModalView;

}).call(this);