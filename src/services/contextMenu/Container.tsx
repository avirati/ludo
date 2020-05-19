import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ContextMenu as ContextMenuComponent } from './components/ContextMenu';
import {
  contextMenuPositionSelector,
  isContextMenuVisibleSelector,
  menuContentsSelector,
} from './selectors';

interface IStateProps {
  visible: ReturnType<typeof isContextMenuVisibleSelector>;
  position: ReturnType<typeof contextMenuPositionSelector>;
  menuContents: ReturnType<typeof menuContentsSelector>;
}

interface IProps extends IStateProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  menuContents: menuContentsSelector,
  position: contextMenuPositionSelector,
  visible: isContextMenuVisibleSelector,
})

class ContextMenuBare extends React.PureComponent<IProps> {
  render() {
    const { menuContents, position, visible } = this.props;
    return visible
    ? (
      <ContextMenuComponent
        menuContents={menuContents}
        position={position}
      />
    )
    : null;
  }
}

export const ContextMenu = connect(mapStateToProps)(ContextMenuBare) as unknown as React.ComponentClass<{}>;
