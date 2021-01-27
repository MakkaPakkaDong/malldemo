import { request } from './request'

export function getHomeMultidata() {
	return request({
		url: '/home/multidata'
	})
}

export function getHomeGoods(type, page) {
	return request({
		url: '/home/data',
		params: {
			type,
			page
		}
	})
}

// let a = []
// const num1 = [1, 2, 3]
// a.push(...num1)
// es6解构 将num1的元素塞入a数组中
// 也可for遍历 直接赋值不可取