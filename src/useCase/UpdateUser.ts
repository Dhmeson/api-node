import { User } from '../entity/User';
import { UserUpdateInput } from '../types/user';

export function UpdateUser(user: User, data: UserUpdateInput) {
  user.update(data);
}
