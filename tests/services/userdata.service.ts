import Arguments from '../utils/arguments.utils.ts';
import { Users } from '../types/Users';
import JsonUtils from '../utils/json.utils.ts';

let environment: any = await Arguments.getArgumentValue('Env');
console.log('Environment: ' + environment);

const userdata = await import(`../../testdata/${environment}/user_data.json`, {
  assert: { type: 'json' }
});

class UserDataService {
  public getUserByType = async (usertype: string): Promise<Users> => {
    const jsonArray = await JsonUtils.objectToJSONArrayWithoutKey(userdata);
    const user: Users = await jsonArray.find((user) => {
      return user.userType === usertype;
    });
    return user;
  };
}
export default new UserDataService();
