# leaflet-webpack
主要解决在webpack中引入Leaflet报错的问题。
### 1 安装leaflet
	
	npm install leaflet
### 2 配置webpack
核心是要对CSS中的png文件进行处理，不然webpack会报错

	
	{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'styles/[name].[ext]',
            context: ''}
          }
        ]
    }
### 3 引入leaflet

	import 'leaflet/dist/leaflet.css';
	var L = require("leaflet")
### 4 重置leaflet的icon
	
	
	delete L.Icon.Default.prototype._getIconUrl;

	L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
	});	
此步非常重要，不重置的话内置的marker图片找不到
### 5创建map并运行

	var map = L.map('map').setView([51.505, -0.09], 13);
	L.Icon.Default.imagePath = 'styles/';
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

命令行执行下面的命令：

	npm run start