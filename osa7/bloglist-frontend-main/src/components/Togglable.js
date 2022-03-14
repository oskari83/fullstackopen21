import { useImperativeHandle, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVisible } from '../reducers/visibleReducer'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const visible = useSelector(state => state.visible[0])
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(setVisible({
      id: 0,
      value: !visible,
    })
  )}

  useImperativeHandle(ref, () => {
      return {
          toggleVisibility
      }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable