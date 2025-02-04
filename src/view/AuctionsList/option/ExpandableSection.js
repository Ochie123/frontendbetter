import React from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import useStateFromProp from '../hooks/useStateFromProp'
import withDefaultHandler from '../utils/withDefaultHandler'

const PREFIX = 'RSFExpandableSection'

const defaultClasses = {
  root: `${PREFIX}-root`,
  margins: `${PREFIX}-margins`,
  caption: `${PREFIX}-caption`,
  expandedCaption: `${PREFIX}-expandedCaption`,
  details: `${PREFIX}-details`,
  summary: `${PREFIX}-summary`,
  summaryContent: `${PREFIX}-summaryContent`,
  summaryExpanded: `${PREFIX}-summaryExpanded`,
  expandIconExpanded: `${PREFIX}-expandIconExpanded`,
  summaryIconWrap: `${PREFIX}-summaryIconWrap`,
  withCollapseIcon: `${PREFIX}-withCollapseIcon`,
  expandedPanel: `${PREFIX}-expandedPanel`,
  title: `${PREFIX}-title`,
  expandIcon: `${PREFIX}-expandIcon`,
  collapseIcon: `${PREFIX}-collapseIcon`,
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: 'transparent',

    '&::before': {
      display: 'none',
    },

    '& > *:first-child': {
      padding: '0',
      minHeight: '0',
    },
  },

  /**
   * Styles applied to the root element if [`margins`](#prop-margins) is `true`.
   */
  [`& .${defaultClasses.margins}`]: {
    padding: `0 ${theme.spacing(2)}`,
  },

  /**
   * Styles applied to the caption element.
   */
  [`& .${defaultClasses.caption}`]: {
    transition: 'opacity .2s linear',
  },

  /**
   * Styles applied to the caption element when the section is expanded.
   */
  [`& .${defaultClasses.expandedCaption}`]: {
    opacity: 0,
  },

  /**
   * Styles applied to the body element of the expansion panel.
   */
  [`& .${defaultClasses.details}`]: {
    padding: theme.spacing(0, 0, 2, 0),
    display: 'flex',
    flexDirection: 'column',
  },

  /**
   * Styles applied to the summary element of the expansion panel.
   */
  [`& .${defaultClasses.summary}`]: {
    '&:first-of-type': {
      padding: theme.spacing(1, 0),
    },
  },

  /**
   * Styles applied to the content of the summary element of the expansion panel.
   */
  [`& .${defaultClasses.summaryContent}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    '[aria-expanded=true] > &': {
      margin: '0 !important',
    },
  },

  /**
   * Styles applied to the summary element of the expansion panel when the section is expanded.
   */
  [`& .${defaultClasses.summaryExpanded}`]: {},

  /**
   * Styles applied to the expand icon of the expansion panel when the section is expanded if the
   * [`ExpandIcon`](#prop-ExpandIcon) is different than the [`CollapseIcon`](#prop-CollapseIcon).
   */
  [`& .${defaultClasses.expandIconExpanded}`]: {},

  /**
   * Styles applied to the expand icon of the expansion panel when the [`ExpandIcon`](#prop-ExpandIcon)
   * is different than the [`CollapseIcon`](#prop-CollapseIcon).
   */
  [`& .${defaultClasses.summaryIconWrap}`]: {
    right: 0,
    padding: theme.spacing(0, 1),
  },

  /**
   * Styles applied to the summary element of the expansion panel.
   */
  [`& .${defaultClasses.withCollapseIcon}`]: {
    transform: 'rotate(0deg) !important',
  },

  /**
   * Styles applied to the root element when the section is expanded.
   */
  [`& .${defaultClasses.expandedPanel}`]: {
    '&$root': {
      margin: 0,
    },
  },

  /**
   * Styles applied to the title element.
   */
  [`& .${defaultClasses.title}`]: {},

  /**
   * Styles applied to the expand icon element.
   */
  [`& .${defaultClasses.expandIcon}`]: {
    height: 24,
    width: 24,
  },

  /**
   * Styles applied to the collapse icon element.
   */
  [`& .${defaultClasses.collapseIcon}`]: {
    height: 24,
    width: 24,
  },
}))

export {}

/**
 * An expandable info section.  Example:
 *
 * ```js
 *  <ExpandableSection title="Help" caption="Click here for more info">
 *    <Typography>This is a help section</Typography>
 *  </ExpandableSection>
 * ```
 */
export default function ExpandableSection(props) {
  const {
    classes: c = {},
    children = [],
    title,
    caption,
    expanded,
    defaultExpanded,
    ExpandIcon,
    CollapseIcon,
    margins,
    onChange,
    ...others
  } = props
  const classes = { ...defaultClasses, ...c }

  const [expandedState, setExpandedState] = useStateFromProp(expanded || defaultExpanded || false)

  /**
   * Gets the classes for the AccordionSummary
   * Here we add a class to remove the rotate transform if we're using a
   * separate icon for the collapse state.
   */
  function getSummaryClasses() {
    const result = {
      root: clsx({ [classes.summary]: true, [classes.summaryExpanded]: expandedState }),
      content: classes.summaryContent,
      expandIcon: clsx({
        [classes.summaryIconWrap]: true,
        [classes.expandIconExpanded]: expandedState,
      }),
    }

    if (CollapseIcon !== ExpandIcon) {
      result.expandIcon = classes.withCollapseIcon
    }

    return result
  }

  const handleChange = withDefaultHandler(onChange, (e, expanded) => {
    if (props.expanded == null) {
      setExpandedState(expanded)
    }
  })

  return (
    <StyledAccordion
      classes={{
        root: clsx({
          [classes.root]: true,
          [classes.margins]: margins,
        }),
        expanded: classes.expandedPanel,
      }}
      expanded={expandedState}
      defaultExpanded={defaultExpanded}
      {...others}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={
          expandedState ? (
            <CollapseIcon className={classes.collapseIcon} />
          ) : (
            <ExpandIcon className={classes.expandIcon} />
          )
        }
        classes={getSummaryClasses()}
      >
        <Typography variant="subtitle1" className={classes.title}>
          {title}
        </Typography>
        {caption && (
          <Typography
            variant="caption"
            className={clsx({
              [classes.caption]: true,
              [classes.expandedCaption]: expandedState,
            })}
          >
            {caption}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.details }}>{children}</AccordionDetails>
    </StyledAccordion>
  )
}

ExpandableSection.propTypes = {
  /**
   * The title for the header of the expandable section.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Text to display to the right of the heading.
   */
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * The icon to use for collapsed groups.
   */
  ExpandIcon: PropTypes.elementType,

  /**
   * The icon to use for expanded groups.
   */
  CollapseIcon: PropTypes.elementType,

  /**
   * If `false`, the default left and right margins are removed.
   */
  margins: PropTypes.bool,

  /**
   * Can be defined to control the expanded state externally with props, rather than having it
   * controlled internally by state.
   */
  expanded: PropTypes.bool,

  /**
   * Defaults the panel to being expanded, without controlling the state.
   */
  defaultExpanded: PropTypes.bool,
  classes: PropTypes.object,
  onChange: PropTypes.func,
}

ExpandableSection.defaultProps = {
  margins: true,
  defaultExpanded: false,
  ExpandIcon: ExpandMoreIcon,
  CollapseIcon: ExpandMoreIcon,
}
