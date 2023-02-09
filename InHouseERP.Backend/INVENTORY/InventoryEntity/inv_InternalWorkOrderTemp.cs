using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
   public class inv_InternalWorkOrderTemp
    {
        public Int64 ProductionId { get; set; }
        public Int64 InternalWorkOrderId { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public Int32 DepartmentId { get; set; }
        public string ProductionNo { get; set; }
        public DateTime ProductionDate { get; set; }
        public decimal ProductionQuantity { get; set; }
        public decimal IssuedQuantity { get; set; }
   
    }
}
