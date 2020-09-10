import Cookies from 'js-cookie'

const expireData = 1000
var cookie_storage = new Cookie_Storage()
// 定义缓存数据的操作工具类
function Cookie_Storage() {
  this.getInstance = function() {
    if (!cookie_storage) {
      cookie_storage = new Cookie_Storage()
    }
    return cookie_storage
  }
}
// 保存cookie操作
Cookie_Storage.prototype.setBlmCookie = function(cname, cvalue, expire) {
  Cookies.set(cname, cvalue, { expires: expire, path: './' })
}
// sessionStorage兼容不了Sessionlstrong 用cookie保存
Cookie_Storage.prototype.setBlmSessionStorage = function(key, value) {
  try {
    sessionStorage.setItem(key, value)
  } catch (error) {
    Cookies.set(key, value, { expires: expireData, path: './' })
  }
}
// localStorage 兼容不了localstrong 用cookie保存
Cookie_Storage.prototype.setBlmLocalStorage = function(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    Cookies.set(key, value, { expires: expireData, path: './' })
  }
}
// 获取cookie
Cookie_Storage.prototype.getBlmCookie = function(key) {
  return Cookies.get(key)
}
// 获取sessionStorage
Cookie_Storage.prototype.getBlmSessionStorage = function(key) {
  var session = sessionStorage.getItem(key)
  if (!session) {
    session = Cookies.get(key)
  }
  return session
}
// 获取localStorage
Cookie_Storage.prototype.getBlmLocalStorage = function(key) {
  var local = localStorage.getItem(key)
  if (!local) {
    local = Cookies.get(key)
  }
  return local
}

// 清除cookie
Cookie_Storage.prototype.removeCookie = function(cname) {
  Cookies.remove(cname)
}

// 清除sessionStorage
Cookie_Storage.prototype.removeSession = function(key) {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    Cookies.remove(key)
  }
}
// 清除localStorage
Cookie_Storage.prototype.removeLocal = function(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    Cookies.remove(key)
  }
}

export default cookie_storage
