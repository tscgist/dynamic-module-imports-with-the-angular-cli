export class RegisteredModules {
    public modules: Array<any> = [
        {
            "name" : "reverse",
            "path": "./string-helpers",
            "local-name": "reverseString",
            "callback" : (module, parent) => {
                parent.name = module.reverseString(parent.name);
            }
        },
        {
            "name" : "log",
            "callback" : (str: string) => {
                console.info(str);
            }
        }
    ];

    constructor(){}
}
