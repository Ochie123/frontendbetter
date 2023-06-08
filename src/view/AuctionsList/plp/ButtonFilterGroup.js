import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react';
import SwatchProductOption from '../option/SwatchProductOption';
import { Hbox } from '../option/Box';

const PREFIX = 'RSFButtonFilterGroup';

const defaultClasses = {
  root: `${PREFIX}-root`,
  matches: `${PREFIX}-matches`,
  button: `${PREFIX}-button`,
};

const Root = styled('div')(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  /**
   * Styles applied to the matching text.
   */
  [`& .${defaultClasses.matches}`]: {
    display: 'inline',
    ...theme.typography.caption,
    marginLeft: 2,
    color: theme.palette.grey[700],
  },

  /**
   * Styles applied to each button element.
   */
  [`& .${defaultClasses.button}`]: {
    fontWeight: 'normal',
    margin: theme.spacing(0, 0.5, 0.5, 0),
  },
}));

/**
 * A UI for grouping filters using buttons.
 */
export default function ButtonFilterGroup(props) {
  const { group, submitOnChange, classes: c = {} } = props;
  const classes = { ...defaultClasses, ...c };

  return useMemo(
    () => (
      <Root className={classes.root}>
        {group.options.map((facet, i) => {
          const selected = false; // Replace with your logic to determine selection
          const { matches, name } = facet;
          const handleClick = () => {
            // Handle click event
          };
          const Variant = SwatchProductOption; // Replace with your component variant logic

          return (
            <Variant
              key={i}
              classes={{ root: classes.button }}
              selected={selected}
              onClick={handleClick}
              label={
                <Hbox>
                  <span>{name}</span>
                  {matches ? <span className={classes.matches}>({matches})</span> : null}
                </Hbox>
              }
            />
          );
        })}
      </Root>
    ),
    [Object.values(props)],
  );
}

ButtonFilterGroup.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * Contains data for the group to be rendered.
   */
  group: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        matches: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  }),
  /**
   * Set to `true` if the filters will be submitted when changed. In this case, the footer will not be shown.
   */
  submitOnChange: PropTypes.bool,
};
