import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { CircularProgress, Button } from '@mui/material'
import clsx from 'clsx'
import VisibilitySensor from 'react-visibility-sensor'

const PREFIX = 'RSFShowMore'

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
  loading: `${PREFIX}-loading`,
}

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`& .${classes.root}`]: {
    margin: '15px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  /**
   * Styles applied to the button element.
   */
  [`& .${classes.button}`]: {
    [theme.breakpoints.down('sm')]: {
      flex: 1,
    },
  },

  /**
   * Styles applied to the loading icon.
   */
  [`& .${classes.loading}`]: {
    display: 'flex',
    height: 45,
    justifyContent: 'center',
  },
}))

const VARIANTS = {
  BUTTON: 'button',
  INFINITE: 'infinite',
}

export default function ShowMore({
  className,
  style,
  children,
  variant,
  href,
  infiniteLoadOffset,
  renderLoadingIcon,
  onLoadMore,
  isLoading,
  hasMore,
}) {
  const [loading, setLoading] = useState(false)

  async function fetchMore() {
    if (!loading) {
      setLoading(true)

      try {
        await onLoadMore()
      } finally {
        setLoading(false)
      }
    }
  }

  function handleVisible(isVisible) {
    if (isVisible && hasMore && !isLoading) {
      fetchMore()
    }
  }

  if (variant === VARIANTS.INFINITE) {
    return (
      <VisibilitySensor
        onChange={handleVisible}
        partialVisibility
        offset={{ bottom: -infiniteLoadOffset }}
      >
        <div className={clsx(classes.loading, className)} style={style}>
          {renderLoadingIcon()}
        </div>
      </VisibilitySensor>
    )
  }
  
  return (
    <div className={clsx(classes.root, className)} style={style}>
      {isLoading ? (
        <div className={classes.loading}>{renderLoadingIcon()}</div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          href={href}
          className={classes.button}
          onClick={fetchMore}
        >
          {children || 'Show More'}
        </Button>
      )}
    </div>
  )
}

ShowMore.propTypes = {
  renderLoadingIcon: PropTypes.func,
  variant: PropTypes.oneOf([VARIANTS.BUTTON, VARIANTS.INFINITE]),
  infiniteLoadOffset: PropTypes.number,
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
}

ShowMore.defaultProps = {
  renderLoadingIcon: () => <StyledCircularProgress />,
  variant: VARIANTS.BUTTON,
  infiniteLoadOffset: 200,
}
