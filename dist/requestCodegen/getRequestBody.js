"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = void 0;
const utils_1 = require("../utils");
function getRequestBody(requestBody) {
    // 如果是空则直接反回
    if (requestBody.content == null)
        return;
    let imports = [];
    let bodyType = '';
    const allContent = Object.keys(requestBody.content);
    // 默认去application/json的定义，如果取不到则直接取第一个
    let reqBody = requestBody.content["application/json"];
    if (reqBody == null) {
        reqBody == requestBody.content[allContent[0]];
    }
    // console.log("reqBody:", JSON.stringify(reqBody));
    if (reqBody == null) {
        return { imports, bodyType };
    }
    if (reqBody.schema) {
        if (reqBody.schema.items) {
            bodyType = (0, utils_1.refClassName)(reqBody.schema.items.$ref);
            if (reqBody.schema.type && reqBody.schema.type === 'array') {
                bodyType += '[]';
            }
        }
        else if (reqBody.schema.$ref) {
            bodyType = (0, utils_1.refClassName)(reqBody.schema.$ref);
            // console.log('propType', refClassName(p.schema.$ref))
        }
        if (bodyType) {
            imports.push(bodyType);
            bodyType = `
      /** requestBody */
      body?:${bodyType},`;
        }
    }
    // console.log("reqbody imports", imports);
    return { imports, bodyType };
}
exports.getRequestBody = getRequestBody;
//# sourceMappingURL=getRequestBody.js.map