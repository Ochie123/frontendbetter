import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Menu, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import ActionButton from '../ActionButton';
import Sort from './Sort';
import Drawer from '../drawer/Drawer';

/**
 * A button that when clicked, opens a drawer containing the `Sort` view. The name of the currently
 * selected sort option is displayed in the button text.
 */
const SortButton = function ({
  title,
  drawerProps,
  onClick,
  sortProps,
  drawerBreakpoint,
  href,
  ...props
}) {
  const theme = useTheme();
  const [state, setState] = useState({
    open: false,
    mountDrawer: false,
    anchorEl: null,
  });
  const { open, mountDrawer, anchorEl } = state;
  const buttonRef = useRef();
  const sortOptions = [
    { code: 'option1', name: 'Option 1' },
    { code: 'option2', name: 'Option 2' },
    { code: 'option3', name: 'Option 3' },
  ];
  const sort = sortOptions[0].code; // Select the first option by default
  const selectedOption = sortOptions.find((o) => sort === o.code);

  const location = useLocation();

  useEffect(() => {
    if (location.search.indexOf('openSort') !== -1) {
      setState({ open: true, mountDrawer: true, anchorEl: buttonRef.current });
    }
  }, [location.search]);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    if (!e.defaultPrevented) {
      toggleOpen(true, e.currentTarget);
    }
  };

  const close = () => {
    toggleOpen(false);
  };

  const toggleOpen = (open, anchorEl) => {
    if (open) {
      setState({ mountDrawer: true, open: true, anchorEl });
    } else {
      setState({ ...state, open: false, anchorEl: null });
    }
  };

  const useDrawer = useMediaQuery(theme.breakpoints.down(drawerBreakpoint));

  return (
    <>
      <ActionButton
        key="button"
        label={title}
        ref={buttonRef}
        value={selectedOption && selectedOption.name}
        href={href}
        {...props}
        onClick={(e) => handleClick(e)}
      />
      {!href && useDrawer && (
        <Drawer
          ModalProps={{
            keepMounted: true,
          }}
          key="drawer"
          anchor="bottom"
          title={title}
          open={open}
          onClose={close}
          {...drawerProps}
        >
          {mountDrawer && <Sort onSelect={close} sortOptions={sortOptions} {...sortProps} />}
        </Drawer>
      )}
      {!href && !useDrawer && (
        <Menu open={open} anchorEl={anchorEl} onClose={close}>
          <Sort variant="menu-items" onSelect={close} sortOptions={sortOptions} {...sortProps} />
        </Menu>
      )}
    </>
  );
};

SortButton.propTypes = {
  classes: PropTypes.object,
  drawerProps: PropTypes.object,
  sortProps: PropTypes.object,
  title: PropTypes.string,
  drawerBreakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  href: PropTypes.string,
  onClick: PropTypes.func,
};

SortButton.defaultProps = {
  title: 'Sort',
  drawerProps: {},
  sortProps: {},
  drawerBreakpoint: 'xs',
};

export default memo(SortButton);
