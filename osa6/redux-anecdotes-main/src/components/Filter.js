import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
      props.setFilter(event.target.value)
      //dispatch(setFilter(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}

const mapDispatchToProps = {
  setFilter: setFilter,
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)
