using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
   public class inv_MaterialDemandVM
    {

        public Int64 MaterialsDemandId { get; set; }
        public string MaterialsDemandNo { get; set; }
   
     
        public int DemandToDeptId { get; set; }
    
        public DateTime DemandDate { get; set; }
        public DateTime DeliveryDate { get; set; }
  
    }
}
