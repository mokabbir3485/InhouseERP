using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
   public class Vat_VDSDetail
    {
        public int VDSIssueDetailId { get; set; }
        public int VDSIssueId { get; set; }
        public int SupplierId { get; set; }
        public int PBId { get; set; }
        public decimal VDSAmount { get; set; }
        public string PaidFor { get; set; }
        public bool IsLocal { get; set; }
    }
}
