using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
   public class proc_ImportPurchaseBillWithStockReceivedReference
    {
        public Int64 PBId { get; set; }
        public Int64 SRId { get; set; }
        public bool IsLocalPurchase { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
