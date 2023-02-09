using System.Collections.Generic;

namespace InventoryEntity
{
    public class IWOSave
    {
        public inv_InternalWorkOrder inv_InternalWorkOrder { get; set; }
        public List<inv_InternalWorkOrderDetail> inv_InternalWorkOrderDetailList { get; set; }
    }
}