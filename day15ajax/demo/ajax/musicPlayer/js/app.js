/*
	html5播放器
		1）ajax加载数据
		2）暂停/播放
		3）上一曲/下一曲
		4）点击歌曲列表播放
		5）静音
		6）点击改变播放进度
		7）实时显现播放进度（时间显示）
		8）支持播放模式：
			0:单曲播放,1:单曲循环,2:列表播放,3:列表循环,4:随机播放
 */
document.addEventListener('DOMContentLoaded',function(){
	// 获取页面元素
	var ePlayer = document.querySelector('.player');
	var eTitle = ePlayer.querySelector('h1.title');
	var eList = ePlayer.querySelector('.player .list');
	var btnPlay = ePlayer.querySelector('#btnPlay');
	var btnPrev = ePlayer.querySelector('#btnPrev');
	var btnNext = ePlayer.querySelector('#btnNext');
	var eModels = ePlayer.querySelectorAll('.play-model > span');
	var btnVolume = ePlayer.querySelector('#btnVolume');
	var eProgress = ePlayer.querySelector('progress');
	var eTime = eProgress.nextElementSibling;
	var eAlbum = btnPlay.previousElementSibling;

	// 方便事件绑定，扩展Audio原型对象
	Audio.prototype.on = function(type,fn){
		this.addEventListener(type,fn,false);
		return this;
	}

	// 创建播放器
	var player = new Audio();
	var playlist = [];
	var opt = {
		index:0, //播放索引
		playModel:2, //播放模式：0:单曲播放,1:单曲循环,2:列表播放,3:列表循环,4:随机播放
		volume:0.5 //音量
	};


	// 获取播放列表
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			var res = JSON.parse(xhr.responseText);
			playlist = res;

			
			var ol = document.createElement('ol');
			res.forEach(function(item,idx){
				var li = document.createElement('li');
				li.dataset.index = idx;
				li.innerHTML = '<a href="#">'+ item.singer + ' - ' + item.name +'</a>';

				if(idx === opt.index) li.className = 'active';
				ol.appendChild(li);
			});
			eList.appendChild(ol);

			// 默认播放第一首
			play();
		}
	}


	init();

	// 更改播放状态
	// 播放完后自动播放下一首
	player.on('ended',function(){
		// 判断播放模式
		switch(opt.playModel){
			// 单曲循环
			case 1:
				play();
				break;

			// 列表播放
			case 2:
				if(opt.index < playlist.length-1){
					opt.index++;
					play();
				}
				break;

			// 列表循环
			case 3:
				opt.index++;
				play();
				break;

			// 随机播放
			case 4:
				opt.index = Math.round(Math.random()*playlist.length);
				play();

			// 默认单曲播放
			default:

		}
	})

	// 进度条与事件
	.on('timeupdate',function(){
		updateStatus();
	})

	// 播放暂停事件
	.on('play',function(){
		btnPlay.classList.add('icon-pause');
		eAlbum.classList.add('playing');
		eAlbum.style.animationPlayState = 'running';

		// 高亮歌曲
		var songs = eList.querySelectorAll('li');
		for(var i=0;i<songs.length;i++){
			songs[i].className = opt.index == i ? 'active' : '';
		}

		// 改变标题图片
		eTitle.innerHTML = playlist[opt.index].singer + ' - ' + playlist[opt.index].name;
		eAlbum.src = playlist[opt.index].album;
	})
	.on('pause',function(){
		btnPlay.classList.remove('icon-pause');
		eAlbum.style.animationPlayState = 'paused';
	})

	.on('canplaythrough',player.play);

	function init(){
		// 获取音乐数据
		xhr.open('get','playlist.json',true);
		xhr.send(null);

		// 根据默认参数更改UI状态
		for(var i=0;i<eModels.length;i++){
			if(opt.playModel == eModels[i].dataset.model){
				eModels[i].classList.add('active');
			}

			// 绑定模式点击事件
			eModels[i].onclick = function(){
				opt.playModel = parseInt(this.dataset.model);console.log(opt)
				for(var i=0;i<eModels.length;i++){
					eModels[i].classList.remove('active');
				}
				this.classList.add('active');
			}
		}

		// 播放暂停
		btnPlay.onclick = function(){
			if(player.paused){
				player.play();
			}else{
				player.pause();
			}
		}

		// 上一首
		btnPrev.onclick = function(){
			opt.index--;
			play();
		}

		// 下一首
		btnNext.onclick = function(){
			opt.index++;
			play();
		}

		// 音量控制
		btnVolume.onclick = function(){
			if(player.muted){
				this.classList.remove('icon-mute');
			}else{
				this.classList.add('icon-mute');
			}
			player.muted = !player.muted;
		}

		// 改变播放进度
		eProgress.onclick = function(e){
			var left = e.offsetX;
			player.currentTime = e.offsetX*player.duration/this.offsetWidth;
		}

		// 点击列表播放
		eList.onclick = function(e){
			var self = e.target;
			var idx = self.dataset.index;
			while(idx===undefined){
				self = self.parentNode;
				idx = self.dataset.index;
			}
			opt.index = parseInt(idx);
			play();

			e.preventDefault();
		}


	}

	function play(autoPlay){
		if(opt.index<0){
			opt.index = playlist.length-1;
		}else if(opt.index >= playlist.length){
			opt.index = 0;
		}

		player.src = playlist[opt.index].src;

		// 自动播放
		// if(autoPlay) player.play();
	}

	function updateStatus() {
        var timeLeft = player.duration - player.currentTime;
        var minLeft = parseInt(timeLeft / 60);
        var secondLeft = parseInt(timeLeft % 60);
        eTime.innerText = '-' + minLeft + ':' + (secondLeft < 10 ? '0' + secondLeft : secondLeft);
        eProgress.value = player.currentTime * 100 / player.duration;
    }
});