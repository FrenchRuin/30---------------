/*
	알고리즘 == 로직 == 레시피
	
	1. 클릭한 인디케이터(a)가 몇번째 요소인지를 나타내는 index 번호를 추출
	
	2. 그 index 번호에 해당하는 a 요소의 부모에 .on 클래스를 추가한다.
	
	3. 그 index 번호에 해당하는 a 요소의 부모의 형제에 해당하는 다른 li에게서 .on 클래스를 제거한다.
	
	4. index 번호에 매칭되는 슬라이드가 보일 수 있도록 .slides-container를 이동한다.
*/
//표준계열 브라우저(Others)
document.addEventListener('DOMContentLoaded', function () {

	//배열형식으로 저장 [?,?,?...]
	const $indicators = document.querySelectorAll('.slides > .slides-pagination > li > a');
	const $container = document.querySelector('.slides > .slides-container');
	const $btnPrev = document.querySelector('.slides>a.prev')
	const $btnNext = document.querySelector('.slides>a.next')

	const $btnPlay = document.querySelector('.slides>.play')
	const $btnStop = document.querySelector('.slides>.stop')

	let intervalKey = null;

	let nowIdx = 0;//현재 보여지고 있는 슬라이드의 인덱스번호
	let oldIdx = nowIdx;//직전에 보여졌던 슬라이드의 인덱스번호

	//5개의 indicator에 대한 클릭 이벤트 구문
	$indicators.forEach(function ($indicator, idx) {
		$indicator.addEventListener('click', function (evt) {
			evt.preventDefault();

			oldIdx = nowIdx;
			nowIdx = idx;
			console.log('nowIdx=', nowIdx);

			//console.log('this=',this);//이번에 클릭한 요소
			//console.log('this.parentElement=',this.parentElement);//이번에 클릭한 요소의 부모

			const $parent = this.parentElement;//이번에 클릭한 요소의 부모
			$parent.classList.add('on');

			//이전 $indicator에 붙어있던 on 제거
			$indicators[oldIdx].parentElement.classList.remove('on');

			//컨테이너 이동
			$container.style.left = -(1120 * nowIdx) + "px";
		});
	});

	// 이전버튼
	$btnPrev.addEventListener('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx

		// nowIdx 추출
		if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = 4;
		}

		// 인디케이터 활성화표시
		$indicators[nowIdx].parentElement.classList.add('on')
		$indicators[oldIdx].parentElement.classList.remove('on')


		// 컨테이너 이동
		$container.style.left = -1120 * (nowIdx) + "px"
	})

	//다음버튼
	$btnNext.addEventListener('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;

		if (nowIdx < 4) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}

		$indicators[nowIdx].parentElement.classList.add('on')
		$indicators[oldIdx].parentElement.classList.remove('on')

		$container.style.left = -1120 * (nowIdx) + "px"
	})

	// 자동실행 
	$btnPlay.addEventListener('click', function () {
		clearInterval(intervalKey);
		intervalKey = setInterval(function () {

			$btnNext.click();
		}, 2000)
	})

	$btnStop.addEventListener('click', function () {
		clearInterval(intervalKey);
	})
});
























