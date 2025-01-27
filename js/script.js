//----네비바 ----

$(function () {
  // 1차 메뉴에 마우스를 올렸을 때 서브메뉴와 배경이 나타남
  $(".nav > ul > li").mouseenter(function () {
    $(".submenu, .menuBg").stop().slideDown();
  });

  // 마우스가 .nav나 .menuBg에서 벗어났을 때만 슬라이드 업
  $(".nav, .menuBg").mouseleave(function () {
    $(".submenu, .menuBg").stop().slideUp();
  });

  // 마우스가 서브메뉴나 배경에 있으면 슬라이드 업을 방지
  $(".submenu, .menuBg").mouseenter(function () {
    $(".submenu, .menuBg").stop().slideDown();
  });


  

  //슬라이드 
  $(document).ready(function() {
    let currentIndex = 0; // 현재 이미지 인덱스
    const totalSlides = 3; // 슬라이드 총 개수
    
    // 페이지네이션 업데이트 함수 (프로그래스 바)
    function updatePagination() {
      const progressWidth = ((currentIndex + 1) / totalSlides) * 100;
      $('.progress').css('width', progressWidth + '%'); // 현재 슬라이드에 해당하는 비율로 프로그래스 바 길이 조정
    }
  
    // 슬라이드 전환 함수
    setInterval(function() {
      let nextIndex = (currentIndex + 1) % totalSlides; // 0, 1, 2 순으로 반복
  
      // 현재 슬라이드 숨기기
      $('.slider').eq(currentIndex).fadeOut();
      // 다음 슬라이드 나타내기
      $('.slider').eq(nextIndex).fadeIn();
  
      // 페이지네이션 업데이트
      currentIndex = nextIndex;
      updatePagination(); // 페이지네이션 갱신
    }, 3000); // 3초마다 실행
  });
});

//pagination

$(function () {
  const $swiperPagination = $(".swiper-pagination");

  if ($swiperPagination.length) {
    $swiperPagination.css("bottom", "65px"); // 초기 로딩 시 위치 조정

    $(window).on("scroll", function () {
      $swiperPagination.css("bottom", "65px"); // 스크롤 시 위치 조정
    });
  }
});

// ---- contents-1 ----

$(function () {
  // $(document).ready(function() {의 단축형
  function checkVisibility() {
    var windowHeight = $(window).height();
    var windowTop = $(window).scrollTop();
    var elementTop = $(".text-1").offset().top;

    if (windowTop + windowHeight > elementTop + 100) {
      // 요소가 화면에 일정 부분 이상 보일 때
      $(".text-1").addClass("show");
    } else {
      $(".text-1").removeClass("show");
    }
  }

  $(window).on("scroll", checkVisibility);
  checkVisibility(); // 페이지 로드 시 체크
});

// 신제품

$(function () {
  const sections = $(".contents-1"); // 모든 섹션을 가져옵니다.
  let currentIndex = 0; // 현재 인덱스

  function updateSection(index) {
    // 현재 섹션에서 애니메이션 클래스를 제거
    sections.removeClass("active").find(".text-1").removeClass("show");

    // 잠시 지연시켜 애니메이션이 제대로 리셋되도록 함
    setTimeout(() => {
      sections.hide();
      // 현재 인덱스의 섹션을 표시하고 애니메이션 클래스를 추가
      sections.eq(index).show().addClass("active");

      // 섹션이 표시된 후 애니메이션 클래스를 추가
      setTimeout(() => {
        sections.eq(index).find(".text-1").addClass("show");
      }, 10); // 애니메이션이 잘 보이도록 지연
    }, 1000); // 섹션 전환에 대한 지연
  }

  // 이전 버튼 클릭 이벤트
  $("#prev-btn").on("click", function () {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    updateSection(currentIndex);
  });

  // 다음 버튼 클릭 이벤트
  $("#next-btn").on("click", function () {
    currentIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    updateSection(currentIndex);
  });

  // 초기 섹션 표시
  updateSection(currentIndex);
});

// ---- 인테리어 -----

$(function () {
  let currentIndex = 0;
  const images = $(".carousel-image");
  const totalImages = images.length;

  // 캐러셀 업데이트 함수
  function updateCarousel() {
    images.removeClass("active").eq(currentIndex).addClass("active");
    $(".image-counter").text(currentIndex + 1 + "/" + totalImages);
  }

  // 왼쪽 화살표 클릭 이벤트
  $(".left-arrow").click(function () {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1;
    updateCarousel();
  });

  // 오른쪽 화살표 클릭 이벤트
  $(".right-arrow").click(function () {
    currentIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // 초기 캐러셀 상태 설정
  updateCarousel();
});



// widget
$(document).ready(function () {
  const $widget = $('.widget');  // 위젯
  const $slideBox = $('.slide-box');  // 슬라이드 영역

  // IntersectionObserver로 슬라이드 영역의 가시성을 감지
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 슬라이드 영역이 화면에 보일 때 위젯 숨기기
          $widget.addClass('hidden');
        } else {
          // 슬라이드 영역이 화면을 벗어나면 위젯 보이기
          $widget.removeClass('hidden');
        }
      });
    },
    {
      root: null,  // viewport 기준
      threshold: 0.1  // 슬라이드 영역의 10% 이상이 화면에 보이면 감지
    }
  );

  // 슬라이드 영역에 대한 observer 시작
  observer.observe($slideBox[0]);
});
//반응형 카테고리

$(document).ready(function() {
  // 메뉴 토글 버튼 클릭
  $('.menu-toggle').click(function() {
    var $menu = $('#menu');
    var isExpanded = $(this).attr('aria-expanded') === 'true';
    
    $(this).attr('aria-expanded', !isExpanded);
    $menu.attr('aria-hidden', isExpanded);
    $menu.slideToggle();
  });

  // X 아이콘 클릭 시 메뉴 닫기
  $('.menu-close').click(function() {
    var $menu = $('#menu');
    $('.menu-toggle').attr('aria-expanded', 'false');
    $menu.attr('aria-hidden', 'true');
    $menu.slideUp();
  });

  // 1차 메뉴 클릭 시 2차 메뉴 열기/닫기
  $('.menu ul li > a').click(function(e) {
    e.preventDefault(); // 기본 링크 동작을 막음
    var $subMenu = $(this).next('.sub');
    
    // 다른 열려있는 2차 메뉴를 닫기
    $('.menu ul li').not($(this).parent()).removeClass('open').find('.sub').slideUp();

    // 현재 클릭된 메뉴에 맞는 2차 메뉴 토글
    $(this).parent().toggleClass('open');
    $subMenu.slideToggle();
  });



});



// d-notice

// 모든 텍스트 요소 가져오기
const txtElements = document.querySelectorAll('.d-txt');
let currentIndex = 0; // 현재 표시 중인 텍스트 인덱스

// 다음 텍스트 표시 함수
function showNextText() {
  // 현재 텍스트를 사라지게 설정
  const currentElement = txtElements[currentIndex];
  currentElement.classList.remove('show');
  currentElement.classList.add('hide');

  // 다음 텍스트로 이동 (마지막 요소 다음은 첫 번째로 돌아감)
  currentIndex = (currentIndex + 1) % txtElements.length;
  const nextElement = txtElements[currentIndex];

  // 다음 텍스트를 보이게 설정
  nextElement.classList.remove('hide');
  nextElement.classList.add('show');
}

// 초기 상태에서 첫 번째 텍스트 표시
txtElements[currentIndex].classList.add('show');

// 3초마다 텍스트 변경
setInterval(showNextText, 3000);

//슬라이드





// 밑줄 효과

document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('.title-underline');

  const handleScroll = () => {
    titles.forEach((title) => {
      const rect = title.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        title.classList.add('active');
      } else {
        title.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 초기 로드 시 호출
});





// 글자 애니메이션

document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');

  const handleScroll = () => {
    fadeInElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        const delay = el.dataset.delay || 0; // 데이터 속성으로 딜레이 값을 가져옴
        setTimeout(() => {
          el.classList.add('visible');
        }, delay * 1000); // 딜레이를 초 단위로 적용
      } else {
        el.classList.remove('visible'); // 요소가 화면에서 벗어나면 클래스 제거
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 초기 로드 시 호출
});


