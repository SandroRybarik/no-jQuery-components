function tabs () {
  this.isVisible = true;
  
  this.open = function(wrap, hiding, animationDuration){
    var wrapToHide = document.getElementById(wrap);
    var hideButton = document.getElementById(hiding);
    var self = this;
    console.log(this.isVisible);
    var executing = false;
    var heightOfWrap = wrapToHide.offsetHeight;
    var duration = animationDuration * 1000;

    console.log(heightOfWrap);
    hideButton.addEventListener('click', function(e, visibility){
     
      if(executing){
        return false;
      }
      
      if(self.isVisible){
        wrapToHide.classList.add('smoothHide');
        wrapToHide.classList.remove('smoothShow');
        wrapToHide.style.height = heightOfWrap + "px";
        executing = true;

        setTimeout(
          function(){
            wrapToHide.style.height = 0 + "px";
            executing = false;
          },duration);

        self.isVisible = false;
        
      }else{
        console.log("SOMZAVRRETY");
        wrapToHide.classList.remove('smoothHide');
        wrapToHide.classList.add('smoothShow');
        executing = true;
        wrapToHide.style.height = heightOfWrap + "px";
        setTimeout(
          function(){

            executing = false;
          },duration);

        self.isVisible = true;
      }
    });
  
  },
  
  this.close = function(wrap, animationDuration){
    var wrapToHide = document.getElementById(wrap);
    var executing = false;
    var heightOfWrap = wrapToHide.offsetHeight;
    var duration = animationDuration * 1000;
    var self = this;
    console.log("closing!");
    console.log(heightOfWrap);

    if(this.isVisible){
      wrapToHide.classList.add('smoothHide');
      wrapToHide.classList.remove('smoothShow');
      wrapToHide.style.height = heightOfWrap + "px";
      
    setTimeout(
      function(){
        wrapToHide.style.height = 0 + "px";
        self.isVisible = false;
      },duration);
      
      this.isVisible = false;
    }else{
      return false;
    }
    
    
  }
  
}
