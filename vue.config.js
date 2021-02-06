module.exports = {
	configureWebpack: {
		resolve: {
			// extensions: [], 配置后缀名 已自动配置
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'network': '@/network',
				'components': '@/components',
				'views': '@/views'
			}
		}
	}
}