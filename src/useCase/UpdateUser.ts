import { User } from 'src/entity/User'
import { UserUpdateInput } from 'src/types/user'

export function UpdateUser(user: User, data: UserUpdateInput) {
	user.update(data)
}
