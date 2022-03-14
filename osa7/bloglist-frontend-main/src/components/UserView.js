import { useSelector } from 'react-redux'
import SingleUser from './SingleUser'

const UserView = () => {
  const users = useSelector(state => state.users)

  return (
      <div>
        <h4>USERS</h4>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {users.map(ur =>
                    <SingleUser key={ur.id} user={ur}/>
                )}
            </tbody>
        </table>
      </div>
  )
}

export default UserView