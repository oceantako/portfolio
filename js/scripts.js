/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//説明モーダルのオープン処理
function open_explain(title) {
    // モーダルタイトル編集
    let title_elm = document.getElementById("explain_modal_title");
    title_elm.innerHTML = works_library[title]["title"];

    // モーダル説明文編集
    let explain_elm = document.getElementById("explain_modal_explain");
    explain_elm.innerHTML = works_library[title]["explain"];

    // モーダル写真編集
    let image_elm = document.getElementById("explain_modal_image");
    image_elm.setAttribute("src", works_library[title]["image"]);

    let image_elm2 = document.getElementById("explain_modal_image2");
    image_elm2.setAttribute("src", works_library[title]["image2"]);

    let image_elm3 = document.getElementById("explain_modal_image3");
    image_elm3.setAttribute("src", works_library[title]["image3"]);

    // モーダルダウンロードリンク編集
    let file_elm = document.getElementById("explain_modal_footer");
    file_elm.setAttribute("href", works_library[title]["github"]);

    // モーダルリンク先編集
    let link_elm = document.getElementById("link_modal_footer");
    link_elm.setAttribute("href", works_library[title]["link"]);

    const explainModal = new bootstrap.Modal(document.getElementById('exampleModal2'), {});
    explainModal.show();
}

//プログレスバーのアニメーション
(() => {
    const elements = document.getElementsByClassName('scroll-action');
    for (const elm of elements) {
            const observer = new IntersectionObserver((entries) => {
                for (const e of entries) { 
                    if (e.isIntersecting) {
                        p = elm.getAttribute("percent")
                        elm.setAttribute("style","width: "+ p + "%");
                    } else {
                        elm.setAttribute("style","width: 0%");
                    }
                }
            });
        observer.observe(elm);
    }
})();
