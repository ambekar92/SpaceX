import React from 'react'

    const Oeedata = ({oee}) => {
        console.log(oee);
        if(oee.length > 0 ){
          return (
            <div>
              <center><h1>&nbsp;</h1></center>
              <div class="col-md-12">
              <div class="row">
              {oee.map((oeedata) => (
                <div class="col-md-3">
                  <div class="card-body bodyCss">
                    <h5 class="card-title">{oeedata.mach_code}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{oeedata.order_number}</h6>
                    <p class="card-text">{oeedata.material_descp}</p>
                  </div>
                </div>
              ))}          
            </div>
            </div>
            </div>
          )
        }else{
          return (
            <div>
              <center><h1>No Data</h1></center>           
            </div>
          )
        }
        
    };

    export default Oeedata