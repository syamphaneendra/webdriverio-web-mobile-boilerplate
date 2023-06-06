import yargs from 'yargs';

let args: any = yargs(process.argv.slice(2)).argv;
console.log('Environment: ' + args.Env);

class Arguments {
  getArgumentValue = async (parameter: string) => {
    return args[`${parameter}`];
  };
}
export default new Arguments();
