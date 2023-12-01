/*
 * @Author: zd
 * @Date: 2023-10-01 02:10:51
 * @LastEditors: zd
 * @LastEditTime: 2023-12-01 15:52:01
 * @Description: 公共方法
 */
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

// 先MD5加密后RSA加密
export const goEncryptPassword = password => {
  const passwordMD5 = CryptoJS.MD5(password).toString()
  
  function goEncryptRSA (passwordMD5) {
    const encryptor = new JSEncrypt()
    const publicKey = `公钥哈`
    encryptor.setPublicKey(publicKey)
    return encryptor.encrypt(passwordMD5)
  }

  return goEncryptRSA(passwordMD5)
}
