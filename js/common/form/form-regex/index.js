import { msg } from 'plume2';
import { ValidConst } from 'wmkit';

// interface ICheckParams {
//     required?  ;//是否必填
//     maxLength?: number;//最长长度
//     minLength?: number;//最短长度
//     regexString?  ;//直接传入正则表达式
//     regexType?  ;//RegexMap中定义的公用正则
// }

/**
 * 表单判断组件
 *
 * 调用方式：
 *     let checkType = {required : true , maxLength : 100 };
 *     let flag = FormRegexUtil( params , "开户行" , checkType );
 *
 * @param value
 * @param keyString
 * @param checkParams
 * @returns {boolean}
 * @constructor
 */

export default function FormRegexUtil(
  value,
  keyString,
  checkParams = {
    required: false,
    maxLength: null,
    minLength: null,
    regexString: null,
    regexType: null,
    pic: false
  }
) {
  let type = checkParams.regexType;

  if(type === 'mobile'){
    type = 'phone'
  }

  if(type === 'number'){
    type = 'num'
  }
  //公用的正则可以在这配置，通过{regexType}参数传入
  let RegexMap = {
    accountNo: '^([1-9]{1})(\\d{15}|\\d{18})$',
    [checkParams.regexType]: ValidConst[type],
    letter: '^[a-zA-Z]*$',
    'number&-': '^[0-9-]*$',
    'number&letter': '^[0-9a-zA-Z]*$'
  };

  let alertString;
  let flag = true;
  if (checkParams.required) {
    if (!value || '' === value.toString().trim()) {
      //是图片的时候，提示文字为"请上传"……
      if (checkParams.pic) {
        alertString = '请上传' + keyString;
      } else {
        alertString = '请填写' + keyString;
      }
      flag = false;
    }
  }
  if (flag && value && (checkParams.maxLength || checkParams.minLength)) {
    if (checkParams.maxLength && checkParams.minLength) {
      if (
        value.length < checkParams.minLength ||
        value.length > checkParams.maxLength
      ) {
        alertString =
          keyString +
          ' 应该在' +
          checkParams.minLength +
          '～' +
          checkParams.maxLength +
          '个字符之间';
        flag = false;
      }
    } else if (checkParams.maxLength && value.length > checkParams.maxLength) {
      alertString = keyString + ' 不能大于' + checkParams.maxLength + '个字符';
      flag = false;
    } else if (checkParams.minLength && value.length < checkParams.minLength) {
      alertString = keyString + ' 不能小于' + checkParams.minLength + '个字符';
      flag = false;
    }
  }

  if (flag) {
    //{regexString},{regexType}同为正则判断
    //{regexString}优先级高于{regexType}
    //假如传如的{regexType}在RegexMap中不存在，则提示error
    if (checkParams.regexString && '' !== checkParams.regexString) {
      flag = new RegExp(checkParams.regexString).test(value);
      if (!flag) {
        alertString = keyString + ' 输入错误';
      }
    } else if (checkParams.regexType && '' !== checkParams.regexType) {
      let _regexType = checkParams.regexType;
      if (RegexMap.hasOwnProperty(_regexType)) {
        flag = new RegExp(RegexMap[_regexType]).test(value);
        if (!flag) {
          alertString = keyString + ' 输入错误';
        }
      } else {
        flag = false;
      }
    }
  }
  if (alertString && alertString !== '') {
    msg.emit('app:tip', alertString);
  }
  return flag;
}
