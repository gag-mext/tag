import "../style";
import React from 'react';
import classNames from 'classnames';
import Icon from '@gag/icon';
import getDataAttr from '@gag/util/getDataAttr';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      closed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected,
      });
    }
  }

  onClick = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const isSelect = this.state.selected;
    this.setState({
      selected: !isSelect,
    }, () => {
      if (onChange) {
        onChange(!isSelect);
      }
    });
  }

  onTagClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({
      closed: true,
    }, this.props.afterClose);
  }

  render() {
    const { children, className, prefixCls, disabled, closable, small, style } = this.props;
    const wrapCls = classNames({
      [className]: !!className,
      [`${prefixCls}`]: true,
      [`${prefixCls}-normal`]: !disabled && ( !this.state.selected || small || closable ),
      [`${prefixCls}-small`]: small,
      [`${prefixCls}-active`]: this.state.selected && !disabled && !small && !closable,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-closable`]: closable,
    });

    const closableDom = closable && !disabled && !small ? (
      <div className={`${prefixCls}-close`} onClick={this.onTagClose}>
        <Icon type="cross-circle" size="xs" />
      </div>
    ) : null;

    return !this.state.closed ? (
      <div {...getDataAttr(this.props)} className={wrapCls} onClick={this.onClick} style={style}>
        <div className={`${prefixCls}-text`}>{children}</div>
        {closableDom}
      </div>
    ) : null;
  }
}
Tag.defaultProps = {
  prefixCls: 'am-tag',
  disabled: false,
  selected: false,
  closable: false,
  small: false,
  onChange() {},
  onClose() {},
  afterClose() {},
};
Tag.propTypes = {
  disabled: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  closable: React.PropTypes.bool,
  small: React.PropTypes.bool,
  onChange:React.PropTypes.func,
  onClose:React.PropTypes.func,
  afterClose:React.PropTypes.func,
  style:React.PropTypes.object,
  /** web only */
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string
};
Tag.displayName = "Tag";
module.exports=Tag;
