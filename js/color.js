function color_change(color) {
    if(color == "square") {
        $(".color-change").removeClass("rain-color tree-color");
        $(".color-change-bg").removeClass("rain-color-bg tree-color-bg");
        $(".color-change-bg-hover").removeClass("rain-color-bg-hover tree-color-bg-hover");
        $(".color-change-border").removeClass("rain-color-border tree-color-border");

        $(".color-change").addClass("square-color");
        $(".color-change-bg").addClass("square-color-bg");
        $(".color-change-bg-hover").addClass("square-color-bg-hover");
        $(".color-change-border").addClass("square-color-border");

        cancelAnimationFrame(myReq);
        myReq = animate_square();
    }else if(color == "rain"){
        $(".color-change").removeClass("tree-color square-color");
        $(".color-change-bg").removeClass("tree-color-bg square-color");
        $(".color-change-bg-hover").removeClass("tree-color-bg-hover square-color");
        $(".color-change-border").removeClass("tree-color-border square-color-border");

        $(".color-change").addClass("rain-color");
        $(".color-change-bg").addClass("rain-color-bg");
        $(".color-change-bg-hover").addClass("rain-color-bg-hover");
        $(".color-change-border").addClass("rain-color-border");

        cancelAnimationFrame(myReq);
        myReq = animate_rain();
    }else if(color == "tree"){
        $(".color-change").removeClass("rain-color square-color");
        $(".color-change-bg").removeClass("rain-color-bg square-color");
        $(".color-change-bg-hover").removeClass("rain-color-bg-hover square-color");
        $(".color-change-border").removeClass("rain-color-border square-color-border");

        $(".color-change").addClass("tree-color");
        $(".color-change-bg").addClass("tree-color-bg");
        $(".color-change-bg-hover").addClass("tree-color-bg-hover");
        $(".color-change-border").addClass("tree-color-border");

        cancelAnimationFrame(myReq);
        myReq = animate_tree();
    }else {
        cancelAnimationFrame(myReq);
    }

}