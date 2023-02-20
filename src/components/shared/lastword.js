const Lastword = (thePath) =>{


    var reg=/\d/g;
 
  if(reg.test(thePath)){

    return " "
  }

  
    return thePath.substring(thePath.lastIndexOf('/') + 1)


}


export default Lastword