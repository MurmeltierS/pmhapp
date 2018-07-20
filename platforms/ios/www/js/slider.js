class Slider {
    static slideTo(pIndex) {
        currentIndex = pIndex;
        $swipeTabs.removeClass(activeTabClassName);
        $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
        $swipeTabsContainer.slick('slickGoTo', currentIndex);
        $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
        localStorage.setItem('first2', 'on');
    }
}