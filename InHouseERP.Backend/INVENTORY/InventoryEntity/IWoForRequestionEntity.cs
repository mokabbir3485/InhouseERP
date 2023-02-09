using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class IWoForRequestionEntity
    {
        public long InternalWorkOrderId { get; set; }
        public long SalesOrderId { get; set; }
      
        public string InternalWorkOrderNo { get; set; }
        public string FactoryName { get; set; }
        public int FactoryId { get; set; }
        public string RequisitionNo { get; set; }

    }
}
