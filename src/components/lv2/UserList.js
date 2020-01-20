import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: 160,
    width: 440,
    overflow: 'scroll',
    padding: 16,
    margin: '0 0 16px 60px',
    border: props =>
      props.isActive ? `2px solid ${theme.palette.primary.light}` : 'none',
  },
  user: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export default props => {
  const { users, activeIndex } = props
  const isActive = activeIndex > -1
  const classes = useStyles({ isActive })

  const handleLinkToUser = (id, email) => {
    window.location.href = `/users/${id}/${email}`
  }

  return (
    <Paper className={classes.root}>
      <Typography>ラベル付けしたユーザー</Typography>
      {isActive ? (
        <ul>
          {users.map(user => {
            const [id, email] = user.split(' ')
            return (
              <li
                key={id}
                className={classes.user}
                onClick={() => handleLinkToUser(id, email)}
              >
                {email}
              </li>
            )
          })}
        </ul>
      ) : (
        <Typography variant="caption">
          下のグラフをクリックして, ラベル付けしたユーザーを確認
        </Typography>
      )}
    </Paper>
  )
}